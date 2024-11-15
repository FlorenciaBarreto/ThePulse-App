// import React from 'react';
// import '../../assets/styles/Survey.css';
// import '../../assets/styles/Home.css';


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMedal } from '@fortawesome/free-solid-svg-icons';

// const TemplateOption = ({ title, items }) => {
//     return (
//       <div className="template-option">
//         <h2>{title}</h2>
//         <ul>
//           {items.map((item, index) => (
//             <li key={index}>
//               {/* El icono aquí actúa como una viñeta */}
//               <FontAwesomeIcon icon={faMedal} className="icon" style={{ transform: 'rotate(180deg)' }} />
//               {item}
//             </li>
//           ))}
//         </ul>
//         <button className="select-button">Seleccionar</button>
//       </div>
//     );
//   };
  
//   // Componente contenedor que utiliza TemplateOption
//   const SurveyTemplateSelector = () => {
//     // Datos para las plantillas, podrías obtenerlos de una API o de una base de datos
//     const templates = [
//       {
//         title: 'Clima laboral',
//         items: [
//           'Satisfacción Laboral',
//           'Comunicación Interna',
//           'Relaciones Interpersonales',
//           'Condiciones de Trabajo',
//           'Oportunidades de Desarrollo y Crecimiento',
//           'Equilibrio entre la vida laboral y personal',
//           'Reconocimiento y Recompensas'
//         ],
//       },
//       {
//         title: 'Cultura de innovación',
//         items:[
//             'Satisfacción Laboral',
//             'Comunicación Interna',
//             'Relaciones Interpersonales',
//             'Condiciones de Trabajo',
//             'Oportunidades de Desarrollo y Crecimiento',
//             'Equilibrio entre la vida laboral y personal',
//             'Reconocimiento y Recompensas'
//           ],
//       },
//       {
//         title: 'Cultura de equipo',
//         items: [
//             'Satisfacción Laboral',
//             'Comunicación Interna',
//             'Relaciones Interpersonales',
//             'Condiciones de Trabajo',
//             'Oportunidades de Desarrollo y Crecimiento',
//             'Equilibrio entre la vida laboral y personal',
//             'Reconocimiento y Recompensas'
//           ],
//       },
//     ];
  
//     return (
//       <div className="template-selector">
//         <h1>Elige la plantilla</h1>
//         <div className="templates">
//           {templates.map((template, index) => (
//             <TemplateOption key={index} title={template.title} items={template.items} />
//           ))}
//         </div>
//       </div>
//     );
//   };
  
//   export default SurveyTemplateSelector;



