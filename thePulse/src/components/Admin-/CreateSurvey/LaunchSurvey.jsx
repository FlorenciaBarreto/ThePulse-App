import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useSurvey } from '../../../assets/js/SurveyContext';
import ClosedQuestion from '../Questions/ClosedQuestion';
import OpenQuestion from '../Questions/OpenQuestion';
import RatingQuestion from '../Questions/RatingQuestion';
import '../../../assets/styles/Survey.css';
import { useNavigate } from 'react-router-dom';


const LaunchSurvey = ({ onBack }) => {

    const surveyContext = useSurvey(); // Call useSurvey only once at the top level
    const {
        questions,
        diagnosticName,
        diagnosticImage,
        participantes,
        fechaInicio, 
        fechaFin 
    } = surveyContext;
    console.log(surveyContext,"Hey there surveyContext")

    const navigate = useNavigate();
    
    const handleSaveAndGeneratePin = async (e) => {
        e.preventDefault();
    
        // Suponemos que 'questions' ya contiene toda la información necesaria
        const { diagnosticName, questions, diagnosticImage,participantes, fechaInicio,fechaFin} = surveyContext;
    
        const surveyData = {
            nombreEncuesta: diagnosticName,
            imagenEncuesta: diagnosticImage,
            preguntas: questions.filter(question => question.configured).map(question => {
                // Aquí estructuras la data de la pregunta dependiendo de su tipo
                const baseData = {
                    textoPregunta: question.data.question,
                    tipoPregunta: question.data.type,
                };
    
                if (question.data.type === 'closed') {
                    return {
                        ...baseData,
                        opciones: question.data.options || [],
                    };
                } else if (question.data.type === 'rating') {
                    return {
                        ...baseData,
                        minValue: question.data.minValue, // Asegúrate de que estas propiedades existan
                        maxValue: question.data.maxValue,
                    };
                } else {
                    return baseData; // Otros tipos de preguntas podrían ser manejados aquí
                }
            }),
            participantes: participantes,
            fechaInicio,
            fechaFin,
        };
    
        console.log("Datos que envio personalizados",surveyData);
    
        // Obtén el token del almacenamiento local
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No se encontró el token de autenticación.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3001/encuestas', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  // Incluye el token en la cabecera Authorization con el prefijo 'Bearer '
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(surveyData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al enviar la encuesta');
            }
    
            // Suponiendo que la respuesta del servidor incluye el PIN
            const result = await response.json();
            console.log('Encuesta creada con éxito, PIN:', result.pin);
    
            // Redirige al usuario al dashboard con el PIN como parámetro
            navigate(`/dashboard`);
        } catch (error) {
            console.error('Error al guardar la encuesta:', error);
        }
    };
    

  

  // Función de renderizado de preguntas (no modificada)
  const renderQuestion = (questionData, index) => {
    if (!questionData.configured) return null;

    const { data } = questionData;
    const questionProps = {
        ...data,
        number: index + 1,
    };

    switch (data.type) {
        case 'open':
            return <OpenQuestion key={data.id} questionData={questionProps} />;
        case 'closed':
            return <ClosedQuestion key={data.id} questionData={questionProps} />;
        case 'rating':
            return <RatingQuestion key={data.id} questionData={questionProps} />;
        default:
            return <div key={data.id}>Question type not supported</div>;
    }
};

    return (
        <div className='dynamic-survey-launch'>
            <span>Vista previa</span>
            <div className='big-form-container-launch'>

                <div className='diagnostic-name-survey'>
                        {diagnosticName && <h2>{diagnosticName}</h2>}
                        {diagnosticImage && (
                            <img src={diagnosticImage} alt="Diagnostic Logo" style={{ maxWidth: '150px', maxHeight: '150px' }} />
                        )}
                </div>
                <div className='launched-survey-questions'>{questions.map(renderQuestion)}</div>


                
                <div className="button-side-pin-color"></div>

                   
                
                
                
            </div>
            <div className="button-side">
                <button onClick={onBack} className="launch-button"><FontAwesomeIcon icon={faArrowLeft} />Volver</button>

                <button type="button" className='PIN-button' onClick={handleSaveAndGeneratePin}>Generar PIN y Guardar</button>
            </div>
        </div>
    );
};

export default LaunchSurvey;