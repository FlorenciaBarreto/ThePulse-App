import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import '../../assets/styles/Login.css';
import Logo from '../../assets/images/logo.svg';

const Name = () => {
  const [nombre, setNombre] = useState('');
  const [equipo, setEquipo] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleEquipoChange = (event) => {
    setEquipo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Navega al nuevo componente y pasa el estado
    navigate('/welcome', { state: { nombre, nombreEncuesta: 'Cobres y metales' } });
  };
  
  return (
    <div className="pin-common-container">
      <div className="logo-background">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="name-container">
        <form className="name-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={nombre}
            onChange={handleNombreChange}
            placeholder="Nombre"
            required
          />
          {/* Cambia esto a un <select> si necesitas un menú desplegable */}
          <select
            value={equipo}
            onChange={handleEquipoChange}
            required
          >
            <option value="">Seleccione un equipo</option>
            <option value="desarrollo">Desarrollo</option>
            <option value="marketing">Marketing</option>
            <option value="ventas">Ventas</option>
            <option value="diseno">Diseño</option>
            <option value="soporte">Soporte Técnico</option>
          </select>
          <button type="submit" className="name-button">¡Listo, vamos!</button>
        </form>
      </div>
    </div>
  );
};

export default Name;

