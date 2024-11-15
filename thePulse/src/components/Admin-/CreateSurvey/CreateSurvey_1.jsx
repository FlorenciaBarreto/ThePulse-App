import React, { useRef, useState } from 'react';
import { useSurvey } from '../../../assets/js/SurveyContext';
import '../../../assets/styles/Survey.css';
// import Logo from '../../assets/images/logo_w.png';
import QuestionTypeModal from './QuestionTypeModal';
import LaunchSurvey from './LaunchSurvey';

const DiagnosticQuestions = ({ onEditingQuestion }) => {
  const { diagnosticName, questions, setQuestions, updateDiagnosticImage } = useSurvey();
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [isLaunched, setIsLaunched] = useState(false);
  // const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuestionSelect = (index) => {
    setSelectedQuestionIndex(index);
    setShowModal(true);
    onEditingQuestion(true);
    setIsModalOpen(true); // Abre el modal // Establecer que estamos editando una pregunta
  };

  const addNewQuestion = () => {
    const newQuestion = {
      id: new Date().getTime(), // Utilizar una librería como UUID para un ID único es una mejor práctica
      data: null,
      configured: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const closeModal = (questionData) => {
    if (questionData) {
      const updatedQuestions = questions.map((q, idx) =>
        idx === selectedQuestionIndex ? { ...q, data: questionData, configured: true } : q
      );
      setQuestions(updatedQuestions);
    }
    setShowModal(false);
    onEditingQuestion(false);
    setIsModalOpen(false);
  };

  const handleLaunch = () => {
    // Verifica si al menos una pregunta ha sido configurada
    const hasConfiguredQuestions = questions.some(question => question.configured);
  
    if (hasConfiguredQuestions) {
      setIsLaunched(true);
      onEditingQuestion(true);
      console.log('Preguntas configuradas:', questions.filter(q => q.configured));
    } else {
      // Si no hay preguntas configuradas, muestra un mensaje de alerta
      alert('Por favor, configura al menos una pregunta antes de lanzar la encuesta.');
    }
  };
  

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     updateDiagnosticImage(URL.createObjectURL(file));
  //     setFileName(file.name);
  //   }
  // };

  // const triggerFileInputClick = () => {
  //   fileInputRef.current.click();
  // };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    // No olvides actualizar el contexto o cualquier otro estado global si es necesario
  };
  

  const handleBackFromLaunch = () => {
    setIsLaunched(false); // Ya estás haciendo esto
    onEditingQuestion(false); // Asegura que la edición se marque como false al volver
  };

  if (isLaunched) {
    return <LaunchSurvey onBack={handleBackFromLaunch} />;
}


  return (
    <div className="container-launch-survey">
      {/* Mostrar el modal de tipo de pregunta si showModal es true y hay una pregunta seleccionada */}
      {showModal && selectedQuestionIndex !== null && (
        <QuestionTypeModal
          onClose={closeModal}
          existingData={questions[selectedQuestionIndex]?.data}
          onEditingQuestion={onEditingQuestion}
        />
      )}
      
      {/* Mostrar el contenido principal (CreateSurvey_1) solo si showModal es false */}
      {!showModal && (
        <>
          <div className="big-form-container">
            <header className="diagnostic-header">
              <h3>{diagnosticName}</h3>
              <button className="launch-button" onClick={handleLaunch}>Lanzar</button>
            </header>
            <div className="questions-container">
              {questions.map((question, index) => (
                <div key={question.id} className="question-item">
                  <button
                    onClick={() => handleQuestionSelect(index)}
                    className={`question-select-button ${question.configured ? 'configured-question' : ''}`}
                  >
                    {`Pregunta ${index + 1} ${question.configured ? '(Configurada)' : ''}`}
                  </button>
                  {question.configured && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Previene que el evento se propague al botón de selección
                        deleteQuestion(index);
                      }}
                      className="delete-question-button"
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
              <button className="add-question-button" onClick={addNewQuestion}>
                + Añadir nueva pregunta
              </button>
              {/* <div className="upload-logo-container">
                <button className="add-question-button" onClick={triggerFileInputClick}>Añade tu logo</button>
                {fileName && <div className="file-name">{fileName}</div>}
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
              </div> */}
            </div>
          </div>
          {/* Solo muestra LaunchSurvey si isLaunched es true */}
          {isLaunched && <LaunchSurvey />}
        </>
      )}
  
      {/* Condición agregada: Si isLaunched es true, no mostrar nada más (pues LaunchSurvey ya se muestra arriba si es necesario) */}
      {isLaunched && null}
    </div>
  );
};

export default DiagnosticQuestions;
