import React from 'react';
import '../../assets/styles/AboutUs.css';

import AboutUs from '../../assets/images/AboutUs.svg';

const AboutUs_0 = () => {
  return (
    <div className="about-container">
      <div className="about-section1">
            <h2>Sobre nosotros</h2>
            <p>Ofrecemos soluciones revolucionarias a los problemas del sector. Únase a la comunidad The Pulse y experimente hoy mismo las ventajas de la optimización empresarial.</p>
        </div>
        <div className="about-section">
            <img src={AboutUs}  c alt="AboutUsPage"></img>
        </div>
        <div className="about-section2">
            <h2>Nuestra misión</h2>
            <p>En The Pulse, nos comprometemos a prestar servicios excelentes a nuestros clientes y a ayudarles a obtener los mejores resultados. Creemos que podemos tener un impacto positivo en nuestra comunidad, en la industria y en el mundo. Nuestro equipo Lando se dedica a proporcionar el mejor servicio y apoyo posibles, y siempre estamos buscando formas de mejorar e innovar.</p>
        </div>
    </div>
  );
}

export default AboutUs_0;
