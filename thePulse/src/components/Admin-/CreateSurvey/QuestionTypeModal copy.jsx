
import React, { useState, useRef, useEffect } from 'react';
import '../../../assets/styles/Survey.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Slider from '@mui/material/Slider';

const OpenQuestionComponent = ({ onAdd, onBack, existingData }) => {
  const [question, setQuestion] = useState(existingData?.question || '¿?');
  const inputRef = useRef(null); // Referencia para el input

  const handleFocus = () => {
      // Verificar si el input ya contiene texto más allá de los signos de interrogación
      if (question === '¿?') {
          // Retraso mínimo para asegurar que el navegador ha procesado el evento de enfoque
          setTimeout(() => {
              if (inputRef.current) {
                  const position = 1; // Colocar el cursor después del signo de interrogación inicial "¿"
                  inputRef.current.setSelectionRange(position, position);
              }
          }, 0);
      }
  };

  const handleChange = (e) => {
      setQuestion(e.target.value);
  };

  const saveQuestion = () => {
    // Verifica que la pregunta no esté vacía o solo contenga signos de interrogación
    if (question.trim() && question !== '¿?') {
      // Aquí llamas a la función onAdd, que debería ser proporcionada por el componente padre
      // Esta función es responsable de actualizar el estado de las preguntas con la nueva pregunta
      onAdd({
        ...existingData,
        question: question.trim(), // Asegúrate de enviar la pregunta sin espacios extra
      });
    } else {
      // Aquí puedes manejar el error, como mostrar un mensaje al usuario
      alert('Por favor, escribe una pregunta válida.');
    }
  };
  return (
      <div className="questions-type-container">
          <h3>Añadir la pregunta</h3>
          <input
              ref={inputRef}
              className='question-type-input'
              type="text"
              value={question}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Escribe tu pregunta aquí"
          />
          <div className="question-button-container">
              <button className='icon-button' onClick={onBack}>
                  <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button className='icon-button' onClick={saveQuestion}>
                  <FontAwesomeIcon icon={faPaperPlane} />
              </button>
          </div>
      </div>
  );
};


  


