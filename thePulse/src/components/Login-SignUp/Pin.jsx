import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import '../../assets/styles/Login.css';
import Logo from '../../assets/images/logo.svg';



const Pin = () => {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3001/verifyPin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pin })
      });

      const responseData = await response.json();

      if (responseData.valid && responseData.active) {
        console.log('Acceso concedido. Token:', responseData.token);
        // Guarda el token en el almacenamiento local
        localStorage.setItem('token', responseData.token);
          // Almacenar el PIN en el almacenamiento local
        localStorage.setItem('pin', pin);
        console.log("Vamos a /name")
        // Redirige directamente a /name después de guardar el token
        navigate('/welcome');
        // Despacha el evento de cambio de autenticación
        window.dispatchEvent(new Event('authChange'));
      } else {
        console.log('Acceso denegado. PIN inválido.');
        setErrorMessage(responseData.message);
      }
    } catch (error) {
      console.error('Error al verificar el PIN', error);
      setErrorMessage('Ocurrió un error al verificar el PIN.');
    }
  };

  const handlePinChange = (event) => {
    setPin(event.target.value);
  };

  return (
    <div className="pin-common-container">
      <div className="logo-background">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="pin-container">
      <div className={`error-message ${errorMessage ? 'visible' : ''}`}>
        {errorMessage}
      </div>
        <form className="pin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={pin}
            onChange={handlePinChange}
            placeholder="Pin de diagnóstico"
            required
          />
          <button type="submit" className="pin-button">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Pin;