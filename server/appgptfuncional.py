from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from collections import Counter
import os
import nltk
from nltk.corpus import stopwords
from nltk import sent_tokenize,word_tokenize
import string
from wordcloud import WordCloud
import random
import mysql.connector
import openai

# Inicialización y configuración
app = Flask(__name__)
CORS(app)

# Colores para la nube de palabras
colors = ['#8A2BE2', '#1E90FF', '#9370DB', '#0000FF', '#483D8B']
conclusion_global = ""
openai.api_key = "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"

 # Configuración NLTK y recursos
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('punkt_tab')
stop_words = set(stopwords.words('spanish')).union(set(string.punctuation))

# Configuración de la base de datos MySQL
mysql_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'thepulse'
}

# Diccionario de emociones en español
emociones_lexicon = {
    'alegría': ['feliz', 'alegría', 'placer', 'gozo', 'disfrute', 'amor', 'sonrisa'],
    'tristeza': ['triste', 'infeliz', 'pena', 'dolor', 'depresión', 'llorar', 'lágrimas'],
    'miedo': ['miedo', 'asustado', 'aterrado', 'nervioso', 'ansiedad', 'pánico'],
    'ira': ['enojado', 'ira', 'furia', 'frustración', 'molestia', 'rabia'],
    'disgusto': ['disgusto', 'repulsión', 'asco', 'desagrado'],
    'confianza': ['confianza', 'seguridad', 'fe', 'esperanza'],
    'sorpresa': ['sorpresa', 'asombrado', 'impactado', 'sorprendido']
}

# Función para asignar colores en la nube de palabras
def color_func(word, font_size, position, orientation, font_path, random_state):
    return random.choice(colors)

# Función para contar emociones en el texto
def contar_emociones(text):
    words = word_tokenize(text.lower(), language='spanish')
    emociones_contadas = Counter()
    for word in words:
        for emocion, palabras in emociones_lexicon.items():
            if word in palabras:
                emociones_contadas[emocion] += 1
    return emociones_contadas

# Nueva función para generar conclusión con ChatGPT
def generar_conclusion(df_frecuencia):
    top_palabras = df_frecuencia['Palabra'].tolist()
    palabras_mencionadas = ", ".join(top_palabras[:4])

    # Contexto para ChatGPT
    prompt = (
        f"Resumen en 300 caracteres o menos de las palabras más mencionadas en las respuestas: {palabras_mencionadas}. "
        "Por favor, destaca la emoción principal y los temas más recurrentes."
    )

    try:
        # Solicitud a la API de ChatGPT
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Puedes usar "gpt-4" si tienes acceso
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=100  # Ajusta según tus necesidades
        )
        conclusion = response['choices'][0]['message']['content'].strip()
    except Exception as e:
        print("Error al generar conclusión con ChatGPT:", e)
        conclusion = "No se pudo generar una conclusión debido a un error."

    return conclusion 

@app.route('/api/generar_pdf', methods=['POST'])
def generar_pdf():
    try:
        # Cargar la plantilla LaTeX desde un archivo
        with open('plantilla_reporte.tex', 'r', encoding='utf-8') as file:
            latex_template = file.read()

        # Inserta el párrafo de conclusión generado dinámicamente
        latex_template = latex_template.replace("{{conclusion}}", conclusion_global)


        # Guardar el archivo .tex
        tex_path = "reporte_respuestas.tex"
        with open('reporte_respuestas.tex', 'w', encoding='utf-8') as f:
            f.write(latex_template)


        # Convertir el .tex a PDF usando pdfkit o pdflatex
        os.system(f"lualatex {tex_path}")  # o usa pdfkit si prefieres

        # Enviar el PDF como respuesta descargable
        pdf_path = "reporte_respuestas.pdf"
                # Limpiar archivos temporales
        for ext in ['aux', 'log', 'tex']:
            try:
                os.remove(f"reporte_respuestas.{ext}")
            except FileNotFoundError:
                pass  # Ignora si el archivo no existe
        
        return send_file(pdf_path, as_attachment=True)
    
    except Exception as e:
        print("Error en generar_pdf:", e)  # Para depuración
        return jsonify({"error": "Error interno del servidor."}), 500

