// QuestionTypeSelectorModal.js
import React from 'react';
import '../../../assets/styles/Survey.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const QuestionTypeSelectorModal = ({ onSelect, onClose }) => {
  return (
    <div className="question-type-options-container">
      <h3>Elige tipo de pregunta</h3>
      <button onClick={() => onSelect('open')} className="question-type-button">Abierta</button>
      <button onClick={() => onSelect('closed')} className="question-type-button">Cerrada</button>
      <button onClick={() => onSelect('rating')} className="question-type-button">Rating</button>
      <button className="icon-button" onClick={onClose}>
          <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  );
};

export default QuestionTypeSelectorModal;
