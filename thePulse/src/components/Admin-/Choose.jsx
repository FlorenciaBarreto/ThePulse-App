import React, { useState } from 'react';
import '../../assets/styles/Survey.css';

import Logo from '../../assets/images/logo_w.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSheetPlastic, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import Templates from './TemplatesPulse/Templates';
import CreateSurvey from './CreateSurvey/CreateSurvey';

// const SurveySelector = () => {
//   const [selectedOption, setSelectedOption] = useState('');
//   const { setSurveyType } = useSurvey(); // Corregido para usar useSurvey directamente

//   const handleSelectOption = (option) => {
//     setSelectedOption(option);
//     setSurveyType(option); // Establecer el tipo de encuesta basado en la opción seleccionada
//   };

//   const resetSelection = () => {
//     setSelectedOption('');
//     setSurveyType(''); // Resetear el tipo de encuesta cuando el usuario quiera cambiar su elección
//   };

//   return (
//     <div className="common-container">
//       <div className="logo-background">
//         <img src={Logo} alt="Logo" className="logo" />
//       </div>
//       {selectedOption === '' && (
//         <div className="options">
//           {[
//             { key: 'template', icon: faSheetPlastic, label: 'Empezar con una plantilla' },
//             { key: 'diagnostic', icon: faScrewdriverWrench, label: 'Construir un diagnóstico' },
//           ].map((option) => (
//             <div
//               key={option.key}
//               className={`option ${option.key === 'template' ? 'template' : ''}`}
//               onClick={() => handleSelectOption(option.key)}
//             >
//               <FontAwesomeIcon icon={option.icon} className={`icon-${option.key}`} />
//               <div className="label">{option.label}</div>
//             </div>
//           ))}
//         </div>
//       )}
//       {selectedOption === 'template' && <Templates onBack={resetSelection} />}
//       {selectedOption === 'diagnostic' && <CreateSurvey onBack={resetSelection} />}    </div>
//   );
// };

// export default SurveySelector;

import { TemplateProvider  } from '../../assets/js/TemplateContext';

const SurveySelector = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const resetSelection = () => {
    setSelectedOption('');
  };

  return (
    <div className="container">
      <div className="logo-background">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      {selectedOption === '' && (
        <div className="options">
          {[
            { key: 'template', icon: faSheetPlastic, label: 'Empezar con una plantilla' },
            { key: 'diagnostic', icon: faScrewdriverWrench, label: 'Construir un diagnóstico' },
          ].map((option) => (
            <div
              key={option.key}
              className={`option ${option.key === 'template' ? 'template' : ''}`}
              onClick={() => handleSelectOption(option.key)}
            >
              <FontAwesomeIcon icon={option.icon} className={`icon-${option.key}`} />
              <div className="label">{option.label}</div>
            </div>
          ))}
        </div>
      )}
        {selectedOption === 'template' && (
          <TemplateProvider>
            <Templates onBack={resetSelection} />
          </TemplateProvider>
      )}
      {selectedOption === 'diagnostic' && <CreateSurvey onBack={resetSelection} />}    </div>
  );
};

export default SurveySelector;
