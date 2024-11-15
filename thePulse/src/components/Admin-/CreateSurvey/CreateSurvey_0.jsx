// import React, { useState } from 'react';
// import '../../../assets/styles/Survey.css';
// // import Logo from '../../assets/images/logo_w.png'; 
// import * as XLSX from 'xlsx';
// import { useSurvey } from '../../../assets/js/SurveyContext';


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFolder } from '@fortawesome/free-solid-svg-icons';

// const CreateSurvey = ({ onSurveyCreate }) => {
//   const {
//     diagnosticName,
//     setDiagnosticName,
//     updateParticipantes
//   } = useSurvey();

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     const data = await file.arrayBuffer();
//     const workbook = XLSX.read(data);
    
//     // Asumiendo que el correo está en la primera hoja y en la columna 'Email'
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);
//     const emails = jsonData.map(row => row.Email).filter(email => email);
//     updateParticipantes(emails);
//     console.log(emails); // Hacer algo con los correos electrónicos, como actualizar el estado o enviarlos a la API
//   };


//   const handleDiagnosticNameChange = (event) => {
//     setDiagnosticName(event.target.value);
//   };



//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Diagnóstico creado con:', diagnosticName);
//     // Procesar los datos del formulario como sea necesario
    
//     onSurveyCreate(); // Call the passed handler
//   };



//   return (
//     <div className="container-create-survey">
//       {/* <div className="logo-background">
//         <img src={Logo} alt="Logo" className="logo" />
//       </div> */}
//       <div className="form-container">
//         <form className="create-diagnostic-form" onSubmit={handleSubmit}>
//           <h2>Crear diagnóstico</h2>
//             <div className="form-group">
//               <input
//                 id="diagnosticName"
//                 type="text"
//                 placeholder="Nombre diagnóstico"
//                 value={diagnosticName}
//                 onChange={handleDiagnosticNameChange}
//               />
//             </div>
//             <div className="form-group">
//               <select>
//                 <option value="">Participantes</option>
//                 {/* Agrega las opciones de participantes aquí */}
//               </select>
//               <span className="participant-count">o</span> {/* Actualizar con el recuento real */}
//             </div>

//             <div className="form-group">
//               <button type="button" className="import-participants-btn">Importar participantes</button>
//               <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
//             </div>
          
//           <div className="form-group">
//             <textarea id="opinion" placeholder="Opinión..."></textarea>
//           </div>
//           <button type="submit" className="start-button">Iniciar</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateSurvey;


// import React, { useState } from 'react';
// // import '../../../assets/styles/Survey.css';
// // import Logo from '../../assets/images/logo_w.png'; 
// import * as XLSX from 'xlsx';
// import { useSurvey } from '../../../assets/js/SurveyContext';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faFolder } from '@fortawesome/free-solid-svg-icons';

// const CreateSurvey = ({ onSurveyCreate }) => {
//   const {
//     diagnosticName,
//     setDiagnosticName,
//     updateParticipantes,
//     updateFechaInicio, 
//     updateFechaFin  // Asegúrate de que esta función actualiza el estado global si es necesario
//   } = useSurvey();

//   const [participantes, setParticipantes] = useState([]); // Estado local para participantes
//   const [fechaInicio, setFechaInicio] = useState('');
//   const [fechaFin, setFechaFin] = useState('');
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     const data = await file.arrayBuffer();
//     const workbook = XLSX.read(data);
    
//     // Asumiendo que el correo está en la primera hoja y en la columna 'Email'
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);
//     const emails = jsonData.map(row => row.Email).filter(email => email);
    
//     setParticipantes(emails); // Actualiza el estado local con los emails extraídos
//     updateParticipantes(emails); // Actualiza el estado global si es necesario
//     console.log(emails);
//   };

//   const handleDiagnosticNameChange = (event) => {
//     setDiagnosticName(event.target.value);
//   };

//   const handleFechaInicioChange = (e) => {
//     setFechaInicio(e.target.value);
//     updateFechaInicio(e.target.value);
//   };

//   const handleFechaFinChange = (e) => {
//     updateFechaFin(e.target.value);
//     setFechaFin(e.target.value);
//   };
  

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Diagnóstico creado con:', diagnosticName);
//     onSurveyCreate();
//   };

