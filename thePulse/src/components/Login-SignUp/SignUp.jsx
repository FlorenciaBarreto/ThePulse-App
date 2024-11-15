 import React, { useState } from 'react';
 import '../../assets/styles/Home.css';
 import '../../assets/styles/Login.css';
 import Logo from '../../assets/images/logo.svg';
 import { Link } from 'react-router-dom';
 import { useNavigate } from 'react-router-dom';


 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

 const SignUp = () => {
   const [name, setName] = useState('');
   const [organization, setOrganization] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [hasPermissions, setHasPermissions] = useState(false);
   const [isONG, setIsONG] = useState(false);
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const navigate = useNavigate();


   const validatePasswords = () => {
    alert("Error 1 Elevyn");
     return password === confirmPassword;
   };

   const handleSubmit = async (event) => {
    event.preventDefault();
    alert("Error 3 Elevyn");
    if (validatePasswords()) {
      alert("Error 2 Elevyn");
      try {
        
        const response = await fetch('http://localhost:3001/register', {
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
          console.log('Error en el registro:', data.message);
          setErrorMessage(data.message || 'Error al registrar el usuario.');
        }
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
        setErrorMessage('Error al conectar con el servidor.');
      }
    } else {
      setErrorMessage('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
    }
};



   const handleInputChange = (event, setter) => {
     setter(event.target.value);
   };



   const togglePasswordVisibility = () => {
     setIsPasswordVisible(!isPasswordVisible);
   };

   const toggleConfirmPasswordVisibility = () => {
     setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
   };



 return (
     <div className="common-container">
       <div className="logo-background">
         <img src={Logo} alt="Logo" className="logo" />
       </div>
       <div className="login-container">
       <form className="login-form" onSubmit={handleSubmit}>
         <h2>Crear cuenta</h2>
         <input
           type="text"
           value={name}
           onChange={(e) => handleInputChange(e, setName)}
           placeholder="Nombre"
           required
         />
         <input
           type="text"
           value={organization}
           onChange={(e) => handleInputChange(e, setOrganization)}
           placeholder="Organización"
           required
         />
         <input
           id="email-input"
           type="email"
           value={email}
           onChange={(e) => handleInputChange(e, setEmail)}
           placeholder="Correo electrónico"
           required
         />
         <div className="input-group">
           <input
             type={isPasswordVisible ? 'text' : 'password'}
             value={password}
             onChange={(e) => handleInputChange(e, setPassword)}
             placeholder="Contraseña"
             required
           />
           <FontAwesomeIcon
             icon={isPasswordVisible ? faEyeSlash : faEye}
             onClick={togglePasswordVisibility}
             className="password-icon"
           />
         </div>
        
         <div className="input-group">
           <input
             type={isConfirmPasswordVisible ? 'text' : 'password'}
            value={confirmPassword}
             onChange={(e) => handleInputChange(e, setConfirmPassword)}
             placeholder="Confirmar Contraseña"
             required
           />
           <FontAwesomeIcon
             icon={isConfirmPasswordVisible ? faEyeSlash : faEye}
             onClick={toggleConfirmPasswordVisibility}
             className="password-icon"
           />
         </div>
         {errorMessage && <div className="error-message">{errorMessage}</div>}
         <div className="checkbox-group">
           <label className="checkbox-container">
             Permisos
             <input
               type="checkbox"
               checked={hasPermissions}
               onChange={() => setHasPermissions(!hasPermissions)}
             />
             <span className="checkmark"></span>
           </label>
           <label className="checkbox-container">
             ONG
             <input
               type="checkbox"
               checked={isONG}
               onChange={() => setIsONG(!isONG)}
             />
             <span className="checkmark"></span>
           </label>
         </div>
         <button type="submit" className="login-button">Iniciar</button>
         <div className="register-link ">
             <span>¿Ya tienes una cuenta?</span>
             <Link to="/login" className="link-underline"> Iniciar sesión</Link>
           </div>
       </form>
     </div>
    </div>
   );
 };

export default SignUp;


// import React, { useState } from 'react';
// import '../../assets/styles/Home.css';
// import '../../assets/styles/Login.css';
// import Logo from '../../assets/images/logo.svg';
// import { Link } from 'react-router-dom';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// const SignUp = () => {
//  const [name, setName] = useState('');
//   const [organization, setOrganization] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [hasPermissions, setHasPermissions] = useState(false);
//   const [isONG, setIsONG] = useState(false);
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [passwordError, setPasswordError] = useState(false); 


//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Comienza por restablecer los estados de error
//     setPasswordError(false);
//     setErrorMessage('');

//     // Luego, haz la validación
//     if (password !== confirmPassword) {
//       // Si las contraseñas no coinciden, configura el estado de error de contraseña y establece un mensaje de error
//       setPasswordError(true);
//       setErrorMessage('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
//     } else {
//       // Si las contraseñas coinciden, procede con el envío de los datos o la siguiente lógica
//       console.log({ name, organization, email, password, confirmPassword, hasPermissions, isONG });
//       // Aquí iría la lógica para manejar la creación de la cuenta exitosa
//     }
//   };


//   const handleInputChange = (event, setter) => {
//     setter(event.target.value);
//   };



//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
//   };



// return (
//     <div className="common-container">
//       <div className="logo-background">
//         <img src={Logo} alt="Logo" className="logo" />
//       </div>
//       <div className="login-container">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2>Crear cuenta</h2>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => handleInputChange(e, setName)}
//           placeholder="Nombre"
//           required
//         />
//         <input
//           type="text"
//           value={organization}
//           onChange={(e) => handleInputChange(e, setOrganization)}
//           placeholder="Organización"
//           required
//         />
//         <input
//           id="email-input"
//           type="email"
//           value={email}
//           onChange={(e) => handleInputChange(e, setEmail)}
//           placeholder="Correo electrónico"
//           required
//         />
//         <div className="input-group">
//             <input
//             type={isPasswordVisible ? 'text' : 'password'}
//             value={password}
//             onChange={(e) => handleInputChange(e, setPassword)}
//             placeholder="Contraseña"
//             required
//             className={passwordError ? 'input-error' : ''}
//         />
//           <FontAwesomeIcon
//             icon={isPasswordVisible ? faEyeSlash : faEye}
//             onClick={togglePasswordVisibility}
//             className="password-icon"
//           />
//         </div>
        
//         <div className="input-group">
//             <input
//             type={isConfirmPasswordVisible ? 'text' : 'password'}
//             value={confirmPassword}
//             onChange={(e) => handleInputChange(e, setConfirmPassword)}
//             placeholder="Confirmar Contraseña"
//             required
//             className={passwordError ? 'input-error' : ''}
//         />
//           <FontAwesomeIcon
//             icon={isConfirmPasswordVisible ? faEyeSlash : faEye}
//             onClick={toggleConfirmPasswordVisibility}
//             className="password-icon"
//           />
//         </div>
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
//         <div className="checkbox-group">
//           <label className="checkbox-container">
//             Permisos
//             <input
//               type="checkbox"
//               checked={hasPermissions}
//               onChange={() => setHasPermissions(!hasPermissions)}
//             />
//             <span className="checkmark"></span>
//           </label>
//           <label className="checkbox-container">
//             ONG
//             <input
//               type="checkbox"
//               checked={isONG}
//               onChange={() => setIsONG(!isONG)}
//             />
//             <span className="checkmark"></span>
//           </label>
//         </div>
//         <button type="submit" className="login-button">Iniciar</button>
//         <div className="register-link ">
//             <span>¿Ya tienes una cuenta?</span>
//             <Link to="/login" className="link-underline"> Iniciar sesión</Link>
//           </div>
//       </form>
//     </div>
//    </div>
//   );
// };

// export default SignUp;
