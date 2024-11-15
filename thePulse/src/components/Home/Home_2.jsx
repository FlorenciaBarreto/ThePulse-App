import React from 'react';
import '../../assets/styles/Home.css';

import questionsIcon from '../../assets/images/icono_1.png';
import resultsIcon from '../../assets/images/icono_2.png';
import flexibilityIcon from '../../assets/images/icono_3.png';
import participationIcon from '../../assets/images/icono_4.png';

const SolutionComponent = () => {
    return (
      <div className="solution-container">
        <h2 id="solucion" >¡Solución!</h2>
        <h3>Con <span className="highlight-bold">The Pulse</span> mejorarás el <br></br> <span className="highlight">bienestar</span> de tu empresa de esta forma:</h3>
        <div className="benefits-container">
          <div className="benefit-item">
            <img src={questionsIcon} alt="Preguntas abiertas" className="benefit-icon" />
            <p>Preguntas abiertas</p>
          </div>
          <div className="benefit-item">
            <img src={resultsIcon} alt="Resultados en Tiempo real" className="benefit-icon" />
            <p>Resultados en Tiempo real</p>
          </div>
          <div className="benefit-item">
            <img src={flexibilityIcon} alt="Flexibilidad en la ejecución" className="benefit-icon" />
            <p>Flexibilidad en la ejecución</p>
          </div>
          <div className="benefit-item">
            <img src={participationIcon} alt="Participación 360°" className="benefit-icon" />
            <p>Participación 360°</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default SolutionComponent;