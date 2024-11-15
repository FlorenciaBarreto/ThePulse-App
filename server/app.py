from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from collections import Counter
import os
import pdfkit
from pymongo import MongoClient
import mysql.connector
import nltk
from nltk.corpus import stopwords
import string
from wordcloud import WordCloud
import random


colors = ['#8A2BE2', '#1E90FF', '#9370DB', '#0000FF', '#483D8B']

# Configuración de NLTK
nltk.download('stopwords')
stop_words = set(stopwords.words('spanish'))
stop_words.update(list(string.punctuation))
stop_words = list(stop_words)

# Configuración de la base de datos MySQL
mysql_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'thepulse'
}

app = Flask(__name__)
CORS(app)


def color_func(word, font_size, position, orientation, font_path, random_state):
    return random.choice(colors)  # Selecciona un color aleatorio de la lista

def generar_conclusion(df_frecuencia):
    # Convertir DataFrame a una lista de palabras según su frecuencia
    top_palabras = df_frecuencia['Palabra'].tolist()

    # Manejo de casos donde hay menos de 4 palabras en la lista
    if len(top_palabras) >= 4:
        conclusion = (
            f"Las palabras más mencionadas fueron '{top_palabras[0]}', "
            f"seguidos de '{top_palabras[1]}' y '{top_palabras[2]}'. Además, se mencionaron frecuentemente aspectos como '{top_palabras[3]}'."
        )
    elif len(top_palabras) == 3:
        conclusion = (
            f"Las palabras más mencionadas fueron '{top_palabras[0]}', "
            f"seguidas de '{top_palabras[1]}' y '{top_palabras[2]}'."
        )
    elif len(top_palabras) == 2:
        conclusion = (
            f"Las palabras más mencionadas fueron '{top_palabras[0]}' y '{top_palabras[1]}'."
        )
    elif len(top_palabras) == 1:
        conclusion = f"La palabra más mencionada fue '{top_palabras[0]}'."
    else:
        conclusion = "No se encontraron palabras con suficiente frecuencia para generar una conclusión."

    return conclusion


@app.route('/api/generar_pdf', methods=['POST'])
def generar_pdf():
    # Genera las gráficas y obtén el párrafo de conclusión
    generar_graficas()

    # Cargar la plantilla LaTeX desde un archivo
    with open('plantilla_reporte.tex', 'r', encoding='utf-8') as file:
        latex_template = file.read()

    # Inserta el párrafo de conclusión generado dinámicamente
    conclusion = "Aquí va el texto generado como conclusión."  # Generado dinámicamente
    latex_template = latex_template.replace("{{conclusion}}", conclusion)

    # Guardar el archivo .tex
    tex_path = "reporte_respuestas.tex"
    with open('reporte_respuestas.tex', 'w', encoding='utf-8') as f:
        f.write(latex_template)


    # Convertir el .tex a PDF usando pdfkit o pdflatex
    os.system(f"pdflatex {tex_path}")  # o usa pdfkit si prefieres

    # Enviar el PDF como respuesta descargable
    pdf_path = "reporte_respuestas.pdf"
            # Limpiar archivos temporales
    for ext in ['aux', 'log', 'tex']:
        try:
            os.remove(f"reporte_respuestas.{ext}")
        except FileNotFoundError:
            pass  # Ignora si el archivo no existe
    
    return send_file(pdf_path, as_attachment=True)


@app.route('/api/graficas', methods=['POST'])
def generar_graficas():
    data = request.get_json()
    id_encuesta = data.get('id_encuesta')

    if not id_encuesta:
        return jsonify({"error": "Falta el id_encuesta"}), 400

    # Conectar a MySQL
    connection = mysql.connector.connect(**mysql_config)
    cursor = connection.cursor(dictionary=True)

    query = """
    SELECT id_pregunta, tipo, respuesta
    FROM respuestas
    WHERE id_encuesta = %s
    """
    cursor.execute(query, (id_encuesta,))
    respuestas = cursor.fetchall()

    # Extraer respuestas cerradas y abiertas
    preguntas_abiertas = []
    preguntas_cerradas = []

    for respuesta in respuestas:
        if respuesta['tipo'] == 'open':
            preguntas_abiertas.append(respuesta['respuesta'])
        elif respuesta['tipo'] == 'closed':
            preguntas_cerradas.append(respuesta['respuesta'])

    cursor.close()
    connection.close()

    # Procesar respuestas cerradas para crear las gráficas
    conteo_respuestas_cerradas = Counter(preguntas_cerradas)

    # Crear una gráfica de barras
    if not os.path.exists('static'):
        os.makedirs('static')

    plt.figure(figsize=(10, 5))
    plt.bar(conteo_respuestas_cerradas.keys(), conteo_respuestas_cerradas.values(), color=['#8A2BE2', '#1E90FF', '#9370DB', '#0000FF', '#483D8B'][:len(conteo_respuestas_cerradas)])
    #plt.title('Distribución de Respuestas Cerradas')
    plt.savefig('static/grafica_respuestas.png')
    plt.close()

    # Procesar respuestas abiertas
    texto_abierto = ' '.join(preguntas_abiertas)
    vectorizer = CountVectorizer(stop_words=stop_words)
    X = vectorizer.fit_transform([texto_abierto])
    frecuencia = X.toarray().sum(axis=0)
    palabras = vectorizer.get_feature_names_out()

    df_frecuencia = pd.DataFrame({'Palabra': palabras, 'Frecuencia': frecuencia})
    df_frecuencia = df_frecuencia.sort_values(by='Frecuencia', ascending=False)

    # Crear gráfico de las palabras más comunes
    top_5 = df_frecuencia.head(5)
    plt.bar(top_5['Palabra'], top_5['Frecuencia'], color=['#8A2BE2', '#1E90FF', '#9370DB', '#0000FF', '#483D8B'])
    #plt.title('Top 5 Conceptos Más Repetidos en Respuestas Abiertas')
    plt.xlabel('Concepto')
    plt.ylabel('Frecuencia')
    plt.savefig('static/top_5_conceptos.png')
    plt.close()

    # Crear una nube de palabras
    wordcloud = WordCloud(width=800, height=400, background_color='white',color_func=color_func).generate(texto_abierto)
    wordcloud.to_file('static/nube_palabras.png')

    conclusion = generar_conclusion(df_frecuencia)

    return jsonify({
        "message": "Gráfica y nube de palabras generadas y guardadas.",
        "imageUrl": f"http://localhost:5001/static/grafica_respuestas.png",
        "wordCloudUrl": f"http://localhost:5001/static/nube_palabras.png",
        "topConceptsUrl": f"http://localhost:5001/static/top_5_conceptos.png",
        "conclusion": conclusion
    })

if __name__ == '__main__':
    app.run(port=5001,  threaded=True)
