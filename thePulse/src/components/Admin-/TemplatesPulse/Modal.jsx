import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ question, onClose, onSave,onBackToQuestionTypeSelector }) => {
    const [editedQuestion, setEditedQuestion] = useState(question || {});
  const [minValue, setMinValue] = useState(question.minValue || 0);
  const [maxValue, setMaxValue] = useState(question.maxValue || 10);

  useEffect(() => {
    setEditedQuestion({ ...question });
  }, [question]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedQuestion({ ...editedQuestion, [name]: value });
  };


  
  const handleMinValueChange = (e) => {
    setMinValue(e.target.value);  // Guarda el valor mínimo del slider.
  };
  
  const handleMaxValueChange = (e) => {
    setMaxValue(e.target.value);  // Guarda el valor máximo del slider.
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...editedQuestion.opciones];
    updatedOptions[index] = value;
    setEditedQuestion({ ...editedQuestion, opciones: updatedOptions });
  };

  const handleAddOption = () => {
    const newOptions = editedQuestion.opciones ? [...editedQuestion.opciones, ''] : [''];
    setEditedQuestion({ ...editedQuestion, opciones: newOptions });
  };

  const marks = Array.from({ length: 11 }, (_, i) => ({
    value: i,
    label: `${i}`,
  }));
  const handleSave = () => {
    // Construye el objeto de pregunta actualizado
    const updatedQuestion = {
      ...editedQuestion,
      minValue: editedQuestion.tipo === 'rating' ? parseInt(minValue, 10) : undefined,
      maxValue: editedQuestion.tipo === 'rating' ? parseInt(maxValue, 10) : undefined,
    };
  
    // Actualiza el estado local si estás usando uno
    // setLocalQuestions((prevQuestions) => {
    //   return prevQuestions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q));
    // });
  
    // Llama a onSave, que debería estar configurado para actualizar el contexto global
    onSave(updatedQuestion);
    onClose(); // Cierra el modal
  };

  return (
          <div className="modal-background">
            <div className="modal-container">

                <div className="questions-type-container-template">
                    <h3>Editar Pregunta</h3>
                    <input
                        type="text"
                        className='question-type-input'
                        value={editedQuestion.pregunta}
                        onChange={handleInputChange}
                        name="pregunta"
                    />
                    {editedQuestion.tipo === 'closed' && editedQuestion.opciones && (
                        <>
                            {editedQuestion.opciones.map((opcion, index) => (
                                <input
                                    key={index}
                                    className='add-options'
                                    type="text"
                                    value={opcion}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                />
                            ))}
                            <button onClick={handleAddOption} className='add-question-button'>Añadir Opción</button>
                        </>
                    )}
                     {editedQuestion.tipo === 'rating' && (
                        <>
                            <label>Rango mínimo:</label>
                            <input type="number" value={minValue} onChange={handleMinValueChange} />
                            <label>Rango máximo:</label>
                            <input type="number" value={maxValue} onChange={handleMaxValueChange} />
                            <Slider
                                aria-label="Rating"
                                step={1}
                                marks={marks}
                                min={Number(minValue)}
                                max={Number(maxValue)}

                                defaultValue={minValue} // Solo para evitar un valor predeterminado en el Slider.
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
                </>
                )}
                  <div className="question-button-container">
                  <button onClick={onBackToQuestionTypeSelector} className='icon-button'>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  <button onClick={handleSave} className='icon-button'>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;