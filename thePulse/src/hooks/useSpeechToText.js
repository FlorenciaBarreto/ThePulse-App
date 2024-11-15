// hooks/useSpeechToText.js
import { useState, useRef, useEffect } from 'react';

const useSpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.interimResults = true; // Importante para resultados intermedios
      recognition.lang = 'es-ES'; // Cambia según necesites
      recognition.continuous = true; // Escucha continuamente

      recognition.onresult = (event) => {
        let finalTranscript = ''; // Asegúrate de declarar finalTranscript aquí
        let interimTranscript = ''; // Esta declaración está bien si planeas usar interimTranscript
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript; // Utiliza interimTranscript si deseas manejar resultados intermedios
          }
        }
        // Luego de este punto, puedes usar finalTranscript como lo necesites
        setTranscript(interimTranscript + finalTranscript); // Asegúrate de actualizar el estado o realizar acciones con finalTranscript adecuadamente
      };
      

      recognitionRef.current = recognition;
    } else {
      console.error("La API de reconocimiento de voz no es soportada por este navegador.");
    }

    // Limpieza al desmontar el componente
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return { transcript, startListening, stopListening };
};

export default useSpeechToText;
