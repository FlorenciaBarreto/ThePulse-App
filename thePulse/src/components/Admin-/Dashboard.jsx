// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../../assets/styles/Dashboard.css';
// import '../../assets/styles/Survey.css';
// import WhiteSpace from '../Whitespace';

// const Dashboard = () => {
//     const [surveys, setSurveys] = useState([]);
//     const [selectedSurveyId, setSelectedSurveyId] = useState(null);
//     const [userName, setUserName] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchSurveys();
//         fetchUserDetails(); // Asegúrate de llamar a esta función para obtener el nombre del usuario
//     }, []);
    

//     const handleCreateNew = () => {
//         navigate('/choose'); // Redireccionar al usuario a /choose
//     };
//     const fetchSurveys = async () => {
//         try {
//             // Suponiendo que el token JWT esté almacenado en localStorage después del login
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('No se encontró el token de autenticación.');
//             }
            
//             // No necesitas el userId en el frontend. El backend lo deducirá del token.
//             const response = await fetch('http://localhost:3001/encuestas', {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error('Error al recuperar las encuestas');
//             }
    
//             const surveys = await response.json();
//             setSurveys(surveys);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };
    
//     const fetchUserDetails = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('No se encontró el token de autenticación.');
//             }

//             const response = await fetch('http://localhost:3001/usuario', {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Error al recuperar los detalles del usuario');
//             }

