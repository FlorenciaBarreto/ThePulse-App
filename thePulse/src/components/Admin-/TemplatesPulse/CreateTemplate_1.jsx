// import React, { useRef, useState } from 'react';
// import { useSurvey } from '../../../assets/js/SurveyContext';
// import '../../../assets/styles/Survey.css';
// // import Logo from '../../assets/images/logo_w.png';
//  import QuestionTypeModal from '../CreateSurvey/QuestionTypeModal';
//  import LaunchSurvey from '../CreateSurvey/LaunchSurvey';

// const CreateTemplateStep1 = ({ onEditingQuestion,diagnosticName }) => {
//   const {  questions, setQuestions, updateDiagnosticImage } = useSurvey();
//   const [showModal, setShowModal] = useState(false);
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
//   const [isLaunched, setIsLaunched] = useState(false);
//   const [fileName, setFileName] = useState('');
//   const fileInputRef = useRef(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleQuestionSelect = (index) => {
//     setSelectedQuestionIndex(index);
//     setShowModal(true);
//     onEditingQuestion(true);
//     setIsModalOpen(true); // Abre el modal // Establecer que estamos editando una pregunta
//   };

//   const addNewQuestion = () => {
//     const newQuestion = {
//       id: new Date().getTime(), // Utilizar una librería como UUID para un ID único es una mejor práctica
//       data: null,
//       configured: false,
//     };
//     setQuestions([...questions, newQuestion]);
//   };

//   const closeModal = (questionData) => {
//     if (questionData) {
//       const updatedQuestions = questions.map((q, idx) =>
//         idx === selectedQuestionIndex ? { ...q, data: questionData, configured: true } : q
//       );
//       setQuestions(updatedQuestions);
//     }
//     setShowModal(false);
//     onEditingQuestion(false);
//     setIsModalOpen(false);
//   };

//   const handleLaunch = () => {
//     setIsLaunched(true);
//     console.log('Preguntas configuradas:', questions.filter(q => q.configured));
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       updateDiagnosticImage(URL.createObjectURL(file));
//       setFileName(file.name);
//     }
//   };

//   const triggerFileInputClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className="container-launch-survey">
//       {showModal && selectedQuestionIndex !== null ? (
//         <QuestionTypeModal
//           onClose={closeModal}
//           existingData={questions[selectedQuestionIndex]?.data}
//           onEditingQuestion={onEditingQuestion} // Asegúrate de pasar esta prop
// />
//       ) : (
//         <>
//           <div className="big-form-container">
//             <header className="diagnostic-header">
//               <h3>{diagnosticName}</h3>
//               <button className="launch-button" onClick={handleLaunch}>Lanzar</button>
//             </header>
//             <div className="questions-container">
//               {questions.map((question, index) => (
//                 <button key={question.id} onClick={() => handleQuestionSelect(index)} className={`question-select-button ${question.configured ? 'configured-question' : ''}`}>
//                   {`Pregunta ${index + 1} ${question.configured ? '(Configurada)' : ''}`}
//                 </button>
//               ))}
//               <button className="add-question-button" onClick={addNewQuestion}>
//                 + Añadir nueva pregunta
//               </button>
//               <div className="upload-logo-container">
//                 <button className="add-question-button" onClick={triggerFileInputClick}>Añade tu logo</button>
//                 {fileName && <div className="file-name">{fileName}</div>}
//                 <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
//               </div>
//             </div>
//           </div>
//           {isLaunched && <LaunchSurvey />}
//         </>
//       )}
//     </div>
//   );
// };

// export default CreateTemplateStep1;

//  import React, { useState,useRef,useEffect } from 'react'; // Elimina useEffect y useRef si no los estás utilizando
//  import { useTemplate } from '../../../assets/js/TemplateContext';
//  import LaunchSurvey from '../CreateSurvey/LaunchSurvey';
//  import '../../../assets/styles/Survey.css';
//  import {
//    OpenQuestionComponent,
//    ClosedQuestionComponent,
//    RatingQuestionComponent
//  } from './QuestionTypeModalTemplate';

//  const CreateTemplateStep1 = ({ predefinedQuestions, diagnosticName, onEditingQuestion }) => {
//    const { setTemplateQuestions, updateDiagnosticName, updateDiagnosticImage, updateQuestions,updateTemplateQuestions} = useTemplate(); // Usa el contexto
//    const [isLaunched, setIsLaunched] = useState(false);
//    const [fileName, setFileName] = useState('');
//    const fileInputRef = useRef(null);
//    const [currentQuestion, setCurrentQuestion] = useState(null);
//    const [isModalOpen, setIsModalOpen] = useState(false);
//    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
//    const [selectedQuestion, setSelectedQuestion] = useState(null);

