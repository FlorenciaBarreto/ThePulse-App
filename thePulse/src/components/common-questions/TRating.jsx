
import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import '../../assets/styles/Survey.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const RatingQuestion = ({ questionData, onNext, initialAnswer,isReviewing = false}) => {
  const { number, question, id } = questionData;
  const minValue = Number(questionData.minValue) || 0;
  const maxValue = Number(questionData.maxValue) || 10;
  // Utiliza initialAnswer para inicializar el estado, si está presente; de lo contrario, usa el valor medio
  const [value, setValue] = useState(initialAnswer ? Number(initialAnswer) : (minValue + maxValue) / 2);
  const [saved, setSaved] = useState(false);
  const [showModify, setShowModify] = useState(true); // Estado para controlar la visibilidad del botón Modificar
  const [showIcon, setShowIcon] = useState(false); // Estado para controlar la visibilidad del icono


  useEffect(() => {
    // Esto garantiza que si el componente es reutilizado, el estado se resetea adecuadamente con una nueva respuesta inicial
    setValue(initialAnswer ? Number(initialAnswer) : (minValue + maxValue) / 2);
  }, [initialAnswer, minValue, maxValue]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSaved(false);
  };

  const handleNextClick = () => {
    onNext({
      idPregunta: id,
      tipo: questionData.type, // Añadir el tipo de pregunta aquí
      respuesta: value.toString() // Asegúrate de que el valor se convierte a string si es necesario
    });
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
  
  if (!questionData || typeof question !== 'string') {
    console.error('Invalid questionData', questionData);
    return <div>Invalid question data.</div>;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(value); // Pasar el valor seleccionado si es necesario
  };
  // Generar las marcas con los números del rango de min a max
  const marks = Array.from({ length: maxValue - minValue + 1 }, (_, i) => i + minValue).map(num => ({
      value: num,
      label: num.toString(),
  }));

  return (
    <div onScroll={handleSubmit} className="range-question">
      <label className="open-question-label">{`${questionData.number}. ${questionData.question}`}</label>
      <div className="range-slider-container">
        <Slider
          step={1}
          marks={marks}
          min={minValue}
          max={maxValue}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="off"
                    sx={{
                        width: 450,
                        color: '#7160D2',
                        '& .MuiSlider-thumb': {
                            height: 20,
                            width: 20,
                            backgroundColor: '#7160D2',
                            border: '2px solid currentColor',
                            '&:focus, &:hover, &.Mui-active': {
                                boxShadow: 'inherit',
                            },
                        },
                        '& .MuiSlider-track': {
                            height: 4,
                            borderRadius: 4,
                        },
                        '& .MuiSlider-rail': {
                            height: 4,
                            borderRadius: 4,
                        },
                        '& .MuiSlider-mark': {
                            backgroundColor: '#bfbfbf',
                            height: 0,
                            '&.MuiSlider-markActive': {
                                backgroundColor: 'currentColor',
                            },
                        },
                        '& .MuiSlider-markLabel': {
                            fontFamily: '"Poppins", sans-serif',
                            fontSize: '1.25rem',
                            color: 'black',
                            fontWeight: '600',
                        },
                    }}
                />
            </div>
            <div className='answer-buttns'>
              <div></div>
              {showModify && (
                <button type="button" onClick={handleNextClick}>
                  {isReviewing ? 'Modificar' : 'Siguiente'}
                </button>
              )}
              {showIcon && <FontAwesomeIcon icon={faPencil} style={{ fontSize: '36px', color:'blue'}} />}
            </div>
            
    </div>
    );
};

export default RatingQuestion;
