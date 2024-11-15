import React from 'react';
import '../../assets/styles/Home.css';
import HomePage0 from '../../assets/images/homepage.svg'
import Logo from '../../assets/images/logo_w.png'

const HOME_1 = () => {
  return (
    <div id="que-hacemos" className="home-2">
      <div className="resolvemos-container">
        <h2>¿Qué resolvemos?</h2>
        <img src={Logo} className="logo-home2"   alt="HomePage"></img>
        <img src={HomePage0} alt="HomePage"></img>
        
      </div>
    </div>
  );
}

export default HOME_1;