//    useEffect(() => {
//      updateTemplateQuestions(predefinedQuestions); // Establece las preguntas configuradas en el contexto
//    }, [predefinedQuestions, setTemplateQuestions]);

//    const handleQuestionSelect = (question) => {
//      const selectedQ = predefinedQuestions[index];
//      setCurrentQuestion({ ...selectedQ, question: selectedQ.textoPregunta, key:index,options: selectedQ.tipoPregunta === 'closed' ? selectedQ.opciones : [],});
//      setCurrentQuestionIndex(index); // Guardamos el índice de la pregunta actual
//      setIsModalOpen(true); // Indicamos que se debe mostrar el modal/interfaz de edición
//      onEditingQuestion(true); // Actualizamos el estado para indicar que estamos editando una pregunta
//    };

//    const handleAddQuestion = (newQuestionData) => {
//      // Actualiza las preguntas con la nueva información
//      // Esto es solo un ejemplo, necesitarás ajustar la lógica según tu aplicación específica
//      const updatedQuestions = predefinedQuestions.map((question, index) =>
//        index === currentQuestionIndex ? { ...question, ...newQuestionData } : question
//      );

//      setTemplateQuestions(updatedQuestions); // Actualiza el estado con las preguntas actualizadas
//      setCurrentQuestion(null); // Limpia la pregunta actual seleccionada
//      setIsModalOpen(false); // Cierra el modal o interfaz de edición
//      onEditingQuestion(false); // Indica que ya no estás editando una pregunta
//    };

//    const handleLaunch = () => {
//      updateDiagnosticName(diagnosticName);
//      setIsLaunched(true);
//      updateQuestions(predefinedQuestions);
//      console.log('Preguntas configuradas:', predefinedQuestions.filter(q => q.configured));
//    };

//    const handleImageUpload = (event) => {
//      const file = event.target.files[0];
//      if (file) {
//        updateDiagnosticImage(URL.createObjectURL(file));
//        setFileName(file.name);
//      }
//    };

//    return (
//      <div className="container-launch-survey">
//        <div className="big-form-container">
//          <header className="diagnostic-header">
//            <h3>{diagnosticName}</h3>
//            <button className="launch-button" onClick={handleLaunch}>Lanzar</button>
//          </header>
//          <div className="questions-container">
//            {predefinedQuestions.map((question, index) => (
//              <button key={index} onClick={() => handleQuestionSelect(index)} className={`question-select-button ${question.configured ? 'configured-question' : ''}`}>
//                {`Pregunta ${index + 1} ${question.configured ? '(Configurada)' : ''}`}
//              </button>
//            ))}
//            <div className="upload-logo-container">
//              <button className="add-question-button" onClick={() => fileInputRef.current.click()}>Añade tu logo</button>
//              {fileName && <div className="file-name">{fileName}</div>}
//              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
//            </div>
//          </div>
//        </div>
//        {selectedQuestion && (
//       <QuestionTypeModal
//         existingData={selectedQuestion}
//         onClose={() => setSelectedQuestion(null)}
//         onEditingQuestion={onEditingQuestion}
//       />
//     )}
//        {isLaunched && <LaunchSurvey />}
//      </div>
//    );
//  };

//  export default CreateTemplateStep1;





// import React, { useState,useRef,useEffect } from 'react'; // Elimina useEffect y useRef si no los estás utilizando
// import { useTemplate } from '../../../assets/js/TemplateContext';
// import LaunchSurvey from '../CreateSurvey/LaunchSurvey';
// import '../../../assets/styles/Survey.css';
// import {
//   OpenQuestionComponent,
//   ClosedQuestionComponent,
//   RatingQuestionComponent
// } from './QuestionTypeModalTemplate';

// const CreateTemplateStep1 = ({ predefinedQuestions, diagnosticName, onEditingQuestion }) => {
//   const { setTemplateQuestions, updateDiagnosticName, updateDiagnosticImage, updateQuestions,updateTemplateQuestions} = useTemplate(); // Usa el contexto
//   const [isLaunched, setIsLaunched] = useState(false);
//   const [fileName, setFileName] = useState('');
//   const fileInputRef = useRef(null);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);

//   useEffect(() => {
//     updateTemplateQuestions(predefinedQuestions); // Establece las preguntas configuradas en el contexto
//   }, [predefinedQuestions, setTemplateQuestions]);

