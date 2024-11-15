import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const ClosedQuestion = ({ questionData, onNext, initialAnswer = '',isReviewing = false }) => {
  const [selectedOption, setSelectedOption] = useState(initialAnswer);
  const [saved, setSaved] = useState(false);
  const [showModify, setShowModify] = useState(true); // Estado para controlar la visibilidad del botón Modificar
  const [showIcon, setShowIcon] = useState(false); // Estado para controlar la visibilidad del icono

  useEffect(() => {
    // Esto garantiza que si el componente es reutilizado, el estado se resetea adecuadamente con una nueva respuesta inicial
    setSelectedOption(initialAnswer);
    setSaved(false);
  }, [initialAnswer]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setSaved(false);
  };

  const handleNextClick = () => {
    // Asumimos que onNext es una función prop que maneja la lógica del clic.
    onNext({ idPregunta: questionData.id, tipo: questionData.type, respuesta: selectedOption });
  
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
  

  if (!questionData || typeof questionData.question !== 'string' || !Array.isArray(questionData.options)) {
    console.error('Invalid questionData', questionData);
    return <div>Invalid question data.</div>;
  }

  return (
    <div className="single-choice-question">
      <label className="question-label">{`${questionData.number}. ${questionData.question}`}</label>
      {questionData.options.map((option, index) => (
        <div key={`${questionData.number}-${index}`} className="option-container">
          <input 
            type="radio" 
            id={`${questionData.id}-${option}`} 
            name={`question-${questionData.number}`}
            value={option}
            checked={selectedOption === option} // Asegura que el input está seleccionado si coincide con la respuesta
            onChange={handleOptionChange}
            className="radio-input" 
          />
          <label htmlFor={`${questionData.id}-${option}`} className="radio-label">{option}</label>
        </div>
      ))}
      
      <div className='answer-buttns'>
        <div></div>
        {showModify && (
          <button type="button" onClick={handleNextClick} disabled={!selectedOption}>
            {isReviewing ? 'Modificar' : 'Siguiente'}
          </button>
        )}
        {showIcon && <FontAwesomeIcon icon={faPencil} style={{ fontSize: '36px', color:'blue'}} />}


      </div>
    </div>
  );
};

export default ClosedQuestion;
