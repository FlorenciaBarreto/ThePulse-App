import React, { useState } from 'react';
import '../../../assets/styles/Survey.css';
import '../../../assets/styles/Home.css';
import { SurveyProvider } from '../../../assets/js/SurveyContext';

import CreateSurveyStep0 from './CreateSurvey_0'; // Renombrado para evitar conflictos
import CreateSurveyStep1 from './CreateSurvey_1'; // Renombrado para evitar conflictos

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CreateStart = ({ onBack,isModalOpen }) => { // Asegúrate de que onBack se pasa correctamente a este componente
  const [isSurveyCreated, setIsSurveyCreated] = useState(false);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false); // Nuevo estado

  const handleSurveyCreate = () => {
    setIsSurveyCreated(true);
  };

  return (
    <div className="home-container">
      <SurveyProvider>
        {!isSurveyCreated && (
          <CreateSurveyStep0 onSurveyCreate={() => setIsSurveyCreated(true)} />
        )}
        {isSurveyCreated && (
          <CreateSurveyStep1 onEditingQuestion={setIsEditingQuestion} />
        )}
      </SurveyProvider>
      {!isEditingQuestion && !isModalOpen && (
        <button onClick={onBack} className="back-button-personal">
          <FontAwesomeIcon icon={faArrowLeft} />Volver al inicio
        </button>
)}
    </div>
  );
};

export default CreateStart;