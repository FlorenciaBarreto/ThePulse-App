import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faApple, faGoogle, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate solo una vez
import '../../assets/styles/Login.css';
import { gapi } from "gapi-script";
import GoogleLogin from 'react-google-login';

import Logo from '../../assets/images/logo.svg';

const LogIn = () => {
  const clientID = "468328956204-fo9hu06f4bo6nq53v4des8p718135cmh.apps.googleusercontent.com"
    const [user, setUser] = useState({});
    const [loggeIn, setLoggetInfo] = useState(false);

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientID,
            });
        }
        gapi.load("client:auth2", start);
    });

    const onSuccess = (response) => {
      console.log(response);
        setUser(response.profileObj);
        document.getElementsByClassName("btn").hidden = true;
        //alert(user.email);
        //añadimos los datos de Google a Mysql
        const email = user.email;
        const name = user.name;
        const organization = user.name;
        const password = user.googleId;
        const hasPermissions = user.name;
        const isONG = user.name;

        


        const setErrorMessage = () => {
          setUser("");
        }
        
        

        alert(email);
        try {
          alert("Error 3 Elevyn");    
          const response =  fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              organization,
              email,
              password, // La contraseña debería ser hasheada en el servidor
              hasPermissions: hasPermissions ? 1 : 0,
              isONG: isONG ? 1 : 0,
            }),
          });
  
          const data =  response.json(); // Obtiene la respuesta del servidor
          
          if (response.ok) {
            localStorage.setItem('token', data.token); // Almacena el token en localStorage
            window.dispatchEvent(new Event('authChange'));
            navigate('/choose');
          } else {
            console.log('Error en el registro:');
          }
        } catch (error) {
          console.log('Error en el registro:');

        }

        /*const Insert = async (event) => {
          event.preventDefault();
          alert("Error 3 Elevyn");
            try {
              
              const response =  fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name,
                  organization,
                  email,
                  password, // La contraseña debería ser hasheada en el servidor
                  hasPermissions: hasPermissions ? 1 : 0,
                  isONG: isONG ? 1 : 0,
                }),
              });
      
              const data = await response.json(); // Obtiene la respuesta del servidor
              
              if (response.ok) {
                localStorage.setItem('token', data.token); // Almacena el token en localStorage
                window.dispatchEvent(new Event('authChange'));
                navigate('/choose');
              } else {
                console.log('Error en el registro:');
              }
            } catch (error) {
              console.log('Error en el registro:');

            }
          
      };*/





    }
    const onFailure = (response) => {
        console.log("Something went wrong");
    }
    const handleLogout = () => {
        setUser({});
    }



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        // Dispara el evento personalizado
        window.dispatchEvent(new Event('authChange'));
        navigate('/dashboard');

      } else {
        // Manejar errores de inicio de sesión aquí
        console.log('Error de inicio de sesión', data.message);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };



  return (
    <div className="common-container">
      <div className="logo-background">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Iniciar sesión</h2>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Correo electrónico"
            required
          />
          <div className="password-field">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Contraseña"
              required
            />
            <FontAwesomeIcon
              icon={isPasswordVisible ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="password-icon"
            />
          </div>
          <div className="forgot-password">
            <span>¿Olvidaste tu contraseña?</span>
            <Link to="/reset-password" className="link-underline"> Restablece tu contraseña</Link>
          </div>
          <button type="submit" className="login-button" >Iniciar</button>
          <div className="divider">o</div>
          <GoogleLogin  className="google-button btn"
         
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          render={renderProps => (
            <button className="google-button btn" onClick={renderProps.onClick} disabled={renderProps.disabled}> <FontAwesomeIcon icon={faGoogle} />Continuar con Google</button>
          )}

          buttonText="Continue  with Google"
          cookiePolicy={"single_host_origin"}
        />

      <div class={user ? "profile" : "hidden"}>
        <img src={user.imageUrl} />
        <h3>{user.email}</h3>
  
      </div>
          <button type="button" className="microsoft-button">
            <FontAwesomeIcon icon={faMicrosoft} /> Continuar con Microsoft
          </button>
          
          <button type="button" className="apple-button">
            <FontAwesomeIcon icon={faApple} /> Continuar con Apple
          </button>
      

      <div class={user ? "profile" : "hidden"}>
        <img src={user.imageUrl} />
        <h3>{user.name}</h3>
  
      </div>
          
          <div className="register-link ">
            <span>¿No tienes una cuenta?</span>
            <Link to="/sign-up" className="link-underline"> Regístrate</Link>
          </div>
        </form>
      </div>
      
    </div>
   
  );
};

export default LogIn;
