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
from nltk.corpus import wordnet as wn
from nltk import sent_tokenize, word_tokenize
import string
from wordcloud import WordCloud
import random
import mysql.connector
import openai
import re

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
nltk.download('omw-1.4')
nltk.download('wordnet')
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

# Diccionarios de promotores y detractores
palabras_promotores = ["excelente", "bueno", "genial", "recomiendo", "satisfecho", "maravilloso"]
palabras_detractores = ["malo", "horrible", "insatisfecho", "no recomiendo", "decepcionante", "pesimo"]

# Función para obtener sinónimos en español de una palabra
def obtener_sinonimos_en_espanol(palabra):
    sinonimos = set()
    for syn in wn.synsets(palabra, lang='spa'):
        for lemma in syn.lemmas('spa'):
            sinonimos.add(lemma.name())
    return list(sinonimos)

# Expansión del diccionario de emociones con sinónimos
emociones_expandidas = {}

for emocion, palabras in emociones_lexicon.items():
    palabras_expandidas = set(palabras)  # Mantiene los originales y añadirá sinónimos
    for palabra in palabras:
        sinonimos = obtener_sinonimos_en_espanol(palabra)
        palabras_expandidas.update(sinonimos)
    emociones_expandidas[emocion] = list(palabras_expandidas)


# Función para crear nube de palabras de promotores
def generar_nube_promotores(text):
    words = word_tokenize(text.lower(), language='spanish')
    palabras_promotoras = [word for word in words if word in palabras_promotores]
    if palabras_promotoras:  # Verificar si hay palabras para evitar errores
        texto_promotores = ' '.join(palabras_promotoras)
        wordcloud = WordCloud(width=800, height=400, background_color='white', color_func=color_func).generate(texto_promotores)
        wordcloud.to_file('static/nube_palabras_promotores.png')

# Función para crear nube de palabras de detractores
def generar_nube_detractores(text):
    words = word_tokenize(text.lower(), language='spanish')
    palabras_detractoras = [word for word in words if word in palabras_detractores]
    if palabras_detractoras:  # Verificar si hay palabras para evitar errores
        texto_detractores = ' '.join(palabras_detractoras)
        wordcloud = WordCloud(width=800, height=400, background_color='white', color_func=color_func).generate(texto_detractores)
        wordcloud.to_file('static/nube_palabras_detractores.png')


# Función para filtrar y separar respuestas por género
def filtrar_respuestas_por_genero(respuestas):
    respuestas_masculinas = []
    respuestas_femeninas = []

    for respuesta in respuestas:
        if 'masculino' in respuesta['respuesta'].lower():
            respuestas_masculinas.append(respuesta['respuesta'])
        elif 'femenino' in respuesta['respuesta'].lower():
            respuestas_femeninas.append(respuesta['respuesta'])

    return respuestas_masculinas, respuestas_femeninas

def generar_nube_masculino(texto_masculino):
    wordcloud = WordCloud(width=400, height=200, background_color='white', color_func=color_func, 
                          collocations=False, prefer_horizontal=1, max_font_size=80, max_words=7, stopwords=stop_words).generate(texto_masculino)
    wordcloud.to_file('static/nube_palabras_masculino.png')

def generar_nube_femenino(texto_femenino):
    wordcloud = WordCloud(width=400, height=200, background_color='white', color_func=color_func, 
                          collocations=False, prefer_horizontal=1, max_font_size=80, max_words=7, stopwords=stop_words).generate(texto_femenino)
    wordcloud.to_file('static/nube_palabras_femenino.png')

def contar_promotores_detractores(text):
    words = word_tokenize(text.lower(), language='spanish')
    promotores = sum(1 for word in words if word in palabras_promotores)
    detractores = sum(1 for word in words if word in palabras_detractores)
    return {"promotores": promotores, "detractores": detractores}

# Función para asignar colores en la nube de palabras
def color_func(word, font_size, position, orientation, font_path, random_state):
    return random.choice(colors)

# Función para contar emociones en el texto
def contar_emociones(text):
    words = word_tokenize(text.lower(), language='spanish')
    emociones_contadas = Counter()
    for word in words:
        for emocion, palabras in emociones_expandidas.items():
            if word in palabras:  # Verifica en el conjunto expandido de sinónimos
                emociones_contadas[emocion] += 1
    return emociones_contadas

