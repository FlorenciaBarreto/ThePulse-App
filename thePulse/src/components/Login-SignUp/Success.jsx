import React from 'react';
import '../../assets/styles/SurveyStyles.css';
import Logo from '../../assets/images/logo.svg';

const Success = ({ message, onDismiss }) => {
  return (
    <div className="common-container">
        <div className="logo-background">
            <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div className="success-container">
            <p>{message}</p>
            <button onClick={onDismiss}>Cerrar</button>
        </div>
    </div>
  );
};

export default Success;
