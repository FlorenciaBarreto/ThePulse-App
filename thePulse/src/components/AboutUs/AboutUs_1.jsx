import React from 'react';
import '../../assets/styles/AboutUs.css';

import Logo from '../../assets/images/logo.svg';


const AboutUs_1 = () => {
  return (
    <div className="efficiency-container">
      <div className="text-area">
        <h2>Empecemos hoy mismo a trabajar de forma más eficiente.</h2>
      </div>
      <div className="graphic-area">
        <img src={Logo}  c alt="AboutUsPage"></img>
      </div>
    </div>
  );
};

export default AboutUs_1;
