// import React, { createContext, useState, useContext, useEffect } from 'react';

// const SurveyContext = createContext();

// export const useSurvey = () => useContext(SurveyContext);



// export const SurveyProvider = ({ children }) => {
//   const [diagnosticName, setDiagnosticName] = useState('');
//   const [participants, setParticipants] = useState([]);
//   const [surveyType, setSurveyType] = useState('');
//   const [selectedParticipant, setSelectedParticipant] = useState('');
//   const [questions, setQuestions] = useState([
//     { id: 1, configured: false },
//     { id: 2, configured: false },
//     { id: 3, configured: false },
//   ]);
//   // Nuevo estado para almacenar la imagen
//   const [diagnosticImage, setDiagnosticImage] = useState(null);

//   const handleImportParticipants = () => {
//     // Simula la importación de participantes
//     const importedParticipants = ['Participante 1', 'Participante 2', 'Participante 3'];
//     setParticipants(importedParticipants);
//   };

//    // '' indica que no se ha hecho una elección

//   // Modificar useEffect para que solo establezca las preguntas iniciales si se elige el tipo 'template'
//   useEffect(() => {
//     if (surveyType === 'template') {
//       setQuestions(initialQuestions);
//     }
//   }, [surveyType]);

//   const initialQuestions = [
//     { textoPregunta: "Región", tipoPregunta: "open", configured: true },
//     { textoPregunta: "Género", tipoPregunta: "open" , configured: true },
//     { textoPregunta: "Edad", tipoPregunta: "open" , configured: true },
//     { textoPregunta: "¿Nivel de estudios?", tipoPregunta: "open" , configured: true },
//     { textoPregunta: "¿Tipo de contrato?", tipoPregunta: "open" , configured: true },
//     { textoPregunta: "Jefatura", tipoPregunta: "closed", opciones: ["Si", "No"] , configured: true },
//     { textoPregunta: "En una escala del 0 al 10, ¿cuán probable es que recomiendes trabajar en nuestra empresa a amigos o familiares?", tipoPregunta: "rating" , configured: true },
//     { textoPregunta: "¿Cuéntanos brevemente la razón principal para la puntuación de la pregunta anterior?", tipoPregunta: "open" , configured: true },
//     { textoPregunta: "¿Tienes algún comentario o sugerencia para mejorar el clima organizacional?", tipoPregunta: "open" , configured: true }
//   ];

//     // Cargar las preguntas preconfiguradas al inicio
//     useEffect(() => {
//       setQuestions(initialQuestions);
//     }, []);

//   // Función para actualizar la imagen del diagnóstico
//   const updateDiagnosticImage = (image) => {
//     setDiagnosticImage(image);
//   };

//   return (
//     <SurveyContext.Provider
//       value={{
//         diagnosticName,
//         setDiagnosticName,
//         participants,
//         setParticipants,
//         selectedParticipant,
//         setSelectedParticipant,
//         questions,
//         setQuestions,
//         diagnosticImage, // Añade la imagen como parte del contexto
//         updateDiagnosticImage, // Función para actualizar la imagen
//         handleImportParticipants,
//         surveyType, 
//         setSurveyType,
//       }}
//     >
//       {children}
//     </SurveyContext.Provider>
//   );
// };


import React, { createContext, useState, useContext } from 'react';

const SurveyContext = createContext();

export const useSurvey = () => useContext(SurveyContext);

export const SurveyProvider = ({ children }) => {
  const [diagnosticName, setDiagnosticName] = useState('');
  const [participantes, setParticipantes] = useState([]);
  const [questions, setQuestions] = useState([
    { id: 1, configured: false },
    { id: 2, configured: false },
    { id: 3, configured: false },
  ]);
  // Nuevo estado para almacenar la imagen
  const [diagnosticImage, setDiagnosticImage] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const updateFechaInicio = (fecha) => {
    setFechaInicio(fecha);
  };

  const updateFechaFin = (fecha) => {
    setFechaFin(fecha);
  };



  const updateParticipantes = (newParticipantes) => {
    setParticipantes(newParticipantes);
  };

  // Función para actualizar la imagen del diagnóstico
  const updateDiagnosticImage = (image) => {
    setDiagnosticImage(image);
  };

  return (
    <SurveyContext.Provider
      value={{
        diagnosticName,
        setDiagnosticName,
        questions,
        setQuestions,
        diagnosticImage, // Añade la imagen como parte del contexto
        updateDiagnosticImage, // Función para actualizar la imagen
        participantes, 
        updateParticipantes,
        fechaInicio,
        updateFechaInicio,
        fechaFin,
        updateFechaFin, 
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};