//             const userDetails = await response.json();
//             setUserName(userDetails.name); // Asumiendo que la respuesta incluye un campo 'nombre'
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const handleSurveyClick = (id) => {
//         // Si el ID de la encuesta seleccionada coincide con el ID de la encuesta actualmente seleccionada,
//         // cambia el estado para deseleccionarla; de lo contrario, selecciona la nueva encuesta
//         setSelectedSurveyId(prevId => (prevId === id ? null : id));
//     };

//     const handleModify = (id) => {
//         // Implementa la lógica para modificar la encuesta con el ID proporcionado
//     };

//     const handleDelete = (id) => {
//         // Implementa la lógica para borrar la encuesta con el ID proporcionado
//     };

//     const handleViewResults = (id) => {
//         // Implementa la lógica para ver los resultados de la encuesta con el ID proporcionado
//     };

//     return (
//         <div className="home-container">
//           <h2>Dashboard</h2>
//           <div className="dashboard-container">
//           <h1>Bienvenida/o de nuevo, {userName}!</h1> 
//             <button onClick={handleCreateNew}>Crear nuevo diagnóstico</button>
//             <WhiteSpace size="medium" />
//             {surveys.length > 0 ? (
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Título</th>
//                     <th>PIN</th>
//                     <th>Acciones</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {surveys.map((survey) => (
//                     <React.Fragment key={survey.id}>
//                       <tr onClick={() => handleSurveyClick(survey.id)}>
//                         <td>{survey.titulo}</td>
//                         <td>{survey.pin}</td>
//                         <td>
//                           <button onClick={() => handleDelete(survey.id)}>Borrar</button>
//                           <button onClick={() => handleViewResults(survey.id)}>Ver Resultados</button>
//                           <button onClick={() => handleViewResults(survey.id)}>Participantes</button>
//                           <button onClick={() => handleViewResults(survey.id)}>Compartir</button>
//                         </td>
//                       </tr>
//                       {selectedSurveyId === survey.id && (
//                         <tr>
//                           <td colSpan="3">
//                             <p>Preguntas:</p>
//                             <ul>
//                               {survey.preguntas && survey.preguntas.length > 0 ? (
//                                 survey.preguntas.map((pregunta) => (
//                                   <li key={pregunta.id}>
//                                     {pregunta.pregunta} - Tipo: {pregunta.tipo}
//                                     {pregunta.tipo === 'closed' && pregunta.opciones && (
//                                       <div>Opciones: {pregunta.opciones.join(', ')}</div>
//                                     )}
//                                   </li>
//                                 ))
//                               ) : (
//                                 <p>No hay preguntas disponibles para esta encuesta.</p>
//                               )}
//                             </ul>
//                           </td>
//                         </tr>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>No hay encuestas disponibles.</p>
//             )}
//           </div>   
//         </div>
//       );
      
// };

// export default Dashboard;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../../assets/styles/Dashboard.css';
// import '../../assets/styles/Survey.css';
// import WhiteSpace from '../Whitespace';
// import CircularProgressBar from './CircleProgressBar'; // Ajusta la ruta según sea necesario



// const Dashboard = () => {
//     const [surveys, setSurveys] = useState([]);
//     const [selectedSurveyId, setSelectedSurveyId] = useState(null);
//     const [userName, setUserName] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchSurveys();
//         fetchUserDetails(); // Asegúrate de llamar a esta función para obtener el nombre del usuario
//     }, []);
    

//     const handleCreateNew = () => {
//         navigate('/choose'); // Redireccionar al usuario a /choose
//     };
//     const fetchSurveys = async () => {
//         try {
//             // Suponiendo que el token JWT esté almacenado en localStorage después del login
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('No se encontró el token de autenticación.');
//             }
            
//             // No necesitas el userId en el frontend. El backend lo deducirá del token.
//             const response = await fetch('http://localhost:3001/encuestas', {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error('Error al recuperar las encuestas');
//             }
    
//             const surveys = await response.json();
//             console.log(surveys); 
//             setSurveys(surveys);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };
    
//     const fetchUserDetails = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('No se encontró el token de autenticación.');
//             }

//             const response = await fetch('http://localhost:3001/usuario', {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Error al recuperar los detalles del usuario');
//             }

//             const userDetails = await response.json();
//             setUserName(userDetails.name); // Asumiendo que la respuesta incluye un campo 'nombre'
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const handleSurveyClick = (id) => {
//         // Si el ID de la encuesta seleccionada coincide con el ID de la encuesta actualmente seleccionada,
//         // cambia el estado para deseleccionarla; de lo contrario, selecciona la nueva encuesta
//         setSelectedSurveyId(prevId => (prevId === id ? null : id));
//     };

//     const handleModify = (id) => {
//         // Implementa la lógica para modificar la encuesta con el ID proporcionado
//     };

//     const handleDelete = (id) => {
//         // Implementa la lógica para borrar la encuesta con el ID proporcionado
//     };

//     const handleViewResults = (id) => {
//         // Implementa la lógica para ver los resultados de la encuesta con el ID proporcionado
//     };

//     return (
//         <div className="home-container">
//           <h2>Dashboard</h2>
//           <div className="dashboard-container">
//           <h1>Bienvenida/o de nuevo, {userName}!</h1> 
//             <button onClick={handleCreateNew}>Crear nuevo diagnóstico</button>
//             <WhiteSpace size="medium" />
//             {surveys.length > 0 ? (
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Título</th>
//                     <th>PIN</th>
//                     <th>Participantes</th>
//                     <th>Respuestas</th>
//                     <th>Fecha Inicio</th>
//                     <th>Fecha Fin</th>
//                     <th>Acciones</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {surveys.map((survey) => (
//                     <React.Fragment key={survey.id}>
//                         <tr onClick={() => handleSurveyClick(survey.id)}>
//                         <td>{survey.titulo}</td>
//                         <td>{survey.pin}</td>
//                         <td className="participantes">{survey.participantes}</td>
//                         <td className="participantes">
//                         <CircularProgressBar progress={survey.participantes} />
//                         </td>
//                         <td>{new Date(survey.fecha_inicio).toLocaleDateString()}</td> 
//                         <td>{new Date(survey.fecha_fin).toLocaleDateString()}</td>
//                         <td style={{display:'flex', alignItems:'center'}}>
//                           <button onClick={() => handleViewResults(survey.id)}>Compartir</button>
//                           <button onClick={() => handleViewResults(survey.id)}>Resultados</button>
//                           {/* <button onClick={() => handleDelete(survey.id)}>Borrar</button> */}
//                           <button onClick={() => handleDelete(survey.id)} 
//                                   style={{ 
//                                     color: 'red', 
//                                     backgroundColor: 'transparent', 
//                                     fontWeight: 'bold', 
//                                     borderRadius: '50%', 
//                                     width: '30px', 
//                                     height: '30px', 
//                                     display: 'flex', 
//                                     alignItems: 'center', 
//                                     justifyContent: 'center',
//                                     border: 'none',
//                                     cursor: 'pointer'
//                                   }}>
//                             X
//                           </button>
//                         </td>
//                       </tr>
//                       {/* {selectedSurveyId === survey.id && (
//                         <tr>
//                           <td colSpan="3">
//                             <p>Preguntas:</p>
//                             <ul>
//                               {survey.preguntas && survey.preguntas.length > 0 ? (
//                                 survey.preguntas.map((pregunta) => (
//                                   <li key={pregunta.id}>
//                                     {pregunta.pregunta} - Tipo: {pregunta.tipo}
//                                     {pregunta.tipo === 'closed' && pregunta.opciones && (
//                                       <div>Opciones: {pregunta.opciones.join(', ')}</div>
//                                     )}
//                                   </li>
//                                 ))
//                               ) : (
//                                 <p>No hay preguntas disponibles para esta encuesta.</p>
//                               )}
//                             </ul>
//                           </td>
//                         </tr>
//                       )} */}
//                     </React.Fragment>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>No hay encuestas disponibles.</p>
//             )}
//           </div>   
//         </div>
//       );
      
// };

// export default Dashboard;



import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Dashboard.css';
import '../../assets/styles/Survey.css';
import WhiteSpace from '../Whitespace';
import CircularProgressBar from './CircleProgressBar'; // Ajusta la ruta según sea necesario
import * as XLSX from 'xlsx';








const Dashboard = () => {
    const [surveys, setSurveys] = useState([]);
    const [selectedSurveyId, setSelectedSurveyId] = useState(null);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isShareModalOpen2, setIsShareModalOpen2] = useState(false);
    const [currentPin, setCurrentPin] = useState('');
    const [currentTitulo, setCurrentTitulo] = useState('');
    const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [concept, setconcept] = useState('');
    const [wordCloudUrl, setWordCloudUrl] = useState('');
    const [emotionAnalysisUrl, setemotionAnalysisUrl] = useState('');
    const [conclusion, setConclusion] = useState('');
    const fileInputRef = useRef(null);
  
    const handleShareClick = (survey) => {
      if (survey.num_participantes === 0) {
        setSelectedSurveyId(survey.id_encuesta);
        console.log("Survey id", survey.id_encuesta)
        console.log("Tu put amadre", selectedSurveyId) // Asegúrate de usar la propiedad correcta
        setIsImportModalOpen(true);
      } else {
        setCurrentPin(survey.pin); // Preparar PIN para modal de compartir
        setIsShareModalOpen(true); // Mostrar modal de compartir si ya hay participantes
      }
    };
    

    const handleDelete = (survey) => {
      setCurrentPin(survey.pin); // Preparar PIN para modal de compartir
      setCurrentTitulo(survey.titulo);
      setIsShareModalOpen2(true);
  };

  const handleViewResults = (survey) => {
    console.log("Survey ID seleccionado:", survey.id_encuesta);
    setSelectedSurveyId(survey.id_encuesta);
    setIsResultsModalOpen(true);
    manejarResultados();
  };
  /*
  const handleViewResults = (survey) => {
    // Envía el id_encuesta a la API
    console.log("Survey id:", survey.id_encuesta);
  
    // Llama a la API
    fetch('http://localhost:3001/enviar-id-encuesta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_encuesta: survey.id_encuesta }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Gráficas generadas:", data);
      })
      .catch((error) => {
        console.error('Error al generar las gráficas:', error);
      });
  };*/

  const actualizarGraficas = async () => {
    console.log("ID de la encuesta seleccionada:", selectedSurveyId); // Verificar si el ID está establecido
  
    if (!selectedSurveyId) {
      console.error("No hay ID de encuesta seleccionado");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/graficas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_encuesta: selectedSurveyId }),
      });
      const data = await response.json();
      console.log('Datos procesados de la respuesta:', data);
  
      setImageUrl(data.imageUrl);
      setWordCloudUrl(data.wordCloudUrl);
      setemotionAnalysisUrl(data.emotionAnalysisUrl);
      setConclusion(data.conclusion);
    } catch (error) {
      console.error('Error al actualizar las gráficas:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const ResultsModal = ({ isOpen, onClose, actualizarGraficas, loading, imageUrl, concept, wordCloudUrl, emotionAnalysisUrl, conclusion }) => {
    return isOpen ? (
      <div className="modal-background">
        <div className="modal-content">
          <h2>Gráfica de Respuestas</h2>
          <button onClick={actualizarGraficas} disabled={loading}>
            {loading ? 'Actualizando gráficas...' : 'Actualizar gráficas'}
          </button>
          {imageUrl && <img src={imageUrl} alt="Gráfica actualizada" className="modal-image" />}
          {concept && <img src={concept} alt="Gráfica actualizada" className="modal-image" />}
          {wordCloudUrl && <img src={wordCloudUrl} alt="Nube de palabras actualizada" className="modal-image" />}
          {emotionAnalysisUrl && <img src={emotionAnalysisUrl} alt="Conceptos actualizados" className="modal-image" />}
          <h2>Conclusión del Análisis de Respuestas Abiertas</h2>
          <p>{conclusion}</p>
          <button onClick={onClose}>Cerrar</button>
          <button onClick={handleDescargar}>Descargar PDF</button>
        </div>
      </div>
    ) : null;
  };

  const handleDescargar = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/generar_pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Añadimos el encabezado Content-Type
        },
        body: JSON.stringify({}), // Envía un cuerpo vacío como JSON
      });
  
      if (!response.ok) {
        throw new Error(`Error en la descarga: ${response.statusText}`);
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte_respuestas.pdf'); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };
  
    
    useEffect(() => {
        fetchSurveys();
        fetchUserDetails(); // Asegúrate de llamar a esta función para obtener el nombre del usuario
    }, []);
    

    const handleCreateNew = () => {
        navigate('/choose'); // Redireccionar al usuario a /choose
    };
    const fetchSurveys = async () => {
        try {
            // Suponiendo que el token JWT esté almacenado en localStorage después del login
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No se encontró el token de autenticación.');
            }
            
            // No necesitas el userId en el frontend. El backend lo deducirá del token.
            const response = await fetch('http://localhost:3001/encuestas', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Error al recuperar las encuestas');
            }
    
            const surveys = await response.json();
            console.log(surveys); 
            setSurveys(surveys);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const fetchUserDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No se encontró el token de autenticación.');
            }

            const response = await fetch('http://localhost:3001/usuario', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al recuperar los detalles del usuario');
            }

            const userDetails = await response.json();
            setUserName(userDetails.name); // Asumiendo que la respuesta incluye un campo 'nombre'
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const manejarResultados = async () => {
      setLoading(true);
      
      try {
        // Actualiza las gráficas
        actualizarGraficas();
  
        // Llama a la API para generar y descargar el PDF
        handleDescargar();
  
      } catch (error) {
        console.error("Hubo un error al obtener los resultados", error);
      } finally {
        setLoading(false);
      }
    };
    // const handleSurveyClick = (id) => {
    //     // Si el ID de la encuesta seleccionada coincide con el ID de la encuesta actualmente seleccionada,
    //     // cambia el estado para deseleccionarla; de lo contrario, selecciona la nueva encuesta
    //     setSelectedSurveyId(prevId => (prevId === id ? null : id));
    // };


    return (
        <div className="home-container">
          <h2>Dashboard</h2>
          <ImportParticipantsModal 
            isOpen={isImportModalOpen}
            onClose={() => setIsImportModalOpen(false)}
            surveyId={selectedSurveyId} // Asegúrate de que esto se pasa correctamente
            fetchSurveys={fetchSurveys}
          />


          <ShareSurveyModal
            isOpen={isShareModalOpen} 
            onClose={() => setIsShareModalOpen(false)} 
            onConfirm={() => {/* Aquí iría la lógica para compartir la encuesta */}} 
            pin={currentPin}
          />

        <ShareSurveyModal2
            isOpen={isShareModalOpen2} 
            onClose={() => setIsShareModalOpen2(false)} 
            onConfirm={() => {/* Aquí iría la lógica para compartir la encuesta */}} 
            pin={currentPin}
            titulo={currentTitulo}
            surveyId={selectedSurveyId} // Asegúrate de que esto se pasa correctamente
            fetchSurveys={fetchSurveys}
          />
          <div className="dashboard-container">
          <h1>Bienvenida/o de nuevo, {userName}!</h1> 
            <button onClick={handleCreateNew}>Crear nuevo diagnóstico</button>
            <WhiteSpace size="medium" />
            {surveys.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>PIN</th>
                    <th>Participantes</th>
                    <th>Respuestas</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                {surveys.map((survey) => (
                <React.Fragment key={survey.id}>
                    <tr>
                    {/* <tr onClick={() => handleSurveyClick(survey.id)}> */}
                        <td>{survey.titulo}</td>
                        <td>{survey.pin}</td>
                        <td className="participantes">{survey.participantes}</td>
                        <td className="participantes">
                            <CircularProgressBar progress={survey.participantes} />
                        </td>
                        <td>{new Date(survey.fecha_inicio).toLocaleDateString()}</td> 
                        <td>{new Date(survey.fecha_fin).toLocaleDateString()}</td>
                        <td style={{display:'flex', alignItems:'center'}}>
                            <button onClick={() => handleShareClick(survey)}>Compartir</button>
                            <button onClick={() => handleViewResults(survey)}>Resultados</button>
                            {/*<ResultsModal 
                              isOpen={isResultsModalOpen} 
                              onClose={() => setIsResultsModalOpen(false)} 
                              actualizarGraficas={actualizarGraficas} 
                              loading={loading} 
                              imageUrl={imageUrl}
                              concept={concept} // Cambiar aquí si 'concept' es otra cosa
                              wordCloudUrl={wordCloudUrl}
                              emotionAnalysisUrl={emotionAnalysisUrl}
                              conclusion={conclusion}
                            >
                              {imageUrl && <img src={imageUrl} alt="Gráfica actualizada" style={{ width: '40%', maxHeight: '60px', objectFit: 'contain' }}/>}
                              {concept && <img src={concept} alt="Grafica Respuestas" style={{ width: '40%', maxHeight: '60px', objectFit: 'contain' }}/>}
                              {wordCloudUrl && <img src={wordCloudUrl} alt="Nube de palabras actualizada" style={{ width: '40%', maxHeight: '60px', objectFit: 'contain' }}/>}
                              {emotionAnalysisUrl && <img src={emotionAnalysisUrl} alt="Conceptos actualizados" style={{ width: '40%', maxHeight: '60px', objectFit: 'contain' }}/>}
                            </ResultsModal>*/}

                            
                            {/* {<button onClick={() => handleDelete(survey)}>Borrar</button> }*/}
                            <button onClick={() => handleDelete(survey)} 
                                    style={{ 
                                        color: 'red', 
                                        backgroundColor: 'transparent', 
                                        fontWeight: 'bold', 
                                        borderRadius: '50%', 
                                        width: '30px', 
                                        height: '30px', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}>
                              X
                            </button>
                        </td>
                    </tr>
                    {/* Aquí es donde quieres incluir la condición. Asegúrate de que esté correctamente formateada. */}
                    {selectedSurveyId === survey.id && (
                      <tr>
                        <td colSpan="3">
                          <p>Preguntas:</p>
                          <ul>
                            {survey.preguntas && survey.preguntas.length > 0 ? (
                              survey.preguntas.map((pregunta) => (
                                <li key={pregunta.id}>
                                  {pregunta.pregunta} - Tipo: {pregunta.tipo}
                                  {pregunta.tipo === 'closed' && pregunta.opciones && (
                                    <div>Opciones: {pregunta.opciones.join(', ')}</div>
                                  )}
                                </li>
                              ))
                            ) : (
                              <p>No hay preguntas disponibles para esta encuesta.</p>
                            )}
                          </ul>
                        </td>
                      </tr>
                    )}
                </React.Fragment>
              ))}

                </tbody>
              </table>
            ) : (
              <p>No hay encuestas disponibles.</p>
            )}
          </div>   
        </div>
      );
      
};