//   const handleQuestionSelect = (index) => {
//     const selectedQuestion = predefinedQuestions[index];
//     setCurrentQuestion(selectedQuestion); // Establece la pregunta actual basada en la selección.
//     setIsModalOpen(true); // Suponiendo que manejas una modal para la edición.
//   };
  

//   const handleAddQuestion = (newQuestionData) => {
//     // Actualiza las preguntas con la nueva información
//     // Esto es solo un ejemplo, necesitarás ajustar la lógica según tu aplicación específica
//     const updatedQuestions = predefinedQuestions.map((question, index) =>
//       index === currentQuestionIndex ? { ...question, ...newQuestionData } : question
//     );

//     setTemplateQuestions(updatedQuestions); // Actualiza el estado con las preguntas actualizadas
//     setCurrentQuestion(null); // Limpia la pregunta actual seleccionada
//     setIsModalOpen(false); // Cierra el modal o interfaz de edición
//     onEditingQuestion(false); // Indica que ya no estás editando una pregunta
//   };

//   const handleLaunch = () => {
//     updateDiagnosticName(diagnosticName);
//     setIsLaunched(true);
//     updateQuestions(predefinedQuestions);
//     console.log('Preguntas configuradas:', predefinedQuestions.filter(q => q.configured));
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       updateDiagnosticImage(URL.createObjectURL(file));
//       setFileName(file.name);
//     }
//   };

//   return (
//     <div className="container-launch-survey">
//       <div className="big-form-container">
//         <header className="diagnostic-header">
//           <h3>{diagnosticName}</h3>
//           <button className="launch-button" onClick={handleLaunch}>Lanzar</button>
//         </header>
//         <div className="questions-container">
//           {predefinedQuestions.map((question, index) => (
//             <button key={index} onClick={() => handleQuestionSelect(index)} className={`question-select-button ${question.configured ? 'configured-question' : ''}`}>
//               {`Pregunta ${index + 1} ${question.configured ? '(Configurada)' : ''}`}
//             </button>
//           ))}
//           <div className="upload-logo-container">
//             <button className="add-question-button" onClick={() => fileInputRef.current.click()}>Añade tu logo</button>
//             {fileName && <div className="file-name">{fileName}</div>}
//             <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
//           </div>
//         </div>
//       </div>
//       {isModalOpen && currentQuestion && (
//       currentQuestion.tipoPregunta === 'open' ? 
//         <OpenQuestionComponent
//           existingData={currentQuestion}
//           onAdd={handleAddQuestion} // Asegúrate de implementar esta función correctamente.
//           onBack={() => setIsModalOpen(false)}
//         /> :
//         currentQuestion.tipoPregunta === 'closed' ? 
//         <ClosedQuestionComponent
//         existingData={currentQuestion}
//         onAdd={handleAddQuestion} // Asegúrate de implementar esta función correctamente.
//         onBack={() => setIsModalOpen(false)}
//         />:
//         currentQuestion.tipoPregunta === 'rating' ? 
//         <RatingQuestionComponent
//         existingData={currentQuestion}
//         onAdd={handleAddQuestion} // Asegúrate de implementar esta función correctamente.
//         onBack={() => setIsModalOpen(false)}
//         />:
//         null
//       )}
//       {isLaunched && <LaunchSurvey />}
//     </div>
//   );
// };
// export default CreateTemplateStep1

// import React, { useState, useRef, useEffect } from 'react';
// import { useTemplate } from '../../../assets/js/TemplateContext';
// import LaunchSurvey from '../CreateSurvey/LaunchSurvey';
// import QuestionTypeModal from './QuestionTypeModalTemplate';
// import '../../../assets/styles/Survey.css';
// import {
//   OpenQuestionComponent,
//   ClosedQuestionComponent,
//   RatingQuestionComponent
// } from './QuestionTypeModalTemplate';

// const CreateTemplateStep1 = ({ predefinedQuestions }) => {
//   const {
//     predefinedQuestions: contextPredefinedQuestions,
//     addedQuestions,
//     updatePredefinedQuestions,
//     updateAddedQuestions,
//   } = useTemplate();
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLaunched, setIsLaunched] = useState(false);
//   const [fileName, setFileName] = useState('');
//   const fileInputRef = useRef(null);
//   const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
// // Si `onEditingQuestion` es un estado:
//   const [isEditingQuestion, setIsEditingQuestion] = useState(false);


