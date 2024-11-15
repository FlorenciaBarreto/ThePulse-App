from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from collections import Counter
import os
import nltk
from nltk.corpus import stopwords
from nltk import word_tokenize
import string
from wordcloud import WordCloud
import random
import mysql.connector
import plotly.graph_objects as go
import plotly.io as pio
from PIL import Image
from io import BytesIO

# Inicialización y configuración
app = Flask(__name__)
CORS(app)

# Colores para las gráficas
colors = ['#8A2BE2', '#1E90FF', '#9370DB', '#0000FF', '#483D8B']

# Configuración NLTK y recursos
nltk.download('punkt')
nltk.download('stopwords')
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

# Función para contar emociones en el texto
def contar_emociones(text):
    words = word_tokenize(text.lower(), language='spanish')
    emociones_contadas = Counter()
    for word in words:
        for emocion, palabras in emociones_lexicon.items():
            if word in palabras:
                emociones_contadas[emocion] += 1
    return emociones_contadas

# Función para generar la conclusión
def generar_conclusion(df_frecuencia):
    top_palabras = df_frecuencia['Palabra'].tolist()
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
    print("Generando gráfica de prueba cerradas...")
    # Crear gráfica de respuestas cerradas con Plotly
    conteo_respuestas_cerradas = Counter(preguntas_cerradas)
    fig = go.Figure()
    fig.add_trace(go.Bar(
        x=list(conteo_respuestas_cerradas.keys()),
        y=list(conteo_respuestas_cerradas.values()),
        marker=dict(color=colors, line=dict(color='black', width=1)),
        text=list(conteo_respuestas_cerradas.values()),
        textposition='outside',
    ))
    fig.update_layout(title="Respuestas Cerradas", xaxis_title="Respuestas", yaxis_title="Frecuencia", showlegend=False)
    img_bytes = pio.to_image(fig, format='png')
    img = Image.open(BytesIO(img_bytes))
    img.save("static/grafica_respuestas.png")
    #fig.write_image("static/grafica_respuestas.png")

    # Procesar respuestas abiertas y generar frecuencia de palabras
    print("Generando gráfica de abiertas...")
    texto_abierto = ' '.join(preguntas_abiertas)
    vectorizer = CountVectorizer(stop_words=list(stop_words))
    X = vectorizer.fit_transform([texto_abierto])
    frecuencia = X.toarray().sum(axis=0)
    palabras = vectorizer.get_feature_names_out()
    df_frecuencia = pd.DataFrame({'Palabra': palabras, 'Frecuencia': frecuencia}).sort_values(by='Frecuencia', ascending=False)

    # Crear gráfica de las palabras más comunes
    top_5 = df_frecuencia.head(5)
    fig = go.Figure(data=[go.Bar(
        x=top_5['Palabra'],
        y=top_5['Frecuencia'],
        marker_color=colors[:5]
    )])
    fig.update_layout(title="Top 5 Conceptos Más Repetidos", xaxis_title="Palabras", yaxis_title="Frecuencia")
    #fig.write_image("static/top_5_conceptos.png")

    # Crear nube de palabras
    wordcloud = WordCloud(width=800, height=400, background_color='white', color_func=lambda *args, **kwargs: random.choice(colors)).generate(texto_abierto)
    wordcloud.to_file('static/nube_palabras.png')

    # Analizar emociones en respuestas abiertas
    emociones_totales = Counter()
    for texto in preguntas_abiertas:
        emociones_totales.update(contar_emociones(texto))

    # Crear gráfica de emociones con Plotly
    fig = go.Figure()
    fig.add_trace(go.Bar(
        x=list(emociones_totales.keys()),
        y=list(emociones_totales.values()),
        marker=dict(color=colors, line=dict(color='black', width=1)),
        text=list(emociones_totales.values()),
        textposition='outside',
    ))
    fig.update_layout(title="Análisis de Emociones", xaxis_title="Emociones", yaxis_title="Frecuencia", showlegend=False)
    #fig.write_image("static/grafica_emociones.png")

    # Generar conclusión
    conclusion = generar_conclusion(df_frecuencia)

    return jsonify({
        "message": "Gráfica, nube de palabras y análisis de emociones generados y guardados.",
        "imageUrl": f"http://localhost:5001/static/grafica_respuestas.png",
        "wordCloudUrl": f"http://localhost:5001/static/nube_palabras.png",
        "topConceptsUrl": f"http://localhost:5001/static/top_5_conceptos.png",
        "emotionAnalysisUrl": f"http://localhost:5001/static/grafica_emociones.png",
        "conclusion": conclusion
    })

if __name__ == '__main__':
    app.run(port=5001, threaded=True)
