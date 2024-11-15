// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import ClosedQuestion from './Admin-/Questions/ClosedQuestion';
// import OpenQuestion from './Admin-/Questions/OpenQuestion';
// import RatingQuestion from './Admin-/Questions/RatingQuestion';

// const Survey = () => {
//   const { pin } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function loadQuestions() {
//       setIsLoading(true);
//       const token = localStorage.getItem('token');
//       try {
//         const response = await fetch(`http://localhost:3001/survey/${pin}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         if (!response.ok) {
//           throw new Error('Respuesta del servidor no fue OK');
//         }
//         const data = await response.json();
//         setQuestions(data.questions);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     loadQuestions();
//   }, [pin]);

//   const renderQuestionComponent = (questionData, index) => {
//     // Prepara la prop 'questionData' que cada componente de pregunta espera
//     const propsForQuestion = {
//       questionData: {
//         ...questionData,
//         number: index + 1, // Asegura que 'number' se incluya aquí
//       }
//     };

//     switch (questionData.type) {
//       case 'open':
//         return <OpenQuestion key={questionData.id} {...propsForQuestion} />;
//       case 'closed':
//         return <ClosedQuestion key={questionData.id} {...propsForQuestion} />;
//       case 'rating':
//         return <RatingQuestion key={questionData.id} {...propsForQuestion} />;
//       default:
//         return <div key={questionData.id}>Tipo de pregunta no soportado.</div>;
//     }
//   };

//   if (isLoading) {
//     return <div>Cargando preguntas...</div>;
//   }

//   return (
//     <div>
//       <h2>Encuesta: {pin}</h2>
//       <form>
//         {questions.map(renderQuestionComponent)}
//         <button type="submit">Enviar respuestas</button>
//       </form>
//     </div>
//   );
// };

// export default Survey;



// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import ClosedQuestion from './Admin-/Questions/ClosedQuestion';
// import OpenQuestion from './Admin-/Questions/OpenQuestion';
// import RatingQuestion from './Admin-/Questions/RatingQuestion';
// import '../assets/styles/SurveyStyles.css';