export default Dashboard;



// Modal para importar participantes
const ImportParticipantsModal = 
(
  { isOpen, onClose, surveyId, fetchSurveys }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [internalSurveyId, setInternalSurveyId] = useState(surveyId);
  useEffect(() => {
    setInternalSurveyId(surveyId); // Actualiza el estado interno cada vez que cambie el prop surveyId
  }, [surveyId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Almacena el archivo seleccionado en el estado
    }
  };
  
  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Por favor, selecciona un archivo primero.");
      return;
    }
  
    const data = await selectedFile.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    const participantes = jsonData.map(row => ({
      email: row.Email || "",
      telefono: row.Telefono || ""
    }));
  
    // Enviar los participantes al servidor
    console.log("Survey ID en handleSubmit:", internalSurveyId); 
    await enviarParticipantesAServidor(internalSurveyId, participantes);
    fetchSurveys(); // Opcional: función para recargar las encuestas si es necesario
    onClose(); // Cierra el modal
  };
  
  const enviarParticipantesAServidor = async (surveyId, participantes) => {
    // Prepara el cuerpo de la solicitud con los arrays de emails y teléfonos
    const bodyToSend = {
      emails: participantes.map(participante => participante.email),
      telefonos: participantes.map(participante => participante.telefono),
    };
  
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No se encontró el token de autenticación.');
  
      const response = await fetch(`http://localhost:3001/api/encuestas/${surveyId}/participantes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bodyToSend),
      });
  
      if (!response.ok) throw new Error(`Error al enviar participantes: ${response.status}`);
  
      const data = await response.json();
      console.log('Participantes importados:', data);
    } catch (error) {
      console.error('Error al enviar participantes:', error);
    }
  };
  
  
  return isOpen ? (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Importar Participantes</h2>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept=".xlsx, .xls" 
          style={{ display: 'block' }} // Cambiar a 'none' si no quieres que se muestre
        />
        {/* <button onClick={() => fileInputRef.current.click()}>Cargar Excel</button> */}
        <button onClick={onClose}>Cerrar</button>
        <button onClick={handleSubmit}>Aceptar</button>

      </div>
    </div>
  ) : null;

};















// Modal para confirmar compartir encuesta
const ShareSurveyModal2 = ({ isOpen, onClose, surveyId, fetchSurveys, pin,titulo }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [internalSurveyId, setInternalSurveyId] = useState(surveyId);
  useEffect(() => {
    setInternalSurveyId(surveyId); // Actualiza el estado interno cada vez que cambie el prop surveyId
  }, [surveyId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); // Almacena el archivo seleccionado en el estado
    }
  };
  
  const handleSubmit2 = async () => {
    alert(pin);
    // Enviar los participantes al servidor
    await enviarParticipantesAServidor2( pin);
    fetchSurveys(); // Opcional: función para recargar las encuestas si es necesario
    onClose(); // Cierra el modal
  };
  
  const enviarParticipantesAServidor2 = async ( pin) => {
    alert("Este es el pin: "+pin);
    const bodyToSend = {
      pincode: pin,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No se encontró el token de autenticación.');
  
      const response = await fetch(`http://localhost:3001/api/encuestas/${pin}/encuestaeliminar`, {
      //const response = await fetch(`http://localhost:3001/api/encuestas/${pin}/encuestaeliminar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(),
      });
  
      if (!response.ok) throw new Error(`Error al enviar participantes: ${response.status}`);
  
      const data = await response.json();
      console.log('Participantes importados:', data);
    } catch (error) {
      console.error('Error al enviar participantes:', error);
    }
  };



  
  
  return isOpen ? (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Eliminar Encuesta</h2>
        <p>¿Desea eliminar la encuesta {titulo} con el número de PIN {pin} ?</p>
        <button onClick={onClose}>Cerrar</button>
        <button onClick={handleSubmit2}>Aceptar</button>

      </div>
    </div>
  ) : null;
};














// Modal para confirmar compartir encuesta
const ShareSurveyModal = ({ isOpen, onClose, onConfirm, pin }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Compartir Encuesta</h2>
        <p>Se va a compartir la encuesta con el número de PIN {pin} a los participantes.</p>
        <button onClick={onConfirm}>Aceptar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

