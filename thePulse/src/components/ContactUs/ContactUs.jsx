import React from 'react';
import '../../assets/styles/ContactUs.css';
import Logo from '../../assets/images/logo.svg';
import Footer from '../Footer';
import WhiteSpace from '../Whitespace';
function ContactUs() {
  return (
    <div className="contact-us-container">
        <div className="contact-us-section">
            <div className="contact-us-image-container">
                {/* Asegúrate de reemplazar 'image-src.jpg' con la ruta de tu imagen */}
                <img src={Logo} alt="ContactUs" />
            </div>
                <div className="contact-us-container">
                    <div className="contact-us-header">
                        <h1>Contacte con nosotros</h1>
                        <p>Explore el futuro con nosotros.<br></br> No dude en ponerse en contacto con nosotros.</p>
                    </div>
                    <form className="contact-us-form">
                        <div className="form-group-contactus">
                        <label htmlFor="fullName">Nombre</label>
                        <input type="text" id="fullName" placeholder="Nombre completo" />
                        </div>
                        <div className="form-group-contactus">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Correo electrónico" />
                        </div>
                        <div className="form-group-contactus">
                        <label htmlFor="message">Mensaje</label>
                        <textarea id="message" placeholder="¿Como podemos mejorar?"></textarea>
                        </div>
                        <button type="submit" className="send-message-button">Send message</button>
                    </form>
                </div>

        </div>
    <WhiteSpace size="medium" />
      <Footer/>
    </div>
  );
}

export default ContactUs;