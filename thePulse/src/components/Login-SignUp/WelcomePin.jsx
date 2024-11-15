// import React from 'react';
// import '../../assets/styles/Login.css';
// import Logo from '../../assets/images/logo.svg';
// import { useLocation } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

// const Welcome = () => {
//   const location = useLocation();
//   const { nombre } = location.state || {};

//   return (
//     <div className="welcome-container">
//       <img src={Logo} alt="Logo de la compañía" className="logo" />
//       <h2>Bienvenido</h2>
//       <h1>{nombre}</h1>
//       <FontAwesomeIcon icon={faChevronRight} className="chevron-icon" /> 
//       <p>¡Te has unido!</p>
//     </div>
//   );
// };

// export default Welcome;


import React, { useState } from 'react';
import '../../assets/styles/Login.css';
import Logo from '../../assets/images/logo.svg';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const Welcome = () => {
  const location = useLocation();
  const { nombre, nombreEncuesta } = location.state || {};
  const [showWelcome, setShowWelcome] = useState(true); // Estado para controlar la visualización del contenedor de bienvenida
  const navigate = useNavigate();
  // Función para alternar entre los contenedores
  const toggleContainer = () => {
    setShowWelcome(!showWelcome);
  };
  


  const goToSurvey = () => {
    const pin = localStorage.getItem('pin');
    if (!showWelcome ) {
      navigate(`/${pin}`);
    } else {
      setShowWelcome(!showWelcome);
    }
  };


  return (
    <div>
      {showWelcome ? ( // Renderiza el contenedor de bienvenida si showWelcome es true
        <div className="welcome-container">
          <img src={Logo} alt="Logo de la compañía" className="logo" />
          <h2>Bienvenido/a</h2>
          <FontAwesomeIcon icon={faChevronRight} className="chevron-icon" onClick={toggleContainer} />
          <p>¡Te has unido!</p>
        </div>
      ) : ( // Renderiza el contenedor de explicación si showWelcome es false
        <div className="explanation-container">
          <img src={Logo} alt="Logo" className="logo" />
          <p>Próximamente participaremos en un importante diagnóstico de nuestro ambiente laboral. Este ejercicio es clave para entender y mejorar nuestro entorno de trabajo, por lo que su colaboración es esencial.<br></br>Les pedimos que presten especial atención a cada pregunta del diagnóstico. Sus respuestas nos proporcionarán valiosos insights sobre cómo podemos avanzar juntos hacia un mejor clima organizacional.</p>
          <FontAwesomeIcon icon={faChevronRight} className="chevron-icon2" onClick={goToSurvey} />
        </div>
      )}
    </div>
  );
};

export default Welcome;