const ClosedQuestionComponent = ({ onAdd, onBack, existingData }) => {
  const [question, setQuestion] = useState(existingData?.question || '¿?');
  const [options, setOptions] = useState(existingData?.options || ['', '']);
  const questionInputRef = useRef(null);

  const handleOptionChange = (value, index) => {
      const newOptions = [...options];
      newOptions[index] = value;
      setOptions(newOptions);
  };

  const addOption = () => {
      setOptions([...options, '']);
  };

  const handleFocus = () => {
      setTimeout(() => {
          questionInputRef.current.setSelectionRange(1, 1);
      }, 0);
  };

  useEffect(() => {
      if (question === '¿?') {
          handleFocus();
      }
  }, [question]);

  return (
      <div className="questions-type-container-closed">
          <h3>Añadir la pregunta</h3>
          <input
              ref={questionInputRef}
              className='question-type-input'
              type="text"
              placeholder="Pregunta"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onFocus={handleFocus}
          />
        <h3>Añadir respuestas</h3>
        {options.map((option, index) => (
          <input className='add-options'
            key={index}
            type="text"
            placeholder={`Opción ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(e.target.value, index)}
          />
        ))}
        <button className='add-question-button' onClick={addOption}>Añadir Opción</button>
        <div className="question-button-container">
          <button className='icon-button' onClick={onBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button className='icon-button' onClick={() => onAdd({ type: 'closed', question, options })}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    );
  };

  
  const RatingQuestionComponent = ({ onAdd, onBack, existingData }) => {
    const [question, setQuestion] = useState(existingData?.question || '¿?');
    const [rating, setRating] = useState(5);
    const questionInputRef = useRef(null);
  
    // Este efecto solo se activará una vez, cuando el componente se monte,
    // colocando el cursor en medio de "¿?"
    useEffect(() => {
      if (questionInputRef.current) {
        questionInputRef.current.focus();
        questionInputRef.current.setSelectionRange(1, 1);
      }
    }, []);
  
    const handleQuestionChange = (e) => {
      setQuestion(e.target.value);
    };
  
    const handleQuestionFocus = () => {
      // Si el usuario enfoca el input y este tiene solo "¿?", coloca el cursor en medio.
      // Esto también se activará si el usuario enfoca manualmente el input.
      if (question === '¿?') {
        questionInputRef.current.setSelectionRange(1, 1);
      }
    };
  
    // Genera marcas para cada número del 0 al 10
    const marks = Array.from({ length: 11 }, (_, i) => ({
      value: i,
      label: `${i}`,
    }));
    const saveQuestion = () => {
      // Verifica que la pregunta no esté vacía o solo contenga signos de interrogación
      if (question.trim() && question !== '¿?') {
        // Aquí llamas a la función onAdd, que debería ser proporcionada por el componente padre
        // Esta función es responsable de actualizar el estado de las preguntas con la nueva pregunta
        onAdd({
          ...existingData,
          question: question.trim(), // Asegúrate de enviar la pregunta sin espacios extra
        });
      } else {
        // Aquí puedes manejar el error, como mostrar un mensaje al usuario
        alert('Por favor, escribe una pregunta válida.');
      }
    };
    return (
      <div className="questions-type-container-rating">
        <h3>Añadir la pregunta</h3>
        <input
          ref={questionInputRef}
          type="text"
          className='question-type-input-rating'
          placeholder="Pregunta"
          value={question}
          onChange={handleQuestionChange}
          onFocus={handleQuestionFocus}
        />
        <div className="range-slider-container">
          <Slider
            aria-label="Rating"
            step={1}
            marks={marks}
            min={0}
            max={10}
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            valueLabelDisplay="auto"
            sx={{
                width: 600, // Ancho del Slider
                color: '#7160D2', // Color del Slider
                '& .MuiSlider-thumb': {
                  height: 20,
                  width: 20,
                  backgroundColor: '#7160D2', // Color de fondo del thumb (el control deslizable)
                  border: '2px solid currentColor', // Borde del thumb
                  '&:focus, &:hover, &.Mui-active': {
                    boxShadow: 'inherit',
                  },
                },
                '& .MuiSlider-track': {
                  height: 4,
                  borderRadius: 4, // Radio de borde de la pista
                },
                '& .MuiSlider-rail': {
                  height: 4,
                  borderRadius: 4, // Radio de borde de la barra de fondo
                },
                '& .MuiSlider-mark': {
                  backgroundColor: '#bfbfbf', // Color de las marcas
                  height: 0,
                  '&.MuiSlider-markActive': {
                    backgroundColor: 'currentColor', // Color de las marcas activas
                  },
                },
                '& .MuiSlider-markLabel': {
                  fontFamily: '"Poppins", sans-serif', // Tipo de letra para las etiquetas de las marcas
                  fontSize: '1.5rem', // Tamaño de la fuente para las etiquetas de las marcas
                  color: 'black', // Color de texto para las etiquetas de las marcas
                  fontWeight: '600',              },
              }}
          />
        </div>
        <div className="question-button-container">
          <button className='icon-button' onClick={onBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button className='icon-button' onClick={saveQuestion}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    );
  };
  


  const QuestionTypeModal = ({ onClose, existingData, onEditingQuestion }) => {
    const [questionType, setQuestionType] = useState(existingData?.type || null);
    
    const handleBack = () => {
      if (onEditingQuestion) { // Asegúrate de que onEditingQuestion esté definido
        onEditingQuestion(false);
      }
      onClose();
    };

    const handleQuestionTypeSelection = (type) => {
      switch (type) {
        case 'open':
          return <OpenQuestionComponent onAdd={(data) => onClose(data)} onBack={() => setQuestionType(null)} existingData={existingData} />;
        case 'closed':
          return <ClosedQuestionComponent onAdd={(data) => onClose(data)} onBack={() => setQuestionType(null)} existingData={existingData} />;
        case 'rating':
          return <RatingQuestionComponent onAdd={(data) => onClose(data)} onBack={() => setQuestionType(null)} existingData={existingData} />;
        default:
          return (
            <div className="question-type-options-container">
              <h3>Elige tipo de pregunta</h3>
              <button onClick={() => setQuestionType('open')} className="question-type-button">Abierta</button>
              <button onClick={() => setQuestionType('closed')} className="question-type-button">Cerrada</button>
              <button onClick={() => setQuestionType('rating')} className="question-type-button">Rating</button>
              <button className='icon-button' onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            </div>
          );
      } 
    };
  

    return (
      <div className="modal-background">
        <div className="modal-container">
          {handleQuestionTypeSelection(questionType)}
        </div>
        
      </div>
    );
  };
  
  export default QuestionTypeModal;
  