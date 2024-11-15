// import React, { useState, useEffect } from 'react';
// import useSpeechToText from '../../hooks/useSpeechToText'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
// import '../../assets/styles/Survey.css';

// const OpenQuestion = ({ questionData, onNext }) => {
//   const [value, setValue] = useState('');
//   const [isManualEdit, setIsManualEdit] = useState(false);
//   const { transcript, startListening, stopListening, isListening } = useSpeechToText();

//   useEffect(() => {
//     if (!isManualEdit && transcript) {
//       setValue(transcript);
//     }
//   }, [transcript, isManualEdit]);

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onNext(value); // Pasar el valor de la respuesta si es necesario
//   };

//   const handleStartListening = () => {
//     setIsManualEdit(false);
//     startListening();
//   };

//   return (
//     <div onSubmit={handleSubmit} className='open-question-container'>
//       <label className="open-question-label">{questionData.number}. {questionData.question}</label>
//       <textarea
//         className="open-question-textarea"
//         value={value}
//         onChange={handleChange}
//         placeholder="Your answer"
//       />
//       <div className="open-question-buttons">
//         <button type="button" onClick={handleStartListening} className="open-question-mic-button">
//           <FontAwesomeIcon icon={isListening ? faMicrophoneSlash : faMicrophone} />
//         </button>
//         <button type="button" onClick={stopListening} className="open-question-mic-button">
//           <FontAwesomeIcon icon={faMicrophoneSlash} />
//         </button>
//         <button type="submit" disabled={!value}>Siguiente</button>
//       </div>
//     </div>
//   );
// };

// export default OpenQuestion;


// import React, { useState, useEffect } from 'react';
// import useSpeechToText from '../../hooks/useSpeechToText'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMicrophone, faMicrophoneSlash,faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
// import '../../assets/styles/SurveyStyles.css';
// const OpenQuestion = ({ questionData, onNext, initialAnswer = '', isReviewing = false}) => {
//   const [value, setValue] = useState(initialAnswer || '');

//   const [isManualEdit, setIsManualEdit] = useState(false);
//   const { transcript, startListening, stopListening, isListening } = useSpeechToText();
//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//     if (!isManualEdit && transcript) {
//       setValue(transcript);
//     }
//   }, [transcript, isManualEdit]);

//   // Agrega useEffect para manejar cambios en initialAnswer
//   useEffect(() => {
//     setValue(initialAnswer);
//     setSaved(false); 
//   }, [initialAnswer]);
  

//   const handleChange = (e) => {
//     setValue(e.target.value);
//     setIsManualEdit(true); // Marca que el usuario está editando manualmente
//     setSaved(false);
//   };

//   const handleNextClick = () => {
//     onNext({ idPregunta: questionData.id, tipo: questionData.type,respuesta: value });
//     setSaved(true);
//     setTimeout(() => setSaved(false), 2000);
//   };

//   const handleStartListening = () => {
//     setIsManualEdit(false);
//     startListening();
//   };

//   return (
//     <div className='open-question-container'>
//       <label className="open-question-label">{questionData.number}. {questionData.question}</label>
//       <textarea
//         id={`respuesta-${questionData.id}`}
//         className="open-question-textarea"
//         value={value}
//         onChange={handleChange}
//         placeholder="Tu respuesta"
//       />
//       <div className='answer-buttns'>
//       <div className="open-question-buttons">
//         <button type="button" onClick={handleStartListening} className="open-question-mic-button">
//           <FontAwesomeIcon icon={isListening ? faMicrophoneSlash : faMicrophone} />
//         </button>
//         <button type="button" onClick={stopListening} className="open-question-mic-button">
//           <FontAwesomeIcon icon={faMicrophoneSlash} />
//         </button>
//       </div>
//       <button type="button" onClick={handleNextClick} disabled={!value || !value.trim()}>{isReviewing ? 'Modificar' : 'Siguiente'}</button>
//         {saved && <FontAwesomeIcon icon={faWandMagicSparkles} />} {/* Muestra el tick verde cuando `saved` es true */}

//       </div>
//     </div>
//   );
// };

// export default OpenQuestion;

// import React, { useState, useEffect } from 'react';
// import useSpeechToText from '../../hooks/useSpeechToText'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMicrophone, faMicrophoneSlash,faPencil } from '@fortawesome/free-solid-svg-icons';
// import '../../assets/styles/SurveyStyles.css';

// const OpenQuestion = ({ questionData, onNext, initialAnswer = '', isReviewing = false}) => {
//   const [value, setValue] = useState(initialAnswer || '');

//   const [isManualEdit, setIsManualEdit] = useState(false);
//   const { transcript, startListening, stopListening, isListening } = useSpeechToText();
//   const [showModify, setShowModify] = useState(true); // Estado para controlar la visibilidad del botón Modificar
//   const [showIcon, setShowIcon] = useState(false); // Estado para controlar la visibilidad del icono

//   useEffect(() => {
//     if (!isManualEdit && transcript) {
//       setValue(transcript);
//     }
//   }, [transcript, isManualEdit]);

//   // Agrega useEffect para manejar cambios en initialAnswer
//   useEffect(() => {
//     setValue(initialAnswer);
//     setShowIcon(false); // Asegura que el icono no se muestre inicialmente
//   }, [initialAnswer]);
  

//   const handleChange = (e) => {
//     setValue(e.target.value);
//     setIsManualEdit(true); // Marca que el usuario está editando manualmente
//     setShowIcon(false);
//   };