# Ruta para generar gráficos y analizar emociones
@app.route('/api/graficas', methods=['POST'])
def generar_graficas():
    data = request.get_json()
    id_encuesta = data.get('id_encuesta')
    if not id_encuesta:
        return jsonify({"error": "Falta el id_encuesta"}), 400

    # Conectar a MySQL y obtener respuestas
    connection = mysql.connector.connect(**mysql_config)
    cursor = connection.cursor(dictionary=True)
    query = "SELECT id_pregunta, tipo, respuesta FROM respuestas WHERE id_encuesta = %s"
    cursor.execute(query, (id_encuesta,))
    respuestas = cursor.fetchall()
    cursor.close()
    connection.close()

    # Procesar respuestas abiertas y cerradas
    preguntas_abiertas = [r['respuesta'] for r in respuestas if r['tipo'] == 'open']
    preguntas_cerradas = [r['respuesta'] for r in respuestas if r['tipo'] == 'closed']

    # Crear gráfica de respuestas cerradas
    conteo_respuestas_cerradas = Counter(preguntas_cerradas)
    if not os.path.exists('static'):
        os.makedirs('static')
    plt.figure(figsize=(10, 5))
    ax = plt.gca()

    # Dibujar barras redondeadas para las respuestas cerradas
    for i, (respuesta, frecuencia) in enumerate(conteo_respuestas_cerradas.items()):
        bar = patches.FancyBboxPatch(
            (i - 0.4, 0), 0.3, frecuencia, boxstyle="round,pad=0.3,rounding_size=0.5", linewidth=1,
            facecolor=colors[i % len(colors)], edgecolor="black"
        )
        ax.add_patch(bar)
    ax.set_xticks(range(len(conteo_respuestas_cerradas)))
    ax.set_xticklabels(list(conteo_respuestas_cerradas.keys()), rotation=0, ha='center',
                    bbox=dict(boxstyle="round,pad=0.3,rounding_size=0.5", edgecolor="black", facecolor="lightgrey"))
    plt.xlim([-0.5, len(conteo_respuestas_cerradas) - 0.5])
    plt.ylim([0, max(conteo_respuestas_cerradas.values()) + 1])
    plt.savefig('static/grafica_respuestas.png')
    plt.close()

    # Procesar respuestas abiertas
    texto_abierto = ' '.join(preguntas_abiertas)
    vectorizer = CountVectorizer(stop_words=list(stop_words))
    X = vectorizer.fit_transform([texto_abierto])
    frecuencia = X.toarray().sum(axis=0)
    palabras = vectorizer.get_feature_names_out()
    df_frecuencia = pd.DataFrame({'Palabra': palabras, 'Frecuencia': frecuencia}).sort_values(by='Frecuencia', ascending=False)

    # Crear gráfica de las palabras más comunes
    top_5 = df_frecuencia.head(5)
    plt.figure(figsize=(8, 4))
    plt.bar(top_5['Palabra'], top_5['Frecuencia'], color=colors[:5])
    #plt.title('Top 5 Conceptos Más Repetidos en Respuestas Abiertas')
    plt.savefig('static/top_5_conceptos.png')
    plt.close()

    # Crear nube de palabras
    wordcloud = WordCloud(width=800, height=400, background_color='white', color_func=color_func).generate(texto_abierto)
    wordcloud.to_file('static/nube_palabras.png')

    # Analizar emociones en respuestas abiertas
    emociones_totales = Counter()
    for texto in preguntas_abiertas:
        emociones_totales.update(contar_emociones(texto))

    # Gráfica de emociones
    df_emociones = pd.DataFrame.from_dict(emociones_totales, orient='index', columns=['Frecuencia']).sort_values(by='Frecuencia', ascending=False)
    plt.figure(figsize=(10, 6))
    ax = plt.gca()

    # Dibujar barras redondeadas para emociones
    for i, (emocion, frecuencia) in enumerate(zip(df_emociones.index, df_emociones['Frecuencia'])):
        bar = patches.FancyBboxPatch((i - 0.4, 0), 0.8, frecuencia, boxstyle="round,pad=0.3,rounding_size=0.5", linewidth=1, facecolor=colors[i % len(colors)])
        ax.add_patch(bar)

    # Etiquetas del eje X con estilo óvalo y horizontal
    ax.set_xticks(range(len(df_emociones)))
    ax.set_xticklabels([f' {emocion} ' for emocion in df_emociones.index], rotation=0, ha='center', bbox=dict(boxstyle="round,pad=0.3,rounding_size=0.5", edgecolor="black", facecolor="lightgrey"))
    plt.xlim([-0.5, len(df_emociones) - 0.5])
    plt.ylim([0, max(df_emociones['Frecuencia']) + 1])
    plt.savefig('static/grafica_emociones.png')
    plt.close()

    
    global conclusion_global
    conclusion_global = generar_conclusion(df_frecuencia)
    return jsonify({
        "message": "Gráfica, nube de palabras y análisis de emociones generados y guardados.",
        "imageUrl": f"http://localhost:5001/static/grafica_respuestas.png",
        "wordCloudUrl": f"http://localhost:5001/static/nube_palabras.png",
        "topConceptsUrl": f"http://localhost:5001/static/top_5_conceptos.png",
        "emotionAnalysisUrl": f"http://localhost:5001/static/grafica_emociones.png",
        "conclusion": conclusion_global,
    })

if __name__ == '__main__':
    app.run(port=5001, threaded=True)