import React, { useContext } from 'react';
 import '../../../assets/styles/Survey.css';
 import '../../../assets/styles/Home.css';


 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faMedal,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
 

 import { TemplateContext } from '../../../assets/js/TemplateContext';

 const TemplateOption = ({ title, items, onSelect }) => {
   return (
     <div className="template-option">
       <h2>{title}</h2>
       <ul>
         {items.map((item, index) => (
           <li key={index}>
             <FontAwesomeIcon icon={faMedal} className="icon" style={{ transform: 'rotate(180deg)' }} />
             {item}
           </li>
         ))}
       </ul>
       <button className="select-button" onClick={onSelect}>Seleccionar</button>
     </div>
   );
 };



   // Componente contenedor que utiliza TemplateOption
   const SurveyTemplateSelector = ({ onSelectTemplate, onBack }) => {
    const { updateTemplate } = useContext(TemplateContext);
    
     // Datos para las plantillas, podrías obtenerlos de una API o de una base de datos
     const templates = [
        {
          title: 'Clima laboral',
          items: [
            'Satisfacción Laboral',
            'Comunicación Interna',
            'Relaciones Interpersonales',
            'Condiciones de Trabajo',
            'Oportunidades de Desarrollo y Crecimiento',
            'Equilibrio entre la vida laboral y personal',
            'Reconocimiento y Recompensas'
          ],
          questions: [
           { pregunta: "Prueba", tipo: "open", configurada: true },
           { pregunta: "Prueba", tipo: "open" , configurada: true },
           { pregunta: "Prueba", tipo: "open" , configurada: true },
           { pregunta: "Prueba de estudios?", tipo: "open" , configurada: true },
           { pregunta: "¿Tipo de contrato?", tipo: "open" , configurada: true },
           { pregunta: "Jefatura", tipo: "closed", opciones: ["Si", "No"] , configurada: true },
           { pregunta: "En una escala del 0 al 10, ¿cuán probable es que recomiendes trabajar en nuestra empresa a amigos o familiares?", tipo: "rating" , configurada: true, minValue: 0,  
           maxValue: 10 },
           { pregunta: "¿Cuéntanos brevemente la razón principal para la puntuación de la pregunta anterior?", tipo: "open" , configurada: true },
           { pregunta: "¿Tienes algún comentario o sugerencia para mejorar el clima organizacional?", tipo: "open" , configurada: true },
           { pregunta: "¿Prueba?", tipo: "open" , configurada: true }

         ],
        },
       {
         title: 'Cobres y Metales',
         items:[
             'Región',
             'Género',
             'Edad',
             'Nivel de estudios',
             'Tipo de contrato',
             '¿Jefatura? (Sí / No)',
             'Rating: ¿Cuán probable es que recomiendes trabajar en nuestra empresa a amigos y/o familiares?',
             'Razón principal para la puntuación de la pregunta anterior',
             'Comentarios o sugerencias para mejorar el clima organizacional'
           ],
           questions: [
             {id: "1", pregunta: "Región", tipo: "open", configurada: true },
             { id: "2",pregunta: "Género", tipo: "open" , configurada: true },
             { id: "3",pregunta: "Edad", tipo: "open" , configurada: true },
             { id: "4",pregunta: "¿Nivel de estudios?", tipo: "open" , configurada: true },
             { id: "5",pregunta: "¿Tipo de contrato?", tipo: "open" , configurada: true },
             { id: "6",pregunta: "Jefatura", tipo: "closed", opciones: ["Si", "No"] , configurada: true },
             { id: "7",pregunta: "En una escala del 0 al 10, ¿cuán probable es que recomiendes trabajar en nuestra empresa a amigos o familiares?", tipo: "rating" ,  minValue: 0,  
             maxValue: 10, configurada: true },
             { id: "8",pregunta: "¿Cuéntanos brevemente la razón principal para la puntuación de la pregunta anterior?", tipo: "open" , configurada: true },
             { id: "9",pregunta: "¿Tienes algún comentario o sugerencia para mejorar el clima organizacional?", tipo: "open" , configurada: true },
             { id: "10",pregunta: "¿Prueba?", tipo: "open" , configurada: true }

           ],
       },
        {
          title: 'Cultura de equipo',
          items: [
              'Satisfacción Laboral',
              'Comunicación Interna',
              'Relaciones Interpersonales',
              'Condiciones de Trabajo',
              'Oportunidades de Desarrollo y Crecimiento',
              'Equilibrio entre la vida laboral y personal',
              'Reconocimiento y Recompensas'
            ],
            questions: [
             { id: "1", pregunta: "Prueba2", tipo: "open", configurada: true },
             { pregunta: "Prueba2", tipo: "open" , configurada: true },
             { pregunta: "Prueba2", tipo: "open" , configurada: true },
             { pregunta: "Prueba de estudios?", tipo: "open" , configurada: true },
             { pregunta: "¿Tipo de contrato?", tipo: "open" , configurada: true },
             { pregunta: "Jefatura", tipo: "closed", opciones: ["Si", "No"] , configurada: true },
             { pregunta: "En una escala del 0 al 10, ¿cuán probable es que recomiendes trabajar en nuestra empresa a amigos o familiares?", tipo: "rating" , configurada: true, minValue: 0,  
             maxValue: 10 },
             { pregunta: "¿Cuéntanos brevemente la razón principal para la puntuación de la pregunta anterior?", tipo: "open" , configurada: true },
             { pregunta: "¿Tienes algún comentario o sugerencia para mejorar el clima organizacional?", tipo: "open" , configurada: true },
             { pregunta: "¿Prueba?", tipo: "open" , configurada: true }
  
           ],
       },
      ];

      const handleSelectTemplate = (template) => {
        updateTemplate(template.title, template.questions);
        console.log("Seleccionada plantilla:", template.title, "Con preguntas:", template.questions);
      };

      
      return (
        <div className='template-selector-page'>
        <div className="template-selector">
          <h1>Elige la plantilla</h1>

          <div className="templates">
            {templates.map((template, index) => (
              <TemplateOption 
                key={index} 
                title={template.title} 
                items={template.items} 
                onSelect={() => handleSelectTemplate(template)}
              />
            ))}
          </div>

        </div>
                  <button onClick={onBack} className="back-button">
                  <FontAwesomeIcon icon={faArrowLeft} /> <p> Volver al inicio</p>
                </button>
           </div>

      );
    };
    
    export default SurveyTemplateSelector;