//   useEffect(() => {
//     // Asumiendo que quieres inicializar tus preguntas predefinidas desde props
//     updatePredefinedQuestions(predefinedQuestions);
//   }, [predefinedQuestions, updatePredefinedQuestions]);

//   const handleQuestionSelect = (index) => {
//     const selectedQuestion = predefinedQuestions[index];
//     setCurrentQuestion(selectedQuestion);
//     setIsModalOpen(true);
//   };

//   const handleAddQuestion = (newQuestion) => {
//     // Suponiendo que newQuestion ya tenga todos los campos necesarios establecidos
//     updateAddedQuestions([...addedQuestions, newQuestion]);
//     setIsModalOpen(false);
//     onEditingQuestion(false); // Asegúrate de que esta función esté definida o quítala si no es necesaria
//   };
  
  
  
//   const handleEditQuestion = (questionData) => {
//     if (questionData.isPredefined) {
//       // Actualizar una pregunta predefinida
//       const updatedQuestions = templateQuestions.map(question =>
//         question.id === questionData.id ? { ...question, ...questionData } : question
//       );
//       updatePredefinedQuestions(updatedQuestions);
//     } else {
//       // Actualizar una pregunta añadida
//       const updatedAddedQuestions = addedQuestions.map(question =>
//         question.id === questionData.id ? { ...question, ...questionData } : question
//       );
//       setAddedQuestions(updatedAddedQuestions);
//     }
  
//     setIsModalOpen(false);
//     onEditingQuestion(false);
//   };
  
//   const handleDeleteQuestion = (id, isPredefined) => {
//     if (isPredefined) {
//       // Lógica para eliminar una pregunta predefinida
//       const updatedPredefinedQuestions = templateQuestions.filter(question => question.id !== id);
//       updatePredefinedQuestions(updatedPredefinedQuestions);
//     } else {
//       // Lógica para eliminar una pregunta añadida
//       const updatedAddedQuestions = addedQuestions.filter(question => question.id !== id);
//       setAddedQuestions(updatedAddedQuestions); // Asume que tienes acceso a setAddedQuestions desde tu contexto
//     }
//   };

//   const handleLaunch = () => {
//     updateDiagnosticName(diagnosticName);
//     setIsLaunched(true);
//     updateQuestions(predefinedQuestions);
//     console.log('Preguntas configuradas:', predefinedQuestions.filter(q => q.configured));
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       updateDiagnosticImage(URL.createObjectURL(file));
//       setFileName(file.name);
//     }
//   };

//   const handleOpenNewQuestionModal = () => {
//     setCurrentQuestion({ isPredefined: false }); // Establece valores predeterminados para una nueva pregunta
//     setShowAddQuestionModal(true);
//   };
  

//   const handleCloseAddQuestionModal = () => {
//     setShowAddQuestionModal(false);
//   };

//   return (
//     <div className="container-launch-survey">
//       <div className="big-form-container">
//         <header className="diagnostic-header">
//           <h3>{diagnosticName}</h3>
//           <button className="launch-button" onClick={handleLaunch}>Lanzar</button>
//         </header>
//         <div className="questions-container">
//             {/* Mapeo de preguntas predefinidas */}
//             {predefinedQuestions.map((question, index) => (
//               <div key={index} className="question-item">
//                 <button onClick={() => handleQuestionSelect(index)} className={`question-select-button ${question.configured ? 'configured-question' : ''}`}>
//                   {`Pregunta ${index + 1} ${question.configured ? '(Configurada)' : ''}`}
//                 </button>
//                 <button className="delete-question-button" onClick={() => handleDeleteQuestion(question.id)}>Eliminar</button>
//               </div>
//             ))}
//             {/* Mapeo de preguntas agregadas */}
//             {addedQuestions.map((question, index) => (
//               <div key={`added_${index}`} className="question-item">
//                 <button className={`question-select-button configured-question`}>
//                   {`Pregunta Agregada ${index + 1}`}
//                 </button>
//                 <button className="delete-question-button" onClick={() => handleDeleteQuestion(question.id)}>Eliminar</button>
//               </div>
//             ))}
//             <div className="upload-logo-container">
//               <button className="add-question-button" onClick={handleOpenNewQuestionModal}>Añadir Nueva Pregunta</button>
//               <button className="add-question-button" onClick={() => fileInputRef.current.click()}>Añade tu logo</button>
//               {fileName && <div className="file-name">{fileName}</div>}
//               <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
//             </div>
//           </div>
//       </div>
//       {showAddQuestionModal && (
//         <QuestionTypeModal
//           existingData={currentQuestion}
//           onAdd={handleAddQuestion} // Ajusta esta función para manejar ambas preguntas predefinidas y añadidas
//           onBack={() => setIsModalOpen(false)}
//           isPredefined={currentQuestion.isPredefined}
//         />
//       )}
//       {isModalOpen && currentQuestion && (
//         currentQuestion.tipoPregunta === 'open' ?
//           <OpenQuestionComponent
//             existingData={currentQuestion}
//             onAdd={handleAddQuestion}
//             onBack={() => setIsModalOpen(false)}
//             onEdit={handleEditQuestion}
//             isPredefined={currentQuestion?.isPredefined || false}
//           /> :
//           currentQuestion.tipoPregunta === 'closed' ?
//             <ClosedQuestionComponent
//               existingData={currentQuestion}
//               onAdd={handleAddQuestion}
//               onBack={() => setIsModalOpen(false)}
//               onEdit={handleEditQuestion}
//               isPredefined={currentQuestion?.isPredefined || false}
//             /> :
//             currentQuestion.tipoPregunta === 'rating' ?
//               <RatingQuestionComponent
//                 existingData={currentQuestion}
//                 onAdd={handleAddQuestion}
//                 onBack={() => setIsModalOpen(false)}
//                 onEdit={handleEditQuestion}
//                 isPredefined={currentQuestion?.isPredefined || false}
//               /> :
//               null
//       )}
//       {isLaunched && <LaunchSurvey />}
//     </div>
//   );
// };