# Nueva función para generar conclusión con ChatGPT
def generar_conclusion(df_frecuencia):
    top_palabras = [palabra for palabra in df_frecuencia['Palabra'].tolist() if palabra and str(palabra).lower() != 'nan']

    palabras_mencionadas = ", ".join(top_palabras[:4])

    # Contexto para ChatGPT
    prompt = (
        f"Resume en 200 palabras las palabras más mencionadas: {palabras_mencionadas}. Destaca la emoción principal y los temas recurrentes, analizando su impacto en bienestar y cultura de empresa desde una perspectiva psicológica."
    )

    try:
        # Solicitud a la API de ChatGPT
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300
        )
        conclusion = response['choices'][0]['message']['content'].strip()
        print("Conclusion",conclusion)
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

    # Filtrar respuestas por género
    respuestas_masculinas, respuestas_femeninas = filtrar_respuestas_por_genero(respuestas)

    # Procesar respuestas masculinas
    texto_masculino = ' '.join(respuestas_masculinas)
    generar_nube_masculino(texto_masculino)

    # Procesar respuestas femeninas
    texto_femenino = ' '.join(respuestas_femeninas)
    generar_nube_femenino(texto_femenino)

    # Procesar respuestas abiertas y cerradas
    preguntas_abiertas = [r['respuesta'] for r in respuestas if r['tipo'] == 'open']
    preguntas_cerradas = [r['respuesta'] for r in respuestas if r['tipo'] == 'closed']

    conteo_promotores = 0
    conteo_detractores = 0
    for respuesta in preguntas_abiertas:
        resultado = contar_promotores_detractores(respuesta)
        conteo_promotores += resultado['promotores']
        conteo_detractores += resultado['detractores']

    # Crear gráfica de respuestas cerradas
    conteo_respuestas_cerradas = Counter(preguntas_cerradas)
    if not os.path.exists('static'):
        os.makedirs('static')
    plt.figure(figsize=(10, 5))
    ax = plt.gca()

    # Dibujar barras redondeadas para las respuestas cerradas
    for i, (respuesta, frecuencia) in enumerate(conteo_respuestas_cerradas.items()):
        bar = patches.FancyBboxPatch(
            (i - 0.4, 0), 0.8, frecuencia, boxstyle="round,pad=0.3,rounding_size=0.5", linewidth=1,
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
    plt.savefig('static/top_5_conceptos.png')
    plt.close()

    generar_nube_promotores(texto_abierto)
    generar_nube_detractores(texto_abierto)

    # Crear nube de palabras
    wordcloud = WordCloud(width=800, height=400, background_color='white', color_func=color_func, stopwords=stop_words).generate(texto_abierto)
    wordcloud.to_file('static/nube_palabras.png')

    # Analizar emociones en respuestas abiertas
    emociones_totales = Counter()
    for texto in preguntas_abiertas:
        emociones_totales.update(contar_emociones(texto))

    for emocion in emociones_lexicon.keys():
        if emocion not in emociones_totales:
            emociones_totales[emocion] = 0

    # Gráfica de emociones
    df_emociones = pd.DataFrame.from_dict(emociones_totales, orient='index', columns=['Frecuencia']).sort_values(by='Frecuencia', ascending=False)
    espacio = 0.6  # Espacio entre barras
    ancho_barra = 0.1  # Ancho de la barra para crear espacio

    plt.figure(figsize=(10, 6))
    ax = plt.gca()

    # Dibujar las barras redondeadas con separación
    for i, (emocion, frecuencia) in enumerate(zip(df_emociones.index, df_emociones['Frecuencia'])):
        # Recalcular la posición para centrar las barras correctamente
        bar = patches.FancyBboxPatch(
            (i - (len(df_emociones) - 1) / 2 * espacio - ancho_barra / 2 + 1.8, 0), # Centra las barras
            ancho_barra, frecuencia,
            linewidth=0,
            edgecolor=None,
            facecolor=colors[i % len(colors)],
            joinstyle="round"  # Eliminar el contorno de las barras
        )
        ax.add_patch(bar)

    # Configurar las etiquetas del eje x con fondo blanco y borde de óvalo
    ax.set_xticks(range(len(df_emociones)))
    ax.set_xticklabels(
        [f' {emocion} ' for emocion in df_emociones.index],
        rotation=0, ha='center',
        bbox=dict(boxstyle="round,pad=0.5", edgecolor="none", facecolor="white")  # Sin borde para las etiquetas
    )

    # Configurar las etiquetas del eje y con fondo blanco y borde de óvalo
    ax.set_yticks(range(0, max(df_emociones['Frecuencia']) + 1, 1))
    ax.set_yticklabels(
        [str(i) for i in range(0, max(df_emociones['Frecuencia']) + 1, 1)],
        bbox=dict(boxstyle="round,pad=0.5", edgecolor="none", facecolor="white")  # Sin borde para las etiquetas
    )

    # Activar las líneas de cuadrícula en el eje y
    ax.yaxis.grid(True, linestyle='--', color='gray', linewidth=1)
    ax.set_axisbelow(True)  # Para que las líneas de cuadrícula aparezcan detrás de las barras

    # Ajuste de los límites del eje y
    if not df_emociones.empty and 'Frecuencia' in df_emociones.columns and df_emociones['Frecuencia'].notnull().any():
        plt.ylim([0, max(df_emociones['Frecuencia']) + 1])
    else:
        plt.ylim([0, 1])  # Establecer un valor predeterminado si no hay datos

    # Ajuste de los márgenes para eliminar los bordes alrededor de la gráfica
    plt.subplots_adjust(left=0, right=1, top=1, bottom=0)

    # Ajuste de los límites del eje x para centrar las barras
    plt.xlim([-0.5, len(df_emociones) - 0.5])

    # Eliminar los bordes alrededor de la figura
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_visible(False)
    ax.spines['bottom'].set_visible(False)

    # Mostrar los valores en los ejes X y Y (sin quitar las etiquetas)
    ax.tick_params(axis='x', which='both', bottom=True, top=False, labelsize=18)  # Mantener las marcas X visibles
    ax.tick_params(axis='y', which='both', left=True, right=False, labelsize=18)  # Mantener las marcas Y visibles

    # Guardar y cerrar la gráfica
    plt.savefig('static/grafica_emociones.png', bbox_inches='tight', pad_inches=0)
    plt.close()

    # Generar conclusión
    conclusion = generar_conclusion(df_frecuencia)
    def limpiar_texto_para_latex(texto):
        # Remover o reemplazar caracteres especiales problemáticos para LaTeX
        texto = re.sub(r"[\\&%$#_{}~^]", "", texto)  # Remover caracteres especiales de LaTeX
        texto = texto.replace("ñ", "n").replace("Ñ", "N")  # Reemplazar ñ y Ñ
        texto = texto.replace("á", "a").replace("é", "e").replace("í", "i").replace("ó", "o").replace("ú", "u")
        texto = texto.replace("Á", "A").replace("É", "E").replace("Í", "I").replace("Ó", "O").replace("Ú", "U")
        return texto
    conclusion_limpia = limpiar_texto_para_latex(conclusion)
    global conclusion_global  # Asegúrate de declarar global para modificarla fuera de la función
    conclusion_global = conclusion_limpia
    
    # Responder con enlaces a las imágenes y conclusión
    return jsonify({
            "promotores": conteo_promotores,
            "detractores": conteo_detractores,
            "cerradas": f"http://localhost:5001/static/grafica_respuestas.png",
            "palabras": f"http://localhost:5001/static/top_5_conceptos.png",
            "wordCloudUrl": f"http://localhost:5001/static/nube_palabras.png",
            "topConceptsUrl": f"http://localhost:5001/staticnube_palabras_promotores.png",
            "imageUrl": f"http://localhost:5001/static/nube_palabras_detractores.png",
            "emotionAnalysisUrl": f"http://localhost:5001/static/grafica_emociones.png",
            "conclusion": conclusion_limpia
    })

if __name__ == '__main__':
    app.run(port=5001, threaded=True, debug=True)
