import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Header.css';
import LogoSvg from '../assets/images/header_logo.svg';

const Header = () => {
  const location = useLocation();
  // const isHome = location.pathname === '/'; 

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src={LogoSvg} alt="Logo de la compañía" className="logo" />
        </Link>
      </div>
      <nav className="navigation">
        <Link to="/" className="nav-link">Home</Link>
        <a href="#que-hacemos" className="nav-link">¿Qué resolvemos?</a>
        <a href="#solucion" className="nav-link">Solución</a>
        <Link to="/pricing" className="nav-link">Precios</Link>
        <Link to="/about-us" className="nav-link">Sobre nosotros</Link>
        <Link to="/contact-us" className="nav-link">Contacto</Link>
      </nav>
      <div className="right-wrapper-btns">
        {/* {isHome && ( 
          <div className="class-code">
            <Link to="/pin" className="btn btn-code">Participar con código</Link>
          </div>
        )} */}


          <div className="class-code">
            <Link to="/pin" className="btn btn-code">Participar con código</Link>
          </div>

        <div className="login-actions">
          <Link to="/login" className="btn btn-primary">Log in</Link>
          <Link to="/sign-up" className="btn btn-secondary">Sign up</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
