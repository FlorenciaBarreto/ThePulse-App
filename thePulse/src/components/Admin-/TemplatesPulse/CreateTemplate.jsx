// import React, { useState, useEffect } from 'react';
// import '../../../assets/styles/Survey.css';
// import '../../../assets/styles/Home.css';
// import { TemplateProvider } from '../../../assets/js/TemplateContext';


// // Asumiendo que estos componentes no necesitan estar envueltos en un SurveyProvider adicional
// // y pueden utilizar el contexto de SurveyProvider más alto si es necesario.
// import CreateTemplateStep0 from './CreateTemplate_0';
// import CreateTemplateStep1 from './CreateTemplate_1';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// const CreateStartTemplate = ({ onBack, selectedTemplate, isModalOpen }) => {
//   const [isSurveyCreated, setIsSurveyCreated] = useState(false);
//   const [isEditingQuestion, setIsEditingQuestion] = useState(false); 
//   // const { templateQuestions } = useTemplate(); // Obtiene el estado del contexto

//   const handleSurveyCreate = () => {
//     setIsSurveyCreated(true);
//   };

//   return (
//     <div className="home-container">
//       <TemplateProvider>
//         {!isSurveyCreated && (
//           <CreateTemplateStep0 
//             onSurveyCreate={handleSurveyCreate} 
//             templateName={selectedTemplate.title} 
//           />
//         )}
//         {isSurveyCreated && (
//           <CreateTemplateStep1 
//             diagnosticName={selectedTemplate.title}
//             predefinedQuestions={templateQuestions} // Pasa las preguntas configuradas
//             onEditingQuestion={setIsEditingQuestion} 
//           />
//         )}
       
//         {!isEditingQuestion && !isModalOpen && (
//           <button onClick={onBack} className="back-button">
//             <FontAwesomeIcon icon={faArrowLeft} />
//           </button>
//         )}
//       </TemplateProvider>
//     </div>
//   );
// };

// export default CreateStartTemplate;







// import React, { useState, useContext } from 'react';
// import { TemplateContext } from '../../../assets/js/TemplateContext';
// import CreateTemplateStep0 from './CreateTemplate_0';
// import CreateTemplateStep1 from './CreateTemplate_1';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// const CreateTemplate = ({ onBack }) => {
//   const { template } = useContext(TemplateContext);
//   const [isSurveyCreated, setIsSurveyCreated] = useState(false);
//   const [isPreviewVisible, setIsPreviewVisible] = useState(false); // Nuevo estado
//   // En CreateTemplate
//   const [isEditing, setIsEditing] = useState(false);


//   const handleSurveyCreate = () => {
//     setIsSurveyCreated(true);
//   };

//   return (
//     <div className="home-container">
//       {!isSurveyCreated ? (
//         <CreateTemplateStep0 onSurveyCreate={handleSurveyCreate} templateName={template.nombre} />
//       ) : (
//         <CreateTemplateStep1 
//           diagnosticName={template.nombre} 
//           predefinedQuestions={template.preguntas}
//           onPreviewChange={setIsPreviewVisible} // Pasa el callback a CreateTemplateStep1
//           onEditingChange={setIsEditing} 
//         />
//       )}
      
//       {/* Renderiza el botón solo si el preview no está visible */}
//       {!isPreviewVisible && !isEditing && (
//         <button onClick={onBack} className="back-button">
//           <FontAwesomeIcon icon={faArrowLeft} />
//         </button>
//       )}
//     </div>
//   );
// };

// export default CreateTemplate;


import React, { useState, useContext } from 'react';
import { TemplateContext } from '../../../assets/js/TemplateContext';
import CreateTemplateStep0 from './CreateTemplate_0';
import CreateTemplateStep1 from './CreateTemplate_1';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CreateTemplate = ({ onBack }) => {
  const { template } = useContext(TemplateContext);
  const [isSurveyCreated, setIsSurveyCreated] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false); // Nuevo estado
  const [isEditingQuestion, setIsEditingQuestion] = useState(false); // Nuevo estado

  const handleSurveyCreate = () => {
    setIsSurveyCreated(true);
  };

  return (
    <div className="home-container">
      {!isSurveyCreated ? (
        <CreateTemplateStep0 onSurveyCreate={handleSurveyCreate} templateName={template.nombre} />
      ) : (
        <CreateTemplateStep1 
          diagnosticName={template.nombre} 
          predefinedQuestions={template.preguntas}
          onPreviewChange={setIsPreviewVisible} // Pasa el callback a CreateTemplateStep1
          onEditingQuestion={setIsEditingQuestion}
        />
      )}
      
      {/* Renderiza el botón solo si el preview no está visible */}
      {!isPreviewVisible && !isEditingQuestion && (
        <button onClick={onBack} className="back-button-personal">
          <FontAwesomeIcon icon={faArrowLeft} /> Volver al inicio
        </button>
      )}

    </div>
  );
};

export default CreateTemplate;