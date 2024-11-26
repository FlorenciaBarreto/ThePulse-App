# API de Análisis de Encuestas

Esta API permite procesar respuestas de encuestas, generar gráficos, nubes de palabras, analizar emociones y generar reportes en PDF. Está desarrollada en Flask y utiliza diversas bibliotecas como NLTK, MySQL, OpenAI y Matplotlib.

---

## Características principales
- Generación de gráficos de respuestas cerradas.
- Análisis de respuestas abiertas para detectar emociones y conceptos recurrentes.
- Creación de nubes de palabras separadas por género, promotores y detractores.
- Generación de reportes en PDF basados en los análisis.

---

## Requisitos

- Python 3.8+
- MySQL
- pip para la gestión de dependencias
- OpenAI API Key

---

## Instalación

1. **Clona este repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>

2. **Instalar Dependencias:**
pip install -r requirements.txt

3. **Configuración SSL en Mac**

Si experimentas problemas con SSL en Mac, puedes configurar un contexto predeterminado inseguro para evitar errores con OpenAI:

import ssl
ssl._create_default_https_context = ssl._create_unverified_context

**El error sale asi**
diegom@MacBook-Air server % python3 appgpt.py
[nltk_data] Error loading punkt: <urlopen error [SSL:
[nltk_data]     CERTIFICATE_VERIFY_FAILED] certificate verify failed:
[nltk_data]     unable to get local issuer certificate (_ssl.c:1000)>
[nltk_data] Error loading stopwords: <urlopen error [SSL:
[nltk_data]     CERTIFICATE_VERIFY_FAILED] certificate verify failed:
[nltk_data]     unable to get local issuer certificate (_ssl.c:1000)>

**NLTK tiene que aparecer asi al iniciar la API**
diegom@MacBook-Air server % python3 appgpt.py            
[nltk_data] Downloading package punkt to /Users/diegom/nltk_data...
[nltk_data]   Package punkt is already up-to-date!
[nltk_data] Downloading package stopwords to
[nltk_data]     /Users/diegom/nltk_data...
[nltk_data]   Package stopwords is already up-to-date!
[nltk_data] Downloading package omw-1.4 to /Users/diegom/nltk_data...
[nltk_data] Downloading package wordnet to /Users/diegom/nltk_data...

**Anotaciones Extras**

Configura la API Key de OpenAI:

Sustituye "sk-proj-..." por tu clave API en la línea:
    openai.api_key = "TU_API_KEY"

**Uso**
Inicia el servidor de Flask:

bash
python appgpt.py
Esto ejecutará la API en http://localhost:5000.

Endpoints disponibles:

/api/graficas: Genera gráficos y análisis basados en el id_encuesta.
/api/generar_pdf: Genera un reporte en PDF descargable.
Ejemplo de uso con curl:

bash
curl -X POST http://localhost:5000/api/graficas -H "Content-Type: application/json" -d '{"id_encuesta": 1}'
Resultados:

Gráficos y nubes de palabras se guardarán en el directorio static/.
El archivo PDF estará disponible para descarga.

Desarrollo
Descarga de recursos NLTK
-Al ejecutar por primera vez, la API descargará automáticamente los siguientes recursos de NLTK:

punkt
stopwords
omw-1.4
wordnet
Limpieza de archivos temporales
Después de generar el PDF, se eliminan automáticamente los archivos temporales (.aux, .log, .tex).

