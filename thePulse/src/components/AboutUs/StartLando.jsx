import React from 'react';

import '../../assets/styles/Common.css';

import Logo from '../../assets/images/logo.svg';
const GetStartedWithLando = () => {
  return (
    <div className="get-started-container">
      <div className="text-area-lando">
      <div className="left-side" style={{ marginLeft: 0 }}>
        <h2>El <span className="highlight">bienestar</span> de tu organización</h2>
        <div className="left-side-buttons">
        <button className="btn-free" type="button" onClick={(e) => {   e.preventDefault(); window.location.href='/sign-up'; }}
        >Pruébalo gratis</button>
          <button className="btn-demo">Mira cómo funciona</button> 
        </div>
      </div>
      </div>
      <div className="graphic-area">
        <img src={Logo} alt="Home-logo"></img>
      </div>
    </div>
  );
};

export default GetStartedWithLando;