//   return (
//     <div className="container-create-survey">
//       <div className="form-container">
//         <form className="create-diagnostic-form" onSubmit={handleSubmit}>
//           <h2>Crear diagnóstico</h2>
//             <div className="form-group">
//               <input
//                 id="diagnosticName"
//                 type="text"
//                 placeholder="Nombre diagnóstico"
//                 value={diagnosticName}
//                 onChange={handleDiagnosticNameChange}
//               />
//             </div>
//             <div className="form-group">
//               <select>
//                 <option value="">Participantes</option>
//                 {participantes.map((email, index) => (
//                   <option key={index} value={email}>{email}</option>
//                 ))}
//               </select>
//               <span className="participant-count">{participantes.length || ''}</span>
//             </div>

//             <div className="form-group">
//               <button type="button" className="import-participants-btn">Importar participantes</button>
//               <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
//             </div>
          
//             <div className="form-group">
//               <textarea id="opinion" placeholder="Opinión..."></textarea>
//             </div>
//             {/* Campos de fecha */}
//             <div className="date-fields">
//               <div className="form-group">
//                 <h5>Fecha inicio</h5>
//                 <input type="date" value={fechaInicio} onChange={handleFechaInicioChange} />
//               </div>
//               <div className="form-group">
//                 <h5>Fecha fin</h5>
//                 <input type="date" value={fechaFin} onChange={handleFechaFinChange} />
//               </div>
//             </div>

//           <button type="submit" className="start-button">Iniciar</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateSurvey;


// import React, { useState, useRef } from 'react';
// // import '../../../assets/styles/Survey.css';
// import * as XLSX from 'xlsx';
// import { useSurvey } from '../../../assets/js/SurveyContext';

// const CreateSurvey = ({ onSurveyCreate }) => {
//   const {
//     diagnosticName,
//     setDiagnosticName,
//     updateParticipantes,
//     updateFechaInicio, 
//     updateFechaFin
//   } = useSurvey();

//   const [participantes, setParticipantes] = useState([]);
//   const [fechaInicio, setFechaInicio] = useState('');
//   const [fechaFin, setFechaFin] = useState('');
//   const fileInputRef = useRef(null); // Ref para el input de archivo

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return; // Asegura que un archivo fue seleccionado
//     const data = await file.arrayBuffer();
//     const workbook = XLSX.read(data);
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);
//     const emails = jsonData.map(row => row.Email).filter(email => email);
    
//     setParticipantes(emails);
//     updateParticipantes(emails);
//   };

//   const handleDiagnosticNameChange = (event) => {
//     setDiagnosticName(event.target.value);
//   };

//   const handleFechaInicioChange = (e) => {
//     setFechaInicio(e.target.value);
//     updateFechaInicio(e.target.value);
//   };

//   const handleFechaFinChange = (e) => {
//     updateFechaFin(e.target.value);
//     setFechaFin(e.target.value);
//   };
  
//   const triggerFileInputClick = () => {
//     fileInputRef.current.click(); // Desencadena el clic en el input de archivo
//   };


//    const handleSubmit = (event) => {
//      event.preventDefault();
//      console.log('Diagnóstico creado con:', diagnosticName);
//      // Procesar los datos del formulario como sea necesario
    
//      onSurveyCreate(); // Call the passed handler
//    };


//   return (
//     <div className="container-create-survey">
//       <div className="form-container">
//         <form className="create-diagnostic-form" onSubmit={handleSubmit}>
//           <h2>Crear diagnóstico</h2>
//             <div className="form-group">
//               <input
//                 type="text"
//                 placeholder="Nombre diagnóstico"
//                 value={diagnosticName}
//                 onChange={handleDiagnosticNameChange}
//               />
//             </div>
//             <div className="form-group">
//               <select>
//                 <option value="">Participantes</option>
//                 {participantes.map((email, index) => (
//                   <option key={index} value={email}>{email}</option>
//                 ))}
//               </select>
//               <span className="participant-count">{participantes.length || ''}</span>
//             </div>

//             <div className="form-group">
//               <button type="button" className="import-participants-btn" onClick={triggerFileInputClick}>Importar participantes</button>
//               <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".xlsx, .xls" style={{display: 'none'}} />
//             </div>
          
