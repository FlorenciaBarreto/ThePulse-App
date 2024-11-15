

// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { useTemplate } from '../../../assets/js/TemplateContext';
// import { useNavigate } from 'react-router-dom';

// const TemplatePreview = ({  onClose }) => {
//     const { questions, template,participantes } = useTemplate(); // Añadido template aquí
//     console.log('Preguntas del contexto en TemplatePreview:', questions);

//     const navigate = useNavigate();
//   const renderQuestionDetails = (question) => {
//     // Asegúrate de que las opciones existan para preguntas de tipo 'closed'
//     if (question.tipo === 'closed' && question.opciones) {
//       return (
//         <ul>
//           {question.opciones.map((opcion, idx) => (
//             <li key={idx}>{opcion}</li>
//           ))}
//         </ul>
//       );
//     }
//     // Asegúrate de que minValue y maxValue existan para preguntas de tipo 'rating'
//     else if (question.tipo === 'rating' && question.minValue !== undefined && question.maxValue !== undefined) {
//       return (
//         <div>
//           Rango: {question.minValue} a {question.maxValue}
//         </div>
//       );
//     }

//     return null; // No renderizar detalles para tipos de preguntas no manejados
//   };

//   const handleSaveAndGeneratePin = async () => {
//     // Usa todas las preguntas del contexto, sin filtrar por 'configurada'
//     const surveyData = {
//       nombreEncuesta: template.nombre,
//       imagenEncuesta: template.imagen, // o un valor predeterminado si no existe
//       preguntas: questions.map(question => ({
//         textoPregunta: question.pregunta,
//         tipoPregunta: question.tipo,
//         opciones: question.tipo === 'closed' ? question.opciones : undefined,
//         minValue: question.tipo === 'rating' ? question.minValue : undefined,
//         maxValue: question.tipo === 'rating' ? question.maxValue : undefined,
//       })),
//       participantes: participantes
//     };
  
//     console.log('Datos a enviar:', surveyData);

