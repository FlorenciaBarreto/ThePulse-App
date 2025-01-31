import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import '../assets/styles/Header.css';
import LogoSvg from '../assets/images/header_logo.svg';
import IcoBook from '../assets/images/Icon library books.svg';
import IcoSetting from '../assets/images/Icon settings.svg';
import IcoNotifi from '../assets/images/Icon notifications.svg';



const AdminHeader = () => {
  // No necesitas useLocation aquí a menos que lo uses para otra lógica condicional

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo-link2">
          <img src={LogoSvg} alt="Logo de la compañía" className="logo" />
        </Link>
      </div>
      {/* Este nav está comentado y oculto, se asume que quieres mantenerlo así
      <nav className="navigation" style={{display: 'none'}}>
        <Link to="/" className="nav-link">Home</Link>
        <a href="#que-hacemos" className="nav-link">¿Qué resolvemos?</a>
        <Link to="/contact-us" className="nav-link">Solución</Link>
        <a href="#funcion" className="nav-link">Cómo funciona</a>
        <Link to="/pricing" className="nav-link">Pricing</Link>
        <Link to="/about-us" className="nav-link">About Us</Link>
      </nav>
      */}
      <div className="login-actions">
        <div className='user-profile'>
          {/* este div es el de la tuerca */}
          <Link to="/dashboard" className="icon-link3">
          <img src={IcoSetting} alt="Logo de la compañía" className="logo" />
          </Link>
        </div>

        <div className='user-profile'>
          {/* este div es el de diagnosticos */}
          <Link to="/dashboard" className="icon-link2">        
          <p class="misdiagnosticos">Mis diagnósticos</p>
          <img src={IcoBook} alt="Logo de la compañía" className="logo" />
          </Link>
        </div>

        <div className='user-profile'>
          {/* este div es el de la campana */}
          <Link to="/dashboard" className="icon-link3">
          <img src={IcoNotifi} alt="Logo de la compañía" className="logo" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
