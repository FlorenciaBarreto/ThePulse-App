// Templates.js
import React, { useState, useContext, useEffect } from 'react';
import SurveyTemplateSelector from './SurveyTemplateSelector';
import CreateTemplate from './CreateTemplate';
import { TemplateContext } from '../../../assets/js/TemplateContext';

const Templates = ({ onBack }) => {
  const { template, updateTemplate } = useContext(TemplateContext);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);

  useEffect(() => {
    if (template && template.nombre) {
      setIsCreatingTemplate(true);
    }
  }, [template]);

  return (
    <div className="home-container">
      {!isCreatingTemplate ? (
        <SurveyTemplateSelector onSelectTemplate={updateTemplate} onBack={onBack} />
      ) : (
        <CreateTemplate onBack={onBack} selectedTemplate={template} />
      )}
    </div>
  );
};

export default Templates;