// const Survey = () => {
//   const { pin } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [surveyName, setSurveyName] = useState(''); // Para almacenar el nombre de la encuesta
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function loadQuestions() {
//       setIsLoading(true);
//       const token = localStorage.getItem('token');
//       try {
//         const response = await fetch(`http://localhost:3001/survey/${pin}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         if (!response.ok) {
//           throw new Error('Respuesta del servidor no fue OK');
//         }
//         const data = await response.json();
  
//         // Adaptar los datos aquí
//         const adaptedQuestions = data.questions.map((q) => ({
//           id: q.id,
//           question: q.pregunta,
//           type: q.tipo,
//           // Convertir cadena de opciones en un arreglo si el tipo es 'closed'
//           options: q.tipo === 'closed' && typeof q.opciones === 'string' ? q.opciones.split(',') : q.opciones || [],
//           minValue: q.minValue,
//           maxValue: q.maxValue,
//         }));
//         console.log("Bitch", adaptedQuestions);
  
//         setQuestions(adaptedQuestions);
//         setSurveyName(data.surveyName);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
  
//     loadQuestions();
//   }, [pin]);
  

//   const renderQuestionComponent = (questionData, index) => {
//          // Prepara la prop 'questionData' que cada componente de pregunta espera
//          const propsForQuestion = {
//            questionData: {
//             ...questionData,
//              number: index + 1, // Asegura que 'number' se incluya aquí
//            }
//          };
    
//          switch (questionData.type) {
//            case 'open':
//              return <OpenQuestion key={questionData.id} {...propsForQuestion} />;
//            case 'closed':
//              return <ClosedQuestion key={questionData.id} {...propsForQuestion} />;
//            case 'rating':
//              return <RatingQuestion key={questionData.id} {...propsForQuestion} />;
//            default:
//              return <div key={questionData.id}>Tipo de pregunta no soportado.</div>;
//          }
//        };
    
//        if (isLoading) {
//          return <div>Cargando preguntas...</div>;
//        }

//        return (
//         <div className="survey-container">
//           <div className="survey-header">
//             <h3>Encuesta: {pin}</h3>
//           </div>
//           <form className="survey-form">
//             <h2>{surveyName}</h2>
//             {questions.map((questionData, index) => (
//               <div key={questionData.id} className="survey-question">
//                 {renderQuestionComponent(questionData, index)}
//               </div>
//             ))}
//             <button type="submit" className="submit-button">Enviar respuestas</button>
//           </form>
//         </div>
//       );
//     };

// export default Survey;




// BUENO-ULTIMO

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import ClosedQuestion from '../components/common-questions/SingleChoice';
// import OpenQuestion from '../components/common-questions/LongAnswerQuestion';
// import RatingQuestion from '../components/common-questions/TRating';
// import '../assets/styles/SurveyStyles.css';

// const Survey = () => {
//   const { pin } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Nuevo estado para la pregunta actual
//   const [surveyName, setSurveyName] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [respuestas, setRespuestas] = useState([]);
//   const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);




//   useEffect(() => {
//     async function loadQuestions() {
//       setIsLoading(true);
//       const token = localStorage.getItem('token');
//       try {
//         const response = await fetch(`http://localhost:3001/survey/${pin}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         if (!response.ok) {
//           throw new Error('Respuesta del servidor no fue OK');
//         }
//         const data = await response.json();
  
//         // Adaptar los datos aquí
//         const adaptedQuestions = data.questions.map((q) => ({
//           id: q.id,
//           question: q.pregunta,
//           type: q.tipo,
//           // Convertir cadena de opciones en un arreglo si el tipo es 'closed'
//           options: q.tipo === 'closed' && typeof q.opciones === 'string' ? q.opciones.split(',') : q.opciones || [],
//           minValue: q.minValue,
//           maxValue: q.maxValue,
//         }));
//         console.log("Bitch", adaptedQuestions);
  
//         setQuestions(adaptedQuestions);
//         setSurveyName(data.surveyName);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
  
//     loadQuestions();
//   }, [pin]);
  

//   const handleNextQuestion = (respuestaActual) => {
//     const nextIndex = currentQuestionIndex + 1;
//     setRespuestas(prevRespuestas => [...prevRespuestas, respuestaActual]);

//     if (nextIndex < questions.length) {
//       setCurrentQuestionIndex(nextIndex);
//     } else {
//       // No hay más preguntas, marcar la encuesta como completada
//       setIsSurveyCompleted(true);
//     }
//   };





// const handleSubmit = async () => {

  
//   console.log("Porfi",respuestas);
//   try {
//       const response = await fetch('http://localhost:3001/enviar-respuestas', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//           body: JSON.stringify({
//               idEncuesta: pin,
//               respuestas,
//           }),
//       });

//       if (!response.ok) throw new Error('Error al enviar respuestas');
//       const data = await response.json();
//       console.log(data.message); // Maneja la respuesta exitosa aquí
//   } catch (error) {
//       console.error('Error enviando respuestas:', error);
//       // Manejo del error aquí
//   }
// };

  



//   const renderQuestionComponent = (questionData, index) => {
//     const isLast = index === questions.length - 1;
//     const propsForQuestion = {
//       questionData: {
//         ...questionData,
//         number: index + 1,
//       },
//       // Pasar también handleNextQuestion para avanzar a la siguiente pregunta
//       onNext: handleNextQuestion,
//       isLast: isLast,
    
      
      
      
//     };

//     switch (questionData.type) {
//       case 'open':
//         return <OpenQuestion key={questionData.id} {...propsForQuestion} />;
//       case 'closed':
//         return <ClosedQuestion key={questionData.id} {...propsForQuestion} />;
//       case 'rating':
//         return <RatingQuestion key={questionData.id} {...propsForQuestion} />;
//       default:
//         return <div key={questionData.id}>Tipo de pregunta no soportado.</div>;
//     }
//   };

//   if (isLoading) {
//     return <div>Cargando preguntas...</div>;
//   }

//   if (isSurveyCompleted) {
//     return (
//       <div className="survey-container">
//         <div className="survey-header">
//           <h3>Encuesta completada, ¡gracias por tu participación!</h3>
//         </div>
//         <div className="survey-completion-actions">
//           <button type="button" onClick={handleSubmit}>Enviar respuestas</button>
//           {/* Aquí podrías añadir otro botón para revisar respuestas si lo necesitas */}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="survey-container">
//       <div className="survey-header">
//         <h3>Encuesta: {pin}</h3>
//         <h2>{surveyName}</h2>
//       </div>
//       <form className="survey-form-pin" onSubmit={(e) => e.preventDefault()}>
//         {/* Renderizar solo la pregunta actual basado en currentQuestionIndex */}
//         {questions[currentQuestionIndex] && renderQuestionComponent(questions[currentQuestionIndex], currentQuestionIndex)}
//         {currentQuestionIndex === questions.length - 1 && (
//           <button type="button" className="submit-button" onClick={handleSubmit}>Enviar respuestas</button>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Survey;


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import ClosedQuestion from '../components/common-questions/SingleChoice';
// import OpenQuestion from '../components/common-questions/LongAnswerQuestion';
// import RatingQuestion from '../components/common-questions/TRating';
// import '../assets/styles/SurveyStyles.css';

// const Survey = () => {
//   const { pin } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Nuevo estado para la pregunta actual
//   const [surveyName, setSurveyName] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [respuestas, setRespuestas] = useState([]);
//   const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
//   const [isReviewingAnswers, setIsReviewingAnswers] = useState(false);



//   useEffect(() => {
//     async function loadQuestions() {
//       setIsLoading(true);
//       const token = localStorage.getItem('token');
//       try {
//         const response = await fetch(`http://localhost:3001/survey/${pin}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         if (!response.ok) {
//           throw new Error('Respuesta del servidor no fue OK');
//         }
//         const data = await response.json();
  
//         // Adaptar los datos aquí
//         const adaptedQuestions = data.questions.map((q) => ({
//           id: q.id,
//           question: q.pregunta,
//           type: q.tipo,
//           // Convertir cadena de opciones en un arreglo si el tipo es 'closed'
//           options: q.tipo === 'closed' && typeof q.opciones === 'string' ? q.opciones.split(',') : q.opciones || [],
//           minValue: q.minValue,
//           maxValue: q.maxValue,
//         }));
//         console.log("Bitch", adaptedQuestions);
  
//         setQuestions(adaptedQuestions);
//         setSurveyName(data.surveyName);
//       } catch (error) {
//         console.error('Error fetching questions:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
  
//     loadQuestions();
//   }, [pin]);
  
//   const handleReviewAnswers = () => {
//     setIsReviewingAnswers(true); // Activa el modo de revisión
//   };

 

//   const handleNextQuestion = (respuestaActual) => {
//     const existingResponseIndex = respuestas.findIndex(resp => resp.idPregunta === respuestaActual.idPregunta);
    
//     setRespuestas(prevRespuestas => {
//       if (existingResponseIndex !== -1) {
//         const updatedRespuestas = [...prevRespuestas];
//         updatedRespuestas[existingResponseIndex] = respuestaActual;
//         console.log(`Respuesta actualizada para la pregunta ${respuestaActual.idPregunta}:`, respuestaActual);
//         return updatedRespuestas;
//       } else {
//         console.log(`Añadiendo nueva respuesta para la pregunta ${respuestaActual.idPregunta}:`, respuestaActual);
//         return [...prevRespuestas, respuestaActual];
//       }
//     });
  
//     if (!isReviewingAnswers) {
//       const nextIndex = currentQuestionIndex + 1;
//       if (nextIndex < questions.length) {
//         setCurrentQuestionIndex(nextIndex);
//       } else {
//         // No hay más preguntas, marcar la encuesta como completada
//         setIsSurveyCompleted(true);
//       }
//     }
//   };
  





// const handleSubmit = async () => {

  
//   console.log("Porfi",respuestas);
//   try {
//       const response = await fetch('http://localhost:3001/enviar-respuestas', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//           body: JSON.stringify({
//               idEncuesta: pin,
//               respuestas,
//           }),
//       });

//       if (!response.ok) throw new Error('Error al enviar respuestas');
//       const data = await response.json();
//       console.log(data.message); // Maneja la respuesta exitosa aquí
//   } catch (error) {
//       console.error('Error enviando respuestas:', error);
//       // Manejo del error aquí
//   }
// };

  
// const renderQuestionsForReview = () => {
//   console.log('Respuestas:', respuestas);

//   return questions.map((question, index) => {
//     // Asegúrate de que cada pregunta tiene un 'number' y encuentra la respuesta correspondiente
//     const questionNumber = index + 1;
//     const responseForQuestion = respuestas.find(resp => resp.idPregunta === question.id);
    
//     // Si no hay respuesta para la pregunta, establece un valor por defecto apropiado
//     const initialAnswer = responseForQuestion ? responseForQuestion.respuesta : (question.type === 'open' ? '' : question.type === 'rating' ? question.minValue : '');

//     // Renderiza el componente de pregunta con la respuesta inicial
//     switch (question.type) {
//       case 'open':
//         return (
//           <OpenQuestion
//             key={question.id}
//             questionData={{ ...question, number: questionNumber }}
//             initialAnswer={initialAnswer}
//             onNext={() => {}} // Aquí puedes manejar el evento onNext si es necesario
//           />
//         );
//       case 'closed':
//         return (
//           <ClosedQuestion
//             key={question.id}
//             questionData={{ ...question, number: questionNumber }}
//             initialAnswer={initialAnswer}
//             onNext={() => {}} // Aquí puedes manejar el evento onNext si es necesario
//           />
//         );
//       case 'rating':
//         return (
//           <RatingQuestion
//             key={question.id}
//             questionData={{ ...question, number: questionNumber }}
//             initialAnswer={initialAnswer}
//             onNext={() => {}} // Aquí puedes manejar el evento onNext si es necesario
//           />
//         );
//       default:
//         return <div key={question.id}>Tipo de pregunta no soportado</div>;
//     }
//   });
// };


// if (isReviewingAnswers) {
//   return (
//     <div className="survey-container">
//       <div className="survey-header">
//         <h2>Revisión de Respuestas</h2>
//       </div>
//       <div>
//         {renderQuestionsForReview()}
//       </div>
//       <button type="button" onClick={handleSubmit}>Enviar respuestas revisadas</button>
//     </div>
//   );
// }


//   const renderQuestionComponent = (questionData, index) => {
//     const isLast = index === questions.length - 1;
//     const propsForQuestion = {
//       questionData: {
//         ...questionData,
//         number: index + 1,
//       },
//       // Pasar también handleNextQuestion para avanzar a la siguiente pregunta
//       onNext: handleNextQuestion,
//       isLast: isLast,  
//     };

//     switch (questionData.type) {
//       case 'open':
//         return <OpenQuestion key={questionData.id} {...propsForQuestion} />;
//       case 'closed':
//         return <ClosedQuestion key={questionData.id} {...propsForQuestion} />;
//       case 'rating':
//         return <RatingQuestion key={questionData.id} {...propsForQuestion} />;
//       default:
//         return <div key={questionData.id}>Tipo de pregunta no soportado.</div>;
//     }
//   };

//   if (isLoading) {
//     return <div>Cargando preguntas...</div>;
//   }

//   if (isSurveyCompleted && !isReviewingAnswers) {
//     return (
//       <div className="survey-container">
//         <div className="survey-header">
//           <h3>Encuesta completada, ¡gracias por tu participación!</h3>
//         </div>
//         <div className="survey-completion-actions">
//           <button type="button" onClick={handleSubmit}>Enviar respuestas</button>
//           <button type="button" onClick={handleReviewAnswers}>Revisar respuestas</button>
//         </div>
//       </div>
//     );
//   }


//   return (
//     <div className="survey-container">
//       <div className="survey-header">
//         <h3>Encuesta: {pin}</h3>
//         <h2>{surveyName}</h2>
//       </div>
//       <form className="survey-form-pin" onSubmit={(e) => e.preventDefault()}>
//         {questions[currentQuestionIndex] && renderQuestionComponent(questions[currentQuestionIndex], currentQuestionIndex)}

//         {isReviewingAnswers && (
//           <>
//             <button type="button" onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)} disabled={currentQuestionIndex === 0}>Anterior</button>
//             <button type="button" onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} disabled={currentQuestionIndex === questions.length - 1}>Siguiente</button>
//             <button type="button" className="submit-button" onClick={() => setIsSurveyCompleted(true)}>Finalizar encuesta</button>
//           </>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Survey;




import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo.svg';

import ClosedQuestion from '../components/common-questions/SingleChoice';
import OpenQuestion from '../components/common-questions/LongAnswerQuestion';
import RatingQuestion from '../components/common-questions/TRating';
import '../assets/styles/SurveyStyles.css';
import Success from './Login-SignUp/Success';

const Survey = () => {
  const { pin } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Nuevo estado para la pregunta actual
  const [surveyName, setSurveyName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [respuestas, setRespuestas] = useState([]);
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
  const [isReviewingAnswers, setIsReviewingAnswers] = useState(false);
  const [surveyId, setSurveyId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();




  useEffect(() => {
    async function loadQuestions() {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:3001/survey/${pin}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Respuesta del servidor no fue OK');
        }
        const data = await response.json();
  
        // Adaptar los datos aquí
        const adaptedQuestions = data.questions.map((q) => ({
          id: q.id,
          question: q.pregunta,
          type: q.tipo,
          // Convertir cadena de opciones en un arreglo si el tipo es 'closed'
          options: q.tipo === 'closed' && typeof q.opciones === 'string' ? q.opciones.split(',') : q.opciones || [],
          minValue: q.minValue,
          maxValue: q.maxValue,
        }));
        console.log("Bitch", adaptedQuestions);
  
        setQuestions(adaptedQuestions);
        setSurveyName(data.surveyName);
        setSurveyId(data.idEncuesta);
        console.log("Me cago en la puta", data.idEncuesta, data.surveyName, adaptedQuestions)
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setIsLoading(false);
      }
    }
  
    loadQuestions();
  }, [pin]);
  
  const handleReviewAnswers = () => {
    setIsReviewingAnswers(true); // Activa el modo de revisión
  };

 

  const handleNextQuestion = (respuestaActual) => {
    const existingResponseIndex = respuestas.findIndex(resp => resp.idPregunta === respuestaActual.idPregunta);
  
    setRespuestas(prevRespuestas => {
      if (existingResponseIndex !== -1) {
        const updatedRespuestas = [...prevRespuestas];
        updatedRespuestas[existingResponseIndex] = respuestaActual;
        console.log(`Respuesta actualizada para la pregunta ${respuestaActual.idPregunta}:`, respuestaActual);
        return updatedRespuestas;
      } else {
        console.log(`Añadiendo nueva respuesta para la pregunta ${respuestaActual.idPregunta}:`, respuestaActual);
        return [...prevRespuestas, {...respuestaActual, tipo: questions[currentQuestionIndex].type}];
      }
    });
  
    if (!isReviewingAnswers) {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        // No hay más preguntas, marcar la encuesta como completada
        setIsSurveyCompleted(true);
      }
    }
  };
  


  const onAnswerUpdate = (updatedResponse) => {
    setRespuestas(prevRespuestas => {
      const existingIndex = prevRespuestas.findIndex(resp => resp.idPregunta === updatedResponse.idPregunta);
      if (existingIndex !== -1) {
        // Respuesta existente, actualizarla
        const newRespuestas = [...prevRespuestas];
        newRespuestas[existingIndex] = updatedResponse;
        return newRespuestas;
      } else {
        // Nueva respuesta, añadirla
        return [...prevRespuestas, updatedResponse];
      }
    });
  };
  


const handleSubmit = async () => {

  const respuestasParaEnviar = respuestas.map(r => ({
    id_pregunta: r.idPregunta,
    id_encuesta: surveyId,
    tipo: r.tipo,
    respuesta: r.respuesta
  }));

  console.log("Porfi",respuestasParaEnviar);
  try {
      const response = await fetch('http://localhost:3001/respuestas', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
              respuestas: respuestasParaEnviar, 
          }),
      });

      if (!response.ok) throw new Error('Error al enviar respuestas');
      const data = await response.json();
      console.log(data.message,"Es esto?"); // Maneja la respuesta exitosa aquí
      setShowSuccess(true);
  } catch (error) {
      console.error('Error enviando respuestas:', error);
      // Manejo del error aquí
      setShowSuccess(false);
  }
};