//     // Obtén el token del almacenamiento local o la gestión de estado de autenticación
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('No se encontró el token de autenticación.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3001/encuestas', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(surveyData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Error al enviar la encuesta');
//       }

//       const result = await response.json();
//       console.log('Encuesta creada con éxito, PIN:', result.pin);

//       navigate(`/dashboard`, { state: { pin: result.pin } });
//     } catch (error) {
//       console.error('Error al guardar la encuesta:', error);
//     }
//   };
//   return (
//     <div>
//       <h2>Vista Previa de la Plantilla</h2>
//       <ul>
//         {questions.map((question, index) => (
//           <li key={question.id || index}>
//             <strong>Pregunta {index + 1}:</strong> {question.pregunta}
//             {question.configurada && ' (Configurada)'}
//             {renderQuestionDetails(question)}
//           </li>
//         ))}
//       </ul>
//       <button onClick={onClose} style={{ border: "none", background: "none", color: "black" }}>
//         <FontAwesomeIcon icon={faArrowLeft} /> Volver
//       </button>
//       <button onClick={handleSaveAndGeneratePin} className="generate-pin-button">
//         Generar PIN y Guardar
//       </button>
//     </div>
//   );
// };

// export default TemplatePreview;



// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { useTemplate } from '../../../assets/js/TemplateContext';
// import { useNavigate } from 'react-router-dom';
// import ClosedQuestion from '../Questions/ClosedQuestion';
// import OpenQuestion from '../Questions/OpenQuestion';
// import RatingQuestion from '../Questions/RatingQuestion';

// const TemplatePreview = ({  onClose }) => {
//     const { questions, template,participantes,fechaInicio, fechaFin } = useTemplate();
//      // Añadido template aquí
//     console.log('Preguntas del contexto en TemplatePreview:', questions);
//     const navigate = useNavigate();
   
   
//     const renderQuestionComponent = (questionData, index) => {
//       // Adapta los datos de la pregunta para el formato esperado por cada componente
//       const adaptedQuestionData = {
//           number: index + 1,
//           question: questionData.pregunta,
//           // Asegúrate de que 'opciones' esté presente para ClosedQuestion y tenga el formato adecuado
//           options: questionData.tipo === 'closed' ? questionData.opciones : undefined,
//           // Asegúrate de que 'minValue' y 'maxValue' estén presentes para RatingQuestion y tengan el formato adecuado
//           minValue: questionData.tipo === 'rating' ? questionData.minValue : undefined,
//           maxValue: questionData.tipo === 'rating' ? questionData.maxValue : undefined,
//       };
  
//       // Comprueba si los datos de la pregunta son válidos antes de renderizar el componente
//       switch (questionData.tipo) {
//           case 'open':
//               // OpenQuestion no necesita opciones, solo el texto de la pregunta y el número de pregunta
//               if (typeof adaptedQuestionData.question !== 'string') {
//                   console.error('Invalid questionData for OpenQuestion', questionData);
//                   return <div>Invalid question data for OpenQuestion.</div>;
//               }
//               return <OpenQuestion key={index} questionData={adaptedQuestionData} />;
//           case 'closed':
//               return <ClosedQuestion key={index} questionData={adaptedQuestionData} />;
//           case 'rating':
//               if (typeof adaptedQuestionData.minValue !== 'number' || typeof adaptedQuestionData.maxValue !== 'number') {
//                   console.error('Invalid questionData for RatingQuestion', questionData);
//                   return <div>Invalid question data for RatingQuestion.</div>;
//               }
//               return <RatingQuestion key={index} questionData={adaptedQuestionData} />;
//           default:
//               return <div key={index}>Question type not supported</div>;
//       }
//   };
  

//   const handleSaveAndGeneratePin = async () => {
//     // Usa todas las preguntas del contexto, sin filtrar por 'configurada'
    
//     const surveyData = {
//       nombreEncuesta: template.nombre,
//       imagenEncuesta: template.imagen, // o un valor predeterminado si no existe
//       preguntas: questions.map(question => ({
//         textoPregunta: question.pregunta,
//         tipoPregunta: question.tipo,
//         opciones: question.tipo === 'closed' ? question.opciones : undefined,
//         minValue: question.tipo === 'rating' ? question.minValue : undefined,
//         maxValue: question.tipo === 'rating' ? question.maxValue : undefined,
//       })),
//       participantes: participantes,
//       fechaInicio,
//       fechaFin,
//     };
  
//     console.log('Datos a enviar:', surveyData);

//     // Obtén el token del almacenamiento local o la gestión de estado de autenticación
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('No se encontró el token de autenticación.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3001/encuestas', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(surveyData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Error al enviar la encuesta');
//       }

//       const result = await response.json();
//       console.log('Encuesta creada con éxito, PIN:', result.pin);

//       navigate(`/dashboard`, { state: { pin: result.pin } });
//     } catch (error) {
//       console.error('Error al guardar la encuesta:', error);
//     }
//   };
 
//   return (
//     <div>
//         <h2>Vista Previa de la Plantilla</h2>
//         <div className='preview-survey-questions'>
//             {questions.map(renderQuestionComponent)}
//         </div>
//         <button onClick={onClose}>Volver</button>
//         <button onClick={handleSaveAndGeneratePin}>Generar PIN y Guardar</button>
//     </div>
// );
// };


// export default TemplatePreview;



// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { useTemplate } from '../../../assets/js/TemplateContext';
// import { useNavigate } from 'react-router-dom';
// import ClosedQuestion from '../Questions/ClosedQuestion';
// import OpenQuestion from '../Questions/OpenQuestion';
// import RatingQuestion from '../Questions/RatingQuestion';

// const TemplatePreview = ({  onClose }) => {
//     const { questions, template,participantes,fechaInicio, fechaFin } = useTemplate();
//      // Añadido template aquí
//     console.log('Preguntas del contexto en TemplatePreview:', questions);
//     const navigate = useNavigate();
   
   
//     const renderQuestionComponent = (questionData, index) => {
//       // Adapta los datos de la pregunta para el formato esperado por cada componente
//       const adaptedQuestionData = {
//           number: index + 1,
//           question: questionData.pregunta,
//           // Asegúrate de que 'opciones' esté presente para ClosedQuestion y tenga el formato adecuado
//           options: questionData.tipo === 'closed' ? questionData.opciones : undefined,
//           // Asegúrate de que 'minValue' y 'maxValue' estén presentes para RatingQuestion y tengan el formato adecuado
//           minValue: questionData.tipo === 'rating' ? questionData.minValue : undefined,
//           maxValue: questionData.tipo === 'rating' ? questionData.maxValue : undefined,
//       };
  
//       // Comprueba si los datos de la pregunta son válidos antes de renderizar el componente
//       switch (questionData.tipo) {
//           case 'open':
//               // OpenQuestion no necesita opciones, solo el texto de la pregunta y el número de pregunta
//               if (typeof adaptedQuestionData.question !== 'string') {
//                   console.error('Invalid questionData for OpenQuestion', questionData);
//                   return <div>Invalid question data for OpenQuestion.</div>;
//               }
//               return <OpenQuestion key={index} questionData={adaptedQuestionData} />;
//           case 'closed':
//               return <ClosedQuestion key={index} questionData={adaptedQuestionData} />;
//           case 'rating':
//               if (typeof adaptedQuestionData.minValue !== 'number' || typeof adaptedQuestionData.maxValue !== 'number') {
//                   console.error('Invalid questionData for RatingQuestion', questionData);
//                   return <div>Invalid question data for RatingQuestion.</div>;
//               }
//               return <RatingQuestion key={index} questionData={adaptedQuestionData} />;
//           default:
//               return <div key={index}>Question type not supported</div>;
//       }
//   };
  

//   const handleSaveAndGeneratePin = async () => {
//     // Usa todas las preguntas del contexto, sin filtrar por 'configurada'
    
//     const surveyData = {
//       nombreEncuesta: template.nombre,
//       imagenEncuesta: template.imagen, // o un valor predeterminado si no existe
//       preguntas: questions.map(question => ({
//         textoPregunta: question.pregunta,
//         tipoPregunta: question.tipo,
//         opciones: question.tipo === 'closed' ? question.opciones : undefined,
//         minValue: question.tipo === 'rating' ? question.minValue : undefined,
//         maxValue: question.tipo === 'rating' ? question.maxValue : undefined,
//       })),
//       participantes: participantes,
//       fechaInicio,
//       fechaFin,
//     };
  
//     console.log('Datos a enviar:', surveyData);

//     // Obtén el token del almacenamiento local o la gestión de estado de autenticación
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('No se encontró el token de autenticación.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3001/encuestas', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(surveyData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Error al enviar la encuesta');
//       }

//       const result = await response.json();
//       console.log('Encuesta creada con éxito, PIN:', result.pin);

//       navigate(`/dashboard`, { state: { pin: result.pin } });
//     } catch (error) {
//       console.error('Error al guardar la encuesta:', error);
//     }
//   };
 
//   return (
//     <div className="dynamic-survey-launch"> {/* Clase similar a LaunchSurvey para consistencia */}
//     <span>Vista previa</span>
//         <div className="big-form-container-launch"> {/* Suponiendo una estructura similar */}
//             <header className="diagnostic-name-survey">
//                 <h2>Añadir nombre</h2>
//             </header>
//             <div className="launched-survey-questions">
//                 {questions.map(renderQuestionComponent)}
//             </div>
//             {/* Añade aquí botones o cualquier otro elemento que necesite estilización consistente */}
//         </div>
//         <div className="button-side">
//             <button onClick={onClose} className="launch-button">Volver</button>
//             <button onClick={handleSaveAndGeneratePin} className="add-question-button">Generar PIN y Guardar</button>
//         </div>
//     </div>
// );
// };


// export default TemplatePreview;


import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useTemplate } from '../../../assets/js/TemplateContext';
import { useNavigate } from 'react-router-dom';
import ClosedQuestion from '../Questions/ClosedQuestion';
import OpenQuestion from '../Questions/OpenQuestion';
import RatingQuestion from '../Questions/RatingQuestion';

const TemplatePreview = ({ onClose }) => {
    const { questions, template, participantes, fechaInicio, fechaFin } = useTemplate();
    console.log('Preguntas del contexto en TemplatePreview:', questions);
    const navigate = useNavigate();

    const renderQuestionComponent = (questionData, index) => {
        const adaptedQuestionData = {
            number: index + 1,
            question: questionData.pregunta,
            options: questionData.tipo === 'closed' ? questionData.opciones : undefined,
            minValue: questionData.tipo === 'rating' ? questionData.minValue : undefined,
            maxValue: questionData.tipo === 'rating' ? questionData.maxValue : undefined,
        };

        switch (questionData.tipo) {
            case 'open':
                return <OpenQuestion key={index} questionData={adaptedQuestionData} />;
            case 'closed':
                return <ClosedQuestion key={index} questionData={adaptedQuestionData} />;
            case 'rating':
                return <RatingQuestion key={index} questionData={adaptedQuestionData} />;
            default:
                return <div key={index}>Question type not supported</div>;
        }
    };

    const handleSaveAndGeneratePin = async () => {
        const surveyData = {
            nombreEncuesta: template.nombre,
            imagenEncuesta: template.imagen,
            preguntas: questions.map(question => ({
                textoPregunta: question.pregunta,
                tipoPregunta: question.tipo,
                opciones: question.tipo === 'closed' ? question.opciones : undefined,
                minValue: question.tipo === 'rating' ? question.minValue : undefined,
                maxValue: question.tipo === 'rating' ? question.maxValue : undefined,
            })),
            participantes: participantes,
            fechaInicio,
            fechaFin,
        };


        console.log('Datos a enviar:', surveyData.nombreEncuesta);
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No se encontró el token de autenticación.');
            return;
        }
        alert('Datos a enviar:', surveyData);
        try {
            const response = await fetch('http://localhost:3001/encuestas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(surveyData),
            });
            console.log("problema 2")
            alert('Datos a enviar 2:', surveyData);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al enviar la encuesta');
            }

            const result = await response.json();
            console.log('Encuesta creada con éxito, PIN:', result.pin);

            navigate(`/dashboard`, { state: { pin: result.pin } });
        } catch (error) {
            console.error('Error al guardar la encuesta:', error);
        }
    };

    return (
        <div className="dynamic-survey-launch">
            <span>Vista previa</span>
            <div className="big-form-container-launch">
                <header className="diagnostic-name-survey">
                    <h2>{template.nombre || 'Añadir nombre'}</h2> {/* Muestra el nombre de la encuesta aquí */}
                </header>
                <div className="launched-survey-questions">
                    {questions.map(renderQuestionComponent)}
                </div>
            </div>
            <div className="button-side">
                <button onClick={onClose} className="launch-button"><FontAwesomeIcon icon={faArrowLeft} />Volver</button>
                <button onClick={handleSaveAndGeneratePin} className="PIN-button">Generar PIN y Guardar</button>
            </div>
        </div>
    );
};

export default TemplatePreview;