// export default CreateTemplateStep1;


// import React from 'react';
// import { useTemplate } from '../../../assets/js/TemplateContext';

// const CreateTemplateStep1 = ({ diagnosticName, predefinedQuestions }) => {
//   // Puedes añadir lógica adicional si necesitas manejar el estado de las preguntas aquí.

//   return (
//     <div className="container-create-template">
//       <h2>{diagnosticName}</h2>
//       <ul>
//         {predefinedQuestions.map((question, index) => (
//           <li key={index}>
//             {question.configured ? `${question.pregunta} (Configurada)` : question.pregunta}
//           </li>
//         ))}
//       </ul>
//       <button>+ Añadir nueva pregunta</button>
//       {/* Añade más UI y lógica para manejar la adición de nuevas preguntas */}
//     </div>
//   );
// };

// export default CreateTemplateStep1;


// import React, { useState } from 'react';
// // Asegúrate de importar el modal y el contexto adecuadamente
// import Modal from './Modal'; // Suponiendo que tienes un componente Modal

// const CreateTemplateStep1 = ({ diagnosticName, predefinedQuestions }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [questions, setQuestions] = useState(predefinedQuestions);

//   // Función para abrir el modal con la pregunta seleccionada
//   const handleQuestionClick = (question) => {
//     setCurrentQuestion(question);
//     setShowModal(true);
//   };

//   // Función para agregar una nueva pregunta
//   const handleAddQuestion = () => {
//     const newQuestion = {
//       pregunta: `Pregunta ${questions.length + 1}`,
//       tipo: 'open', // o el tipo por defecto que desees
//       configurada: false, // asumiendo que las nuevas preguntas no están configuradas
//     };
//     setQuestions([...questions, newQuestion]);
//   };

//   return (
//     <div className="container-create-template">
//       <h2>{diagnosticName}</h2>
//       <div className="question-list">
//         {questions.map((question, index) => (
//           <button 
//             key={index} 
//             className="question-button" 
//             onClick={() => handleQuestionClick(question)}
//           >
//             {question.pregunta} {question.configurada ? '(Configurada)' : ''}
//           </button>
//         ))}
//       </div>
//       <button onClick={handleAddQuestion} className="add-question-button">
//         + Añadir nueva pregunta
//       </button>
//       {/* Renderiza el modal si showModal es true */}
//       {showModal && currentQuestion && (
//         <Modal 
//           question={currentQuestion}
//           onClose={() => setShowModal(false)}
//           // Aquí podrías incluir otras props necesarias para tu Modal
//         />
//       )}
//     </div>
//   );
// };

// export default CreateTemplateStep1;



// CreateTemplateStep1.js
// import React, { useState } from 'react';
// import Modal from './Modal'; // Asegúrate de que el componente Modal está correctamente importado

// const CreateTemplateStep1 = ({ diagnosticName, predefinedQuestions }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [questions, setQuestions] = useState(predefinedQuestions);

//   const handleQuestionClick = (question) => {
//     setCurrentQuestion(question);
//     setShowModal(true);
//   };

