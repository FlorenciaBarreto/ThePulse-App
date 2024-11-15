
// import React, { useState } from 'react';
// import '../../../assets/styles/Survey.css';
// // import Logo from '../../assets/images/logo_w.png';
// import * as XLSX from 'xlsx';
// import { useTemplate } from '../../../assets/js/TemplateContext';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFolder } from '@fortawesome/free-solid-svg-icons';

// const CreateTemplateStep0 = ({ onSurveyCreate, templateName }) => {
//   const { updateParticipantes,updateFechaInicio, updateFechaFin } = useTemplate();
//   const [participantes, setParticipantes] = useState([]);
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

//   const handleFechaInicioChange = (e) => {
//     setFechaInicio(e.target.value);
//     updateFechaInicio(e.target.value);
//   };

//   const handleFechaFinChange = (e) => {
//     updateFechaFin(e.target.value);
//     setFechaFin(e.target.value);
//   };
  
//   const handleSubmit = (event) => {
//     event.preventDefault(); // Esto previene la recarga de la página por defecto
//     console.log('Plantilla seleccionada:', templateName, 'Participante seleccionado:');
    
//     onSurveyCreate({

//       fechaInicio,
//       fechaFin,
//     });
//   };

//    return (
//     <div className="container-create-survey">
//       <div className="form-container">
//         <form className="create-diagnostic-form">
//           <h2>{templateName}</h2> {/* Usa el nombre de la plantilla aquí */}

//           {/* Selector de participantes */}
//           <div className="form-group">
//               <select>
//                 <option value="">Participantes</option>
//                 {participantes.map((email, index) => (
//                   <option key={index} value={email}>{email}</option>
//                 ))}
//               </select>
//               <span className="participant-count">{participantes.length || ''}</span>
//             </div>

//           {/* Botón de importación de participantes */}
//           <div className="form-group">
//             <button type="button" className="import-participants-btn">Importar participantes</button>
//             <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
//           </div>

//           {/* Campos de fecha */}
//           <div className="date-fields">
//             <div className="form-group">
//               <h5>Fecha inicio</h5>
//               <input type="date" value={fechaInicio} onChange={handleFechaInicioChange} />
//             </div>
//             <div className="form-group">
//               <h5>Fecha fin</h5>
//               <input type="date" value={fechaFin} onChange={handleFechaFinChange} />
//             </div>
//           </div>

//           {/* Área de opinión */}
//           <div className="form-group">
//             <textarea placeholder="Opinión..."></textarea>
//           </div>

//           {/* Botón de inicio */}
//           <div className="form-group">
//             <button type="submit" className="start-btn" onClick={handleSubmit}>Iniciar</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateTemplateStep0;


import React, { useState, useRef } from 'react';
// Asegúrate de incluir useRef de React para poder utilizar referencias
import '../../../assets/styles/Survey.css';
// import Logo from '../../assets/images/logo_w.png';
import * as XLSX from 'xlsx';
import { useTemplate } from '../../../assets/js/TemplateContext';

const CreateTemplateStep0 = ({ onSurveyCreate, templateName }) => {
  const { updateParticipantes, updateFechaInicio, updateFechaFin } = useTemplate();
  const [participantes, setParticipantes] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const fileInputRef = useRef(null); // Referencia para el input de archivo
  const [emails, setEmails] = useState([]);
  const [telefonos, setTelefonos] = useState([]);
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    // Extraemos emails y teléfonos
    const emailsExtraidos = jsonData.map(row => row.Email).filter(email => email);
    const telefonosExtraidos = jsonData.map(row => row.Telefono).filter(telefono => telefono);
    alert("SONN:  "+telefonosExtraidos);
    console.log("%j", telefonosExtraidos);

    setEmails(emailsExtraidos);
    setTelefonos(telefonosExtraidos); // Actualizamos el estado de los teléfonos
    // Actualizamos el contexto con ambos, aunque solo mostraremos emails en la interfaz
    updateParticipantes({ emails: emailsExtraidos, telefonos: telefonosExtraidos });
  };

  const handleFechaInicioChange = (e) => {
    setFechaInicio(e.target.value);
    updateFechaInicio(e.target.value);
  };

  const handleFechaFinChange = (e) => {
    updateFechaFin(e.target.value);
    setFechaFin(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if ( !fechaInicio.trim() || !fechaFin.trim()) {
      setIsSubmitAttempted(true);
      return; // Detiene el envío del formulario
    }
    console.log('Plantilla seleccionada:', templateName, 'Participantes seleccionados:', participantes, 'Fecha inicio:', fechaInicio, 'Fecha fin:', fechaFin);
    
    onSurveyCreate({
      fechaInicio,
      fechaFin,
    });
  };

  const triggerFileInput = () => {
    // Muestra un mensaje explicativo
    const confirm = window.confirm("Por favor, asegúrate de que el archivo Excel contenga dos columnas: una para 'Email' y otra para 'Telefono'.");
    if (confirm) {
      fileInputRef.current.click(); // Desencadena el clic en el input de archivo solo si el usuario acepta
    }
  };
  

  return (
    <div className="container-create-survey">
      <div className="form-container">
        <form className="create-diagnostic-form">
          <h2>{templateName}</h2>

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
            <button type="button" className="import-participants-btn" onClick={triggerFileInput}>Importar participantes</button>
            <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" style={{display: 'none'}} ref={fileInputRef} />
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
            <button type="submit" className="start-btn" onClick={handleSubmit}>Iniciar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplateStep0;
