import React from 'react';
import '../assets/styles/Common.css';
import LogoSvg from '../assets/images/header_logo.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <img src={LogoSvg} alt="Logo de la compañía" className="logo-footer" />
        <p>2024 © The Pulse<br/>All rights reserved.</p>
      </div>
      <div className="footer-section">
        {/* <h4>Links</h4> */}
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/about">About us</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div className="footer-section">
        {/* <h4>Social</h4> */}
        <ul>
          <li><a href="https://www.facebook.com">Facebook</a></li>
          <li><a href="https://www.instagram.com">Instagram</a></li>
          <li><a href="https://www.twitter.com">Twitter</a></li>
          <li><a href="https://www.linkedin.com">LinkedIn</a></li>
        </ul>
      </div>
      <div className="footer-section">
        {/* <h4>Company</h4> */}
        <ul id='footer-last'>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms Of Service</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