// // Al añadir una nueva pregunta...
// const handleAddQuestion = () => {
//   const newQuestionId = questions.length + 1; // Esto es solo un ejemplo simple para asignar un ID
//   const newQuestion = {
//     id: newQuestionId, // Asegúrate de que este ID sea único
//     pregunta: `Pregunta ${newQuestionId}`,
//     tipo: 'open', // Tipo por defecto
//     configurada: false, // Las nuevas preguntas por defecto no están configuradas
//     // Añade cualquier otro campo que necesites para una nueva pregunta
//   };
//   setQuestions([...questions, newQuestion]);
// };

// const handleSaveQuestion = (updatedQuestion) => {
//   const updatedQuestions = questions.map((q) =>
//     q.id === updatedQuestion.id ? updatedQuestion : q
//   );
//   setQuestions(updatedQuestions); // Actualiza el estado con las preguntas modificadas
// };

  
//   return (
//     <div className="container-create-template">
//       <h2>{diagnosticName}</h2>
//       <div className="question-list">
//         {questions.map((question, index) => (
//           <button
//             key={index}
//             className="question-button"
//             onClick={() => handleQuestionClick(question)}
//           >
//             {`Pregunta ${index + 1}`} {question.configurada ? '(Configurada)' : ''}
//           </button>
//         ))}
//         <button onClick={handleAddQuestion} className="add-question-button">
//           + Añadir nueva pregunta
//         </button>
//       </div>
//       {showModal && currentQuestion && (
//         <Modal
//           question={currentQuestion}
//           onClose={() => setShowModal(false)}
//           onSave={handleSaveQuestion}
//         />
//       )}
//     </div>
//   );
// };

// export default CreateTemplateStep1;


// Prubebueno

// import React, { useState } from 'react';
// import Modal from './Modal';
// import QuestionTypeSelectorModal from './QuestionTypeSelectorModal';
// import TemplatePreview from './TemplatePreview';
// import { useTemplate } from '../../../assets/js/TemplateContext';

// const CreateTemplateStep1 = ({ diagnosticName, predefinedQuestions,onPreviewChange }) => {
//   const {  updateQuestions } = useTemplate();
//   const [showModal, setShowModal] = useState(false);
//   const [showQuestionTypeModal, setShowQuestionTypeModal] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [questions, setQuestions] = useState(predefinedQuestions);
//   const [showPreview, setShowPreview] = useState(false);

//   const launchPreview = () => {
//     // Asegúrate de que cualquier pregunta no guardada se actualice en el contexto global
//     updateQuestions(questions);
//     setShowPreview(true);
//     onPreviewChange(true);  // Cambia a la vista de vista previa
//   };

//   if (showPreview) {
//     return <TemplatePreview questions={questions.filter(q => q.configurada)} onClose={() => { setShowPreview(false); onPreviewChange(false); }} />;
//   }

//   const handleQuestionClick = (question) => {
//     setCurrentQuestion(question);
//     setShowModal(true);
//   };

//   const handleAddQuestionClick = () => {
//     setShowQuestionTypeModal(true);
//   };
//   const handleSelectQuestionType = (type) => {
//     setShowQuestionTypeModal(false);
//     const newId = questions.length > 0 ? Math.max(...questions.map(q => Number(q.id))) + 1 : 1;
//     const newQuestion = {
//       id: newId.toString(),
//       pregunta: '',
//       tipo: type,
//       configurada: false,
//     };
  
//     // Aquí, asignamos valores por defecto a las preguntas de tipo rating
//     if (type === 'rating') {
//       newQuestion.minValue = 0;
//       newQuestion.maxValue = 10;
//     }
  
//     // Si la pregunta es de tipo closed, inicializamos las opciones
//     if (type === 'closed') {
//       newQuestion.opciones = ['', ''];
//     }
  
//     // Establecemos la nueva pregunta como la pregunta actual
//     setCurrentQuestion(newQuestion);
//     // Mostramos el modal con la nueva pregunta
//     setShowModal(true);
//   };
  
//   // const handleSaveQuestion = (updatedQuestion) => {
//   //   // Verifica si la pregunta ya existe en el array (es una edición)
//   //   const questionExists = questions.some(q => q.id === updatedQuestion.id);
  
//   //   if (questionExists) {
//   //     // Actualiza la pregunta existente
//   //     const updatedQuestions = questions.map(q =>
//   //       q.id === updatedQuestion.id ? updatedQuestion : q
//   //     );
//   //     setQuestions(updatedQuestions);
//   //   } else {
//   //     // Añade una nueva pregunta
//   //     setQuestions([...questions, { ...updatedQuestion, id: Date.now() }]); // Asegúrate de asignar un ID único a la nueva pregunta
//   //   }
  
