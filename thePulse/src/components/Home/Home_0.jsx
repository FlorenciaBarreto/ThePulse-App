import React from 'react';
import '../../assets/styles/Home.css';


import Logo from '../../assets/images/logo.svg';

const Home_0 = () => {
  return (
    <div className="content-container">
      <div className="left-side">
        <h2>El <span className="highlight">bienestar</span> de tu organización</h2>
        <div className="left-side-buttons">
          <button className="btn-free" type="button" onClick={(e) => {   e.preventDefault(); window.location.href='/sign-up'; }}
>Pruébalo gratis</button>
          <button className="btn-demo">Mira cómo funciona</button> 
        </div>
      </div>
      
      <div className="right-side">
      <img src={Logo} className="logo-home1"alt="Home-logo"></img>
      </div>
    </div>
  );
};

export default Home_0;