// Función para manejar el cierre del mensaje de éxito
const handleDismissSuccessMessage = () => {
  setShowSuccess(false);
  navigate('/pin'); // Redirige al inicio
};
  
const renderQuestionsForReview = () => {
  console.log('Respuestas:', respuestas);

  return questions.map((question, index) => {
    const responseForQuestion = respuestas.find(resp => resp.idPregunta === question.id);
    const initialAnswer = responseForQuestion ? responseForQuestion.respuesta : '';
    
    // Determinar el componente de pregunta basado en el tipo de pregunta
    let QuestionComponent = null;
    switch (question.type) {
      case 'open':
        QuestionComponent = OpenQuestion;
        break;
      case 'closed':
        QuestionComponent = ClosedQuestion;
        break;
      case 'rating':
        QuestionComponent = RatingQuestion;
        break;
      default:
        return <div key={question.id}>Tipo de pregunta no soportado</div>;
    }

    return (
      <QuestionComponent
        key={question.id}
        questionData={{ ...question, number: index + 1 }}
        initialAnswer={initialAnswer}
        onAnswerUpdate={onAnswerUpdate}
        isReviewing={isReviewingAnswers}
        onNext={handleNextQuestion}
      />
    );
  });
};


if (isReviewingAnswers) {
  if (showSuccess) {
    // Si showSuccess es true, muestra solo el componente Success
    return (
      <Success
        message={
          <>
            ¡Muchas gracias por participar!
            <br />
            Tu respuesta ha sido enviada con éxito.
          </>
        }
        onDismiss={handleDismissSuccessMessage}
      />
    );
    
  } else {
    // Si showSuccess es false, muestra el contenido de revisión de respuestas
    return (
      <div className="common-container">
        <div className="logo-background">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div className="survey-container">
          <div className="survey-header">
            <h2>Revisión de Respuestas</h2>
          </div>
          <div className='review-questions'>
            {renderQuestionsForReview()}
          </div>
          <button type="button" onClick={handleSubmit}>Enviar respuestas revisadas</button>
        </div>
        </div>
    );
  }
}




  const renderQuestionComponent = (questionData, index) => {
    const isLast = index === questions.length - 1;
    const propsForQuestion = {
      questionData: {
        ...questionData,
        number: index + 1,
      },
      // Pasar también handleNextQuestion para avanzar a la siguiente pregunta
      onNext: handleNextQuestion,
      isLast: isLast,  
    };

    switch (questionData.type) {
      case 'open':
        return <OpenQuestion key={questionData.id} {...propsForQuestion} />;
      case 'closed':
        return <ClosedQuestion key={questionData.id} {...propsForQuestion} />;
      case 'rating':
        return <RatingQuestion key={questionData.id} {...propsForQuestion} />;
      default:
        return <div key={questionData.id}>Tipo de pregunta no soportado.</div>;
    }
  };

  if (isLoading) {
    return <div>Cargando preguntas...</div>;
  }

  if (isSurveyCompleted && !isReviewingAnswers) {
    return (
      <div className="survey-container">
        {showSuccess ? (
          <Success message="¡Muchas gracias por participar! Tu respuesta ha sido enviada con éxito." onDismiss={handleDismissSuccessMessage} />
        ) : (
          <>
          <div className="common-container">
              <div className="logo-background">
                <img src={Logo} alt="Logo" className="logo" />
              </div>
              
            <div className='survey-msg-container'>
              <div className="survey-header">
                <h2>Encuesta completada <br></br>¡Gracias por tu participación!</h2>
              </div>
              <div className="survey-completion-actions">
                <button type="button" onClick={handleSubmit}>Enviar respuestas</button>
                <button type="button" onClick={handleReviewAnswers}>Revisar respuestas</button>
              </div>
            </div>
            </div>
              
          </>
        )}
      </div>
    );
}



  return (
    <div className="common-container">
      <div className="logo-background">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="survey-container">
        <div className="survey-header">
          <h3>Encuesta: {pin}</h3>
          <h2>{surveyName}</h2>
        </div>
        <form className="survey-form-pin" onSubmit={(e) => e.preventDefault()}>
          {questions[currentQuestionIndex] && renderQuestionComponent(questions[currentQuestionIndex], currentQuestionIndex)}

          {isReviewingAnswers && (
            <>
              <button type="button" onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)} disabled={currentQuestionIndex === 0}>Anterior</button>
              <button type="button" onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} disabled={currentQuestionIndex === questions.length - 1}>Siguiente</button>
              <button type="button" className="submit-button" onClick={() => setIsSurveyCompleted(true)}>Finalizar encuesta</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Survey;