//   //   setShowModal(false); // Cierra el modal después de guardar
//   // };

//   const handleSaveQuestion = (updatedQuestion) => {
//     let newQuestions;
//     const questionExists = questions.some(q => q.id === updatedQuestion.id);

//     if (questionExists) {
//       newQuestions = questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q);
//     } else {
//       newQuestions = [...questions, { ...updatedQuestion, id: Date.now() }];
//     }

//     setQuestions(newQuestions); // Actualiza el estado local
//     console.log('Guardando pregunta:', updatedQuestion); // Justo antes de actualizar
//     updateQuestions(newQuestions);
//     console.log('Preguntas después de guardar:', newQuestions); // Punto 2

//     setShowModal(false);
// };

  
//   return (
//     <div className="container-launch-survey">
//       <h2>{diagnosticName}</h2>
//       {/* Botones de preguntas existentes */}
//       <div className="question-list">
//         {questions.map((question, index) => (
//           <button key={index} className="question-button" onClick={() => handleQuestionClick(question)}>
//             {`Pregunta ${index + 1}`} {question.configurada ? '(Configurada)' : ''}
//           </button>
//         ))}
//         <button onClick={handleAddQuestionClick} className="add-question-button">
//           + Añadir nueva pregunta
//         </button>
//       </div>
//       {/* Modales */}
//       {showModal && (
//         <Modal
//           question={currentQuestion}
//           onClose={() => setShowModal(false)}
//           onSave={handleSaveQuestion}
//         />
//       )}
//       {showQuestionTypeModal && (
//         <QuestionTypeSelectorModal
//           onSelect={handleSelectQuestionType}
//           onClose={() => setShowQuestionTypeModal(false)}
//         />
//       )}
//       <button onClick={launchPreview} className="launch-preview-button">
//         Lanzar
//       </button>
//     </div>
//   );
// };

// export default CreateTemplateStep1;


