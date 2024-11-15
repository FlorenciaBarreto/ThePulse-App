// import React, { createContext, useState, useContext } from 'react';

// const TemplateContext = createContext();

// export const useTemplate = () => useContext(TemplateContext);

// export const TemplateProvider = ({ children }) => {
//   const [template, setTemplate] = useState(null);
//   const [templateQuestions, setTemplateQuestions] = useState([]);
//   const [diagnosticName, setDiagnosticName] = useState('');

//   const updateTemplateQuestions = (newQuestions) => {
//     setTemplateQuestions(newQuestions);
//   };

//   const editTemplateQuestion = (id, updatedFields) => {
//     setTemplateQuestions((prevQuestions) =>
//       prevQuestions.map((question) =>
//         question.id === id ? { ...question, ...updatedFields } : question
//       )
//     );
//   };

//   const addTemplateQuestion = (newQuestion) => {
//     setTemplateQuestions((prevQuestions) => [
//       ...prevQuestions,
//       { ...newQuestion, id: Date.now() }
//     ]);
//   };

//   const deleteTemplateQuestion = (questionId) => {
//     setTemplateQuestions((prevQuestions) =>
//       prevQuestions.filter((question) => question.id !== questionId)
//     );
//   };

//   // Más funciones relacionadas con las plantillas según sea necesario...

//   return (
//     <TemplateContext.Provider
//       value={{
//         template,
//         setTemplate,
//         templateQuestions,
//         diagnosticName,
//         setDiagnosticName,
//         updateTemplateQuestions,
//         editTemplateQuestion,
//         addTemplateQuestion,
//         deleteTemplateQuestion,
//         setTemplateQuestions
//         // Más estados y funciones que necesitas exponer...
//       }}
//     >
//       {children}
//     </TemplateContext.Provider>
//   );
// };


// import React, { createContext, useContext, useState } from 'react';
// import React, { createContext, useContext, useState } from 'react';

// const TemplateContext = createContext();

// export const useTemplate = () => useContext(TemplateContext);

// export const TemplateProvider = ({ children }) => {
//   // Separando claramente preguntas predefinidas de añadidas
//   const [predefinedQuestions, setPredefinedQuestions] = useState([]);
//   const [addedQuestions, setAddedQuestions] = useState([]);

//   // Funciones para manejar preguntas predefinidas y añadidas
//   const updatePredefinedQuestions = (questions) => {
//     setPredefinedQuestions(questions);
//   };

//   const updateAddedQuestions = (questions) => {
//     setAddedQuestions(questions);
//   };

//   // Función para actualizar una pregunta específica
//   const editTemplateQuestion = (id, updatedFields) => {
//     setPredefinedQuestions((currentQuestions) =>
//       currentQuestions.map((question) =>
//         question.id === id ? { ...question, ...updatedFields } : question
//       )
//     );
//   };
//   const addQuestion = (questionData) => {
//     setPredefinedQuestions((currentQuestions) => [...currentQuestions, questionData]);
//   };
//   const addAddedQuestion = (questionData) => {
//     setAddedQuestions((currentAddedQuestions) => [...currentAddedQuestions, questionData]);
//   };
//   return (
//     <TemplateContext.Provider
//       value={{
//         templateQuestions,
//         setTemplateQuestions, // Esta no es necesaria exponer si solo usas las funciones de edición y actualización
//         updateTemplateQuestions,
//         editTemplateQuestion,
//         addQuestion,
//         updatePredefinedQuestions,
//         addAddedQuestion,
//       }}
//     >
//       {children}
//     </TemplateContext.Provider>
//   );
// };



// import React, { createContext, useContext, useState } from 'react';

// const TemplateContext = createContext({
//   templateQuestions: [],
//   addedQuestions: [],
//   updateTemplateQuestions: () => {},
//   addAddedQuestion: () => {},
//   editQuestion: () => {},
// });


// export const useTemplate = () => useContext(TemplateContext);

// export const TemplateProvider = ({ children }) => {
//   const [templateQuestions, setTemplateQuestions] = useState([]); // Preguntas de la plantilla seleccionada
//   const [addedQuestions, setAddedQuestions] = useState([]); // Preguntas añadidas por el usuario

//   // Actualiza todas las preguntas de la plantilla
//   const updateTemplateQuestions = (newQuestions) => {
//     setTemplateQuestions(newQuestions);
//   };

//   // Añade una pregunta añadida por el usuario
//   const addAddedQuestion = (questionData) => {
//     setAddedQuestions([...addedQuestions, questionData]);
//   };

//   // Ejemplo de cómo podrías manejar la edición de una pregunta (tanto predefinida como añadida)
//   const editQuestion = (id, updatedData) => {
//     // Intenta actualizar en preguntas predefinidas
//     const updatedPredefined = templateQuestions.map(q => 
//       q.id === id ? { ...q, ...updatedData } : q);
//     setTemplateQuestions(updatedPredefined);

//     // Intenta actualizar en preguntas añadidas
//     const updatedAdded = addedQuestions.map(q => 
//       q.id === id ? { ...q, ...updatedData } : q);
//     setAddedQuestions(updatedAdded);
//   };

//   return (
//     <TemplateContext.Provider value={{
//       templateQuestions,
//       addedQuestions,
//       updateTemplateQuestions,
//       addAddedQuestion,
//       editQuestion,
//     }}>
//       {children}
//     </TemplateContext.Provider>
//   );
// };


// // TemplateContext.js-bueno
// import React, { createContext, useState, useContext } from 'react';


// export const TemplateContext = createContext();

// export const TemplateProvider = ({ children }) => {
//   const [template, setTemplate] = useState({
//     nombre: '',
//     preguntas: []
//   });
//   const [questions, setQuestions] = useState([]);
//   // Método para actualizar la plantilla seleccionada y sus preguntas
//   const updateTemplate = (nombre, preguntas) => {
//     setTemplate({
//       nombre,
//       preguntas
//     });
//   };

//   const updateQuestions = (newQuestions) => {
//     console.log('Actualizando preguntas en el contexto:', newQuestions); // Punto 1
//     setQuestions(newQuestions);
//   };
  
//   return (
//     <TemplateContext.Provider value={{ template, updateTemplate,questions,updateQuestions }}>
//       {children}
//     </TemplateContext.Provider>
//   );
// };

// export const useTemplate = () => useContext(TemplateContext);



// TemplateContext.js
import React, { createContext, useState, useContext } from 'react';


export const TemplateContext = createContext();

export const TemplateProvider = ({ children }) => {
  const [template, setTemplate] = useState({
    nombre: '',
    preguntas: []
  });
  const [questions, setQuestions] = useState([]);
  // Método para actualizar la plantilla seleccionada y sus preguntas
  const updateTemplate = (nombre, preguntas) => {
    setTemplate({
      nombre,
      preguntas
    });
  };
  const [participantes, setParticipantes] = useState([]);
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

  const updateQuestions = (newQuestions) => {
    console.log('Actualizando preguntas en el contexto:', newQuestions); // Punto 1
    setQuestions(newQuestions);
  };
  
  return (
    <TemplateContext.Provider value={{ template, 
      updateTemplate,
      questions,
      updateQuestions,
      participantes, 
      updateParticipantes,
      fechaInicio,
      updateFechaInicio,
      fechaFin,
      updateFechaFin, 
      }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => useContext(TemplateContext);