//   const handleNextClick = () => {
//     // Asumimos que onNext es una función prop que maneja la lógica del clic.
//     onNext({ idPregunta: questionData.id, tipo: questionData.type, respuesta: value });
  
//     // Oculta el botón Modificar inmediatamente
//     setShowModify(false);
  
//     // Después de un retraso, muestra el icono y luego lo oculta después de 2 segundos
//     setTimeout(() => {
//       setShowIcon(true); // Muestra el icono
  
//       // Oculta el icono después de 2 segundos
//       setTimeout(() => {
//         setShowIcon(false); // Primero oculta el icono
//         setShowModify(true); // Luego muestra el botón Modificar
//       }, 2000);
//     }, 100);
//   };
  

//   const handleStartListening = () => {
//     setIsManualEdit(false);
//     startListening();
//   };

//   return (
//     <div className='open-question-container'>
//       <label className="open-question-label">{questionData.number}. {questionData.question}</label>
//       <textarea
//         id={`respuesta-${questionData.id}`}
//         className="open-question-textarea"
//         value={value}
//         onChange={handleChange}
//         placeholder="Tu respuesta"
//       />
//       <div className='answer-buttns'>
//         <div className="open-question-buttons">
//           <button type="button" onClick={handleStartListening} className="open-question-mic-button">
//             <FontAwesomeIcon icon={isListening ? faMicrophoneSlash : faMicrophone} />
//           </button>
//           <button type="button" onClick={stopListening} className="open-question-mic-button">
//             <FontAwesomeIcon icon={faMicrophoneSlash} />
//           </button>
//         </div>
//         {showModify && (
//           <button type="button" onClick={handleNextClick} disabled={!value || !value.trim()}>
//             {isReviewing ? 'Modificar' : 'Siguiente'}
//           </button>
//         )}
//         {showIcon && <FontAwesomeIcon icon={faPencil} style={{ fontSize: '36px', color:'blue'}} />}
//       </div>
//     </div>
//   );
// };

// export default OpenQuestion;


import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash, faPencil } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/SurveyStyles.css';

const OpenQuestion = ({ questionData, onNext, initialAnswer = '', isReviewing = false }) => {
  const [value, setValue] = useState(initialAnswer || '');
  const [isListening, setIsListening] = useState(false);
  const [isManualEdit, setIsManualEdit] = useState(false);
  const recognitionRef = useRef(null);
  const [showModify, setShowModify] = useState(true);
  const [showIcon, setShowIcon] = useState(false); 

  useEffect(() => {
    console.log('Inicializando reconocimiento de voz...');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      console.log('API de reconocimiento de voz soportada.');
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.interimResults = true;
      recognition.continuous = true;
  
      recognition.onresult = (event) => {
        console.log('Reconocimiento de voz activo, procesando resultados...');
        const transcriptFromEvent = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        console.log('Transcripción recibida: ', transcriptFromEvent);
        if (!isManualEdit) {
          setValue(transcriptFromEvent);
        }
      };
  
      recognition.onerror = (event) => {
        console.error("Error en el reconocimiento de voz: ", event.error);
      };
  
      recognition.onstart = () => {
        console.log('Reconocimiento de voz iniciado.');
      };
  
      recognition.onend = () => {
        console.log('Reconocimiento de voz finalizado.');
      };
  
      recognitionRef.current = recognition;
    } else {
      console.error("La API de reconocimiento de voz no es soportada por este navegador.");
    }
  }, [isManualEdit]);

  const toggleListening = () => {
    console.log('Cambio de estado de escucha.');
    if (isListening) {
      console.log('Deteniendo reconocimiento de voz...');
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      console.log('Iniciando reconocimiento de voz...');
      recognitionRef.current.start();
      setIsListening(true);
      setIsManualEdit(false);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setIsManualEdit(true);
    setShowIcon(false);
  };

  const handleNextClick = () => {
         // Asumimos que onNext es una función prop que maneja la lógica del clic.
         onNext({ idPregunta: questionData.id, tipo: questionData.type, respuesta: value });
      
         // Oculta el botón Modificar inmediatamente
         setShowModify(false);
      
         // Después de un retraso, muestra el icono y luego lo oculta después de 2 segundos
         setTimeout(() => {
           setShowIcon(true); // Muestra el icono
      
           // Oculta el icono después de 2 segundos
           setTimeout(() => {
             setShowIcon(false); // Primero oculta el icono
             setShowModify(true); // Luego muestra el botón Modificar
           }, 2000);
         }, 100);
       };

  return (
    <div className='open-question-container'>
      <label className="open-question-label">{questionData.number}. {questionData.question}</label>
      <textarea
        id={`respuesta-${questionData.id}`}
        className="open-question-textarea"
        value={value}
        onChange={handleChange}
        placeholder="Tu respuesta"
      />
      <div className='answer-buttns'>
        <div className="open-question-buttons">
          <button type="button" onClick={toggleListening} className="open-question-mic-button">
            <FontAwesomeIcon icon={isListening ? faMicrophoneSlash : faMicrophone} />
          </button>
        </div>
        {showModify && (
          <button type="button" onClick={handleNextClick} disabled={!value || !value.trim()}>
            {isReviewing ? 'Modificar' : 'Siguiente'}
          </button>
        )}
        {showIcon && <FontAwesomeIcon icon={faPencil} style={{ fontSize: '36px', color:'blue'}} />}
      </div>
    </div>
  );
};

export default OpenQuestion;