import React, { useState } from 'react';
 import Modal from './Modal';
 import QuestionTypeSelectorModal from './QuestionTypeSelectorModal';
 import TemplatePreview from './TemplatePreview';
 import { useTemplate } from '../../../assets/js/TemplateContext';

 const CreateTemplateStep1 = ({ diagnosticName, predefinedQuestions,onPreviewChange, onEditingQuestion  }) => {
   const {  updateQuestions } = useTemplate();
   const [showModal, setShowModal] = useState(false);
   const [showQuestionTypeModal, setShowQuestionTypeModal] = useState(false);
   const [currentQuestion, setCurrentQuestion] = useState(null);
   const [questions, setQuestions] = useState(predefinedQuestions);
   const [showPreview, setShowPreview] = useState(false);
   const [contentVisible, setContentVisible] = useState(true);

   const launchPreview = () => {
     // Asegúrate de que cualquier pregunta no guardada se actualice en el contexto global
     updateQuestions(questions);
     setShowPreview(true);
     onPreviewChange(true);  // Cambia a la vista de vista previa
   };

   if (showPreview) {
     return <TemplatePreview questions={questions.filter(q => q.configurada)} onClose={() => { setShowPreview(false); onPreviewChange(false); }} />;
   }
   const handleBackToQuestionTypeSelector = () => {
     setShowModal(false); // Cierra el modal actual
     setShowQuestionTypeModal(true); // Muestra el selector de tipo de pregunta
     setContentVisible(false); // Opcionalmente, oculta el contenido principal si es necesario
   };
  
   const handleQuestionClick = (question) => {
     setCurrentQuestion(question);
     setShowModal(true);
     onEditingQuestion(true);
   };

 const handleAddQuestionClick = () => {
     // Aquí, reseteas 'currentQuestion' para asegurarte de que no mantenga estado de preguntas anteriores
     setCurrentQuestion(null);
     setShowQuestionTypeModal(true);
     setContentVisible(false); // Ocultas el contenido principal mientras el modal está abierto
     onEditingQuestion(true);
 };



  

   const handleSelectQuestionType = (type) => {
     setShowQuestionTypeModal(false);
     onEditingQuestion(true);
     let newQuestion;

     // Si estamos editando una pregunta existente (cambiando su tipo)
     if (currentQuestion && currentQuestion.id) {
         newQuestion = { ...currentQuestion, tipo: type, configurada: true };

         // Asigna valores predeterminados según el tipo de pregunta, si es necesario
         if (type === 'rating') {
             newQuestion.minValue = 0;
             newQuestion.maxValue = 10;
         } else if (type === 'closed') {
             newQuestion.opciones = ['', ''];
         } // Añade más condiciones si hay más tipos
     } else {
         // Si es una nueva pregunta
         const newId = questions.length > 0 ? Math.max(...questions.map(q => Number(q.id))) + 1 : 1;
         newQuestion = {
             id: newId.toString(),
             pregunta: '',
             tipo: type,
             configurada: false,
         };

         // Asigna valores predeterminados según el tipo
         if (type === 'rating') {
             newQuestion.minValue = 0;
             newQuestion.maxValue = 10;
         } else if (type === 'closed') {
             newQuestion.opciones = ['', ''];
         } // Añade más condiciones si hay más tipos
     }

     setCurrentQuestion(newQuestion); // Establece la nueva pregunta como la pregunta actual
     setShowModal(true); // Muestra el modal con la nueva pregunta
     setContentVisible(true); // Asegúrate de mostrar el contenido principal
     onEditingQuestion(true);
 };

   const closeModalAndShowContent = () => {
     setShowQuestionTypeModal(false);
     setContentVisible(true); // Volvemos a mostrar el contenido al cerrar el modal
     onEditingQuestion(false);
   };

   const handleDeleteQuestion = (questionId) => {
    const updatedQuestions = questions.filter(question => question.id !== questionId);
    setQuestions(updatedQuestions); // Actualiza el estado local con las preguntas restantes
    updateQuestions(updatedQuestions); // Actualiza el contexto global o el almacenamiento externo si es necesario
  };
  

 const handleSaveQuestion = (updatedQuestion) => {
   updatedQuestion.configurada = true; // Marca la pregunta como configurada

   const questionIndex = questions.findIndex(q => q.id === updatedQuestion.id);
   let newQuestions = [...questions];

   if (questionIndex !== -1) {
       // Si la pregunta existe, actualiza la pregunta existente
       newQuestions[questionIndex] = updatedQuestion;
   } else {
       // Si es una nueva pregunta, añádela al array de preguntas
       newQuestions = [...questions, updatedQuestion];
   }

   setQuestions(newQuestions); // Actualiza el estado local
   updateQuestions(newQuestions); // Actualiza el contexto global o donde sea necesario

   setShowModal(false); // Cierra el modal
   setContentVisible(true); // Asegúrate de que el contenido principal se muestre
   onEditingQuestion(false);
 };

 return (
   <div className="container-launch-survey">
     {showModal && currentQuestion !== null ? (
       <Modal // Asegúrate de que este Modal pueda aceptar las mismas props que QuestionTypeModal
         onClose={() => {
           setShowModal(false);
           setContentVisible(true); // Aseguramos que el contenido se muestre al cerrar el modal
         }}
         onBackToQuestionTypeSelector={handleBackToQuestionTypeSelector}
         question={currentQuestion}
         onSave={handleSaveQuestion}
         onEditingQuestion={onEditingQuestion}
       />
     ) : contentVisible ? ( // Usamos el estado contentVisible para controlar la renderización del contenido principal
       <>
         <div className="big-form-container">
           <header className="diagnostic-header">
             <h3>{diagnosticName}</h3>
             <button className="launch-button" onClick={launchPreview}>Lanzar</button>
           </header>
           <div className="questions-container">
              {questions.map((question, index) => (
                <div key={question.id} className="question-item">
                  <button
                    onClick={() => handleQuestionClick(question)}
                    className={`question-select-button ${question.configurada ? 'configured-question' : ''}`}
                  >
                    {`Pregunta ${index + 1}`} {question.configurada ? '(Configurada)' : ''}
                  </button>
                  <button 
                    className="delete-question-button" 
                    onClick={(e) => {
                      e.stopPropagation(); // Previene que el evento clic se propague al botón de la pregunta
                      handleDeleteQuestion(question.id);
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
              <button className="add-question-button" onClick={handleAddQuestionClick}>
                + Añadir nueva pregunta
              </button>
</div>

         </div>
       </>
     ) : null}
     {showQuestionTypeModal && (
       <QuestionTypeSelectorModal
         onSelect={handleSelectQuestionType}
         onClose={closeModalAndShowContent} // Utilizamos la función para cerrar el modal y mostrar el contenido
       />
     )}
   </div>
 );
 };

 export default CreateTemplateStep1;