//             <div className="form-group">
//               <textarea placeholder="Opinión..."></textarea>
//             </div>
//             <div className="date-fields">
//               <div className="form-group">
//                 <h5>Fecha inicio</h5>
//                 <input type="date" value={fechaInicio} onChange={handleFechaInicioChange} />
//               </div>
//               <div className="form-group">
//                 <h5>Fecha fin</h5>
//                 <input type="date" value={fechaFin} onChange={handleFechaFinChange} />
//               </div>
//             </div>

//           <button type="submit" className="start-button">Iniciar</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateSurvey;


import React, { useState, useRef } from 'react';
// import '../../../assets/styles/Survey.css';
import * as XLSX from 'xlsx';
import { useSurvey } from '../../../assets/js/SurveyContext';

const CreateSurvey = ({ onSurveyCreate }) => {
  const {
    diagnosticName,
    setDiagnosticName,
    updateParticipantes,
    updateFechaInicio, 
    updateFechaFin
  } = useSurvey();

  const [participantes, setParticipantes] = useState([]);
  const [emails, setEmails] = useState([]);
  const [telefonos, setTelefonos] = useState([]); // Nuevo estado para los teléfonos
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const fileInputRef = useRef(null);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    // Extracción separada de emails y teléfonos
    const emailsExtraidos = jsonData.map(row => row.Email).filter(email => email);
    const telefonosExtraidos = jsonData.map(row => row.Telefono).filter(telefono => telefono);
    
    setEmails(emailsExtraidos);
    setTelefonos(telefonosExtraidos); // No se mostrarán en la interfaz pero estarán disponibles para enviar a donde se requieran
    
    // Aquí actualizas el contexto o estado global si es necesario
    updateParticipantes({ emails: emailsExtraidos, telefonos: telefonosExtraidos });
    
    console.log("Emails extraídos", emailsExtraidos);
    console.log("Teléfonos extraídos", telefonosExtraidos);
  };

  const handleDiagnosticNameChange = (event) => {
    setDiagnosticName(event.target.value);
  };

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
    updateFechaInicio(e.target.value);
  };

  const handleFechaFinChange = (e) => {
    updateFechaFin(e.target.value);
    setFechaFin(e.target.value);
  };
  
  const triggerFileInputClick = () => {
    const confirm = window.confirm("Por favor, asegúrate de que el archivo Excel contenga dos columnas: una para 'Email' y otra para 'Telefono'.");
    if (confirm) {
      fileInputRef.current.click(); // Desencadena el clic en el input de archivo solo si el usuario acepta
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Verifica si todos los campos requeridos están llenos
    if (!diagnosticName.trim() ||  !fechaInicio.trim() || !fechaFin.trim()) {
      setIsSubmitAttempted(true);
      return; // Detiene el envío del formulario
    }
    
    console.log('Diagnóstico creado con:', diagnosticName);
    // Procesar los datos del formulario como sea necesario
    onSurveyCreate(); // Llama al manejador pasado
  };
  


  return (
    <div className="container-create-survey">
      <div className="form-container">
        <form className="create-diagnostic-form" onSubmit={handleSubmit}>
          <h2>Crear diagnóstico</h2>
            <div className="form-group">
              <input
                type="text"
                placeholder="Nombre diagnóstico"
                value={diagnosticName}
                onChange={handleDiagnosticNameChange}
                style={{ border: isSubmitAttempted && !diagnosticName.trim() ? '2px solid red' : '' }}
              />
            </div>
            <div className="form-group">
              <select>
                <option value="">Participantes</option>
                {emails.map((email, index) => (
                  <option key={index} value={email}>{email}</option>
                ))}
              </select>
              <span className="participant-count">{emails.length || ''}</span>
            </div>

            <div className="form-group">
              <button type="button" className="import-participants-btn" onClick={triggerFileInputClick}>Importar participantes</button>
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".xlsx, .xls" style={{display: 'none'}} />
            </div>
          

            <div className="date-fields">
              <div className="form-group">
                <h5>Fecha inicio</h5>
                <input type="date" value={fechaInicio} onChange={handleFechaInicioChange} style={{ border: isSubmitAttempted && !fechaInicio.trim() ? '2px solid red' : '' }} />
              </div>
              <div className="form-group">
                <h5>Fecha fin</h5>
                <input type="date" value={fechaFin} onChange={handleFechaFinChange} style={{ border: isSubmitAttempted && !fechaFin.trim() ? '2px solid red' : '' }} />
              </div>
            </div>

          
          <div className="form-group">
          <button type="submit" className="start-btn">Iniciar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSurvey;