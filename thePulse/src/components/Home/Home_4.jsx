import React from 'react';
import '../../assets/styles/Home.css';


import Logo from '../../assets/images/logo.svg';

const HomeGrid = () => {
  return (

        <div className="grid-container">
            <div className="grid-row">

                <div className="grid-box">        
                    <img src={Logo}  c alt="HomePage"></img>
                </div>
                <div className="grid-box-text">
                    <h2>Todo su trabajo está seguro</h2>
                    <p>Nos tomamos muy en serio la seguridad de sus datos, por ello utilizamos protocolos de cifrado avanzados para proteger sus archivos en la nube. <br></br>Tus datos están completamentea salvo y seguros con nosotros.</p>
                    <button className='btn-demo'>Saber más</button>
                </div>
            </div>
            <div className="grid-row">
                <div className="grid-box-text2">
                    <h2>Ahorra costes de forma inteligente</h2>
                    <p>Con <span className="highlight-bold">The Pulse</span> conseguirás datos del <span className="highlight">bienestar</span> de tu organización en tiempo real, optimizando costes y lo harás implicando a todas las personas de tu organización.
 <br></br><br></br>
 Gracias a nuestros algoritmos avanzados te acompañamos en la toma de decisiones con base en Data Analytics.<br></br><br></br>
¡Con <span className="highlight-bold">The Pulse</span>, el <span className="highlight">bienestar</span> de tu organización está a solo unos pasos!
                    </p>
                    <button className='btn-demo'>Saber más</button>
                </div>
                <div className="grid-box">        
                    <img src={Logo}   alt="HomePage"></img>
                </div>

            </div>

        </div>

  );
};

export default HomeGrid;
