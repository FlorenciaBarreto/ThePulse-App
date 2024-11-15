// require('dotenv').config(); // Importa las variables de entorno
// const mysql = require('mysql');
// const express = require('express');
// const cors = require('cors');

// const app = express(); // Esta línea es necesaria para inicializar la aplicación Express

// // Habilita CORS para todas las rutas y orígenes
// app.use(cors(corsOptions));

// // Crea la conexión a la base de datos
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// });

// // Conecta a la base de datos
// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('Conectado a la base de datos MySQL');
// });

// // Middleware para parsear el cuerpo de las peticiones POST
// app.use(express.json());
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// // Ruta para manejar la creación de un usuario
// app.post('/register', (req, res) => {
//   const { name, organization, email, password, hasPermissions, isONG } = req.body;

//   // Aquí deberías hashear la contraseña antes de guardarla
//   // Por ejemplo, usando bcrypt
//   bcrypt.hash(password, saltRounds, (err, hash) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//   // Consulta SQL para insertar un nuevo usuario
//     const query = `INSERT INTO users (name, organization, email, password, has_permissions, is_ong) VALUES (?, ?, ?, ?, ?, ?)`;

//     // Ejecutar la consulta SQL
//     db.query(query, [name, organization, email, hash, hasPermissions, isONG], (err, results) => {
//         if (err) {
//         // Manejo de errores, por ejemplo, si el email ya está registrado
//         return res.status(500).send(err);
//         }
//         // Enviar respuesta de éxito
//         res.status(201).send({ message: 'Usuario registrado con éxito', userId: results.insertId });
//     });
//     });
// });



// const jwt = require('jsonwebtoken');

// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   const query = 'SELECT * FROM users WHERE email = ?';
//   db.query(query, [email], (err, results) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//     if (results.length > 0) {
//       bcrypt.compare(password, results[0].password, (error, isMatch) => {
//         if (error) {
//           return res.status(500).send(error);
//         }
//         if (isMatch) {
//           // Aquí es donde generamos el token JWT
//           const token = jwt.sign(
//             { userId: results[0].id }, // Este es el payload, puedes añadir más información del usuario aquí
//             process.env.JWT_SECRET, // La clave secreta para firmar el token
//             { expiresIn: '5m' } // Opciones del token, como su tiempo de expiración
//           );

//           res.status(200).send({ message: 'Inicio de sesión exitoso', token: token });
//         } else {
//           res.status(401).send({ message: 'Credenciales inválidas' });
//         }
//       });
//     } else {
//       res.status(404).send({ message: 'Usuario no encontrado' });
//     }
//   });
// });

// const { expressjwt: expressJwt } = require('express-jwt');

// const validarJwt = expressJwt({
//   secret: process.env.JWT_SECRET,
//   algorithms: ['HS256'],
//   requestProperty: 'auth'
// });

// app.get('/choose', validarJwt, (req, res) => {
//     // Acceso permitido, el token es válido
//     // Aquí puedes acceder a req.auth para ver los datos decodificados del token si lo necesitas
//     res.send('Acceso concedido a la ruta protegida /choose');
//   });

//   app.use((err, req, res, next) => {
//     if (err.name === 'UnauthorizedError') {
//       // 401 status code indica que la petición requiere autenticación
//       res.status(401).json({ message: 'No estás autorizado para acceder a este recurso. El token es inválido o no fue proporcionado.' });
//     } else {
//       // Otros errores inesperados
//       next(err);
//     }
//   });

// // // Parte del endpoint /login
// // app.post('/login', (req, res) => {
// //     const { email, password } = req.body;

// //     const query = 'SELECT * FROM users WHERE email = ?';
// //     db.query(query, [email], (err, results) => {
// //       if (err) {
// //         return res.status(500).send(err);
// //       }
// //       if (results.length > 0) {
// //         bcrypt.compare(password, results[0].password, (error, isMatch) => {
// //           if (error) {
// //             return res.status(500).send(error);
// //           }
// //           if (isMatch) {
// //             res.status(200).send({ message: 'Inicio de sesión exitoso' });
// //           } else {
// //             res.status(401).send({ message: 'Credenciales inválidas' });
// //           }
// //         });
// //       } else {
// //         res.status(404).send({ message: 'Usuario no encontrado' });
// //       }
// //     });
// //   });






// // Iniciar el servidor
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });




// // PRUEBA-1


// require('dotenv').config();
// const mysql = require('mysql2/promise');
// const express = require('express');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const jwt = require('jsonwebtoken');
// const { expressjwt: expressJwt } = require('express-jwt');


// // Configura la aplicación Express y CORS
// const app = express();
// app.use(cors({
//     origin: 'http://localhost:3000', // Ajusta según sea necesario
//     optionsSuccessStatus: 200
// }));
// app.use(express.json());

// // Crea el pool de conexiones a la base de datos
// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// // Ejemplo de uso del pool para una ruta de registro
// app.post('/register', async (req, res) => {
//     const { name, organization, email, password, hasPermissions, isONG } = req.body;

//     try {
//       // Hashear la contraseña con bcrypt y saltRounds definido previamente
//       const hashedPassword = await bcrypt.hash(password, saltRounds);

//       // Consulta SQL para insertar el nuevo usuario
//       // Asegúrate de que estás usando `hashedPassword` en lugar de `password`
//       const insertQuery = `
//         INSERT INTO users (name, organization, email, password, has_permissions, is_ong) 
//         VALUES (?, ?, ?, ?, ?, ?);
//       `;

//       const [results] = await pool.execute(insertQuery, [name, organization, email, hashedPassword, hasPermissions, isONG]);

//       // Enviar respuesta de éxito al cliente
//       res.status(201).json({ message: 'Usuario registrado con éxito', userId: results.insertId });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Error al registrar el usuario' });
//     }
//   });



//   app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//       const query = 'SELECT * FROM users WHERE email = ?';
//       const [results] = await pool.query(query, [email]);
//       if (results.length > 0) {
//         const isMatch = await bcrypt.compare(password, results[0].password);
//         if (isMatch) {
//           const token = jwt.sign(
//             { userId: results[0].id_usuario},
//             process.env.JWT_SECRET,
//             { expiresIn: '24h' }
//           );
//           res.status(200).send({ message: 'Inicio de sesión exitoso', token: token });
//         } else {
//           res.status(401).send({ message: 'Credenciales inválidas' });
//         }
//       } else {
//         res.status(404).send({ message: 'Usuario no encontrado' });
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).send({ message: 'Error al procesar la solicitud de inicio de sesión' });
//     }
//   });



// const validarJwt = expressJwt({
//   secret: process.env.JWT_SECRET,
//   algorithms: ['HS256'],
//   requestProperty: 'auth'
// });

// app.use(validarJwt.unless({ 
//     path: [
//       '/login', 
//       '/register', 
//       '/verifyPin'  // Agrega esta línea para permitir el acceso sin token
//     ] 
//   }));

// // app.use((req, res, next) => {
// //   console.log("Token:", req.auth); // Esto debería mostrar la información decodificada del token
// //   next();
// // });


// app.get('/choose', validarJwt, (req, res) => {
//     // Acceso permitido, el token es válido
//     // Aquí puedes acceder a req.auth para ver los datos decodificados del token si lo necesitas
//     res.send('Acceso concedido a la ruta protegida /choose');
//   });

//   app.get('/dashboard', validarJwt, (req, res) => {
//     // Si el middleware `validarJwt` pasa, el usuario está autenticado
//     // Aquí puedes añadir cualquier lógica adicional específica de la ruta `/dashboard`, si es necesario
//     res.send('Acceso concedido a la ruta protegida /dashboard');
// });

// app.get('/name', validarJwt, (req, res) => {
//     // Si el middleware `validarJwt` pasa, el usuario está autenticado
//     // Aquí puedes añadir cualquier lógica adicional específica de la ruta `/dashboard`, si es necesario
//     res.send('Acceso concedido a la ruta protegida /dashboard');
// });

//   app.use((err, req, res, next) => {
//     if (err.name === 'UnauthorizedError') {
//       // 401 status code indica que la petición requiere autenticación
//       res.status(401).json({ message: 'No estás autorizado para acceder a este recurso. El token es inválido o no fue proporcionado.' });
//     } else {
//       // Otros errores inesperados
//       next(err);
//     }
//   });




//   async function generarPin() {
//     let pin;
//     let existe;
//     do {
//       pin = Math.floor(100000 + Math.random() * 900000).toString();
//       const [rows] = await pool.query('SELECT id_encuesta FROM encuestas WHERE pin = ?', [pin]);
//       existe = rows.length > 0;
//     } while (existe);

//     return pin;
//   }


//   async function insertarEncuesta(userId, nombreEncuesta, imagenEncuesta, pin) {
//     console.log({ userId, nombreEncuesta, imagenEncuesta, pin }); // Agregar esto para depurar
//     const query = `
//         INSERT INTO encuestas (id_usuario, titulo, imagen, pin)
//         VALUES (?, ?, ?, ?);
//     `;
//     const [result] = await pool.execute(query, [userId, nombreEncuesta, imagenEncuesta, pin]);
//     return result.insertId; // Devuelve el ID de la encuesta insertada
// }


//   async function insertarPregunta(encuestaId, textoPregunta, tipoPregunta, opciones) {
//     let queryPregunta = `
//         INSERT INTO preguntas (encuesta_id, pregunta, tipo, opciones)
//         VALUES (?, ?, ?, ?);
//     `;
//     // Si el tipo de pregunta es 'closed', convertimos las opciones a JSON, de lo contrario guardamos NULL
//     let opcionesJSON = tipoPregunta === 'closed' ? JSON.stringify(opciones) : null;
//     const [result] = await pool.execute(queryPregunta, [encuestaId, textoPregunta, tipoPregunta, opcionesJSON]);
//     return result.insertId; // Devuelve el ID de la pregunta insertada
//   }






//   // Crear una nueva encuesta
//   app.post('/encuestas', validarJwt, async (req, res) => {
//     let connection;
//     const userId = req.auth.userId;
//     console.log("Hola:", req.auth.userId)
//     const { nombreEncuesta, imagenEncuesta, preguntas } = req.body; // Asegúrate de que las variables estén definidas

//     console.log(userId)
//     try {
//       connection = await pool.getConnection(); 
//       await connection.beginTransaction();

//       const pin = await generarPin(); // Esta función debe generar un PIN único
//       // Supongamos que insertas la encuesta y obtienes su ID
//       const encuestaId = await insertarEncuesta(userId, nombreEncuesta, imagenEncuesta, pin);

//       // Ahora insertamos las preguntas asociadas a la encuesta
//       for (const pregunta of preguntas) {
//         await insertarPregunta(encuestaId, pregunta.textoPregunta, pregunta.tipoPregunta, pregunta.opciones);
//       }

//       await connection.commit(); // Si todo va bien, hacemos commit de la transacción
//       res.status(201).json({
//         mensaje: 'Encuesta creada con éxito',
//         pin: pin, // El PIN generado para la encuesta
//         encuestaId: encuestaId // El ID de la encuesta que se acaba de insertar en la base de datos
//       });
//     } catch (error) {
//       if (connection) {
//         await connection.rollback(); // En caso de error, hacemos rollback de la transacción
//       }
//       console.error('Error al crear la encuesta:', error);
//       res.status(500).send('Error en el servidor');
//     } finally {
//       if (connection) {
//         await connection.release(); // Liberamos la conexión de vuelta al pool
//       }
//     }
//   });





// // Esta función debe estar definida antes de que la uses en tu endpoint.
// // Obtener todas las encuestas de un usuario

// async function obtenerEncuestasPorUsuario(userId) {
//     const query = `
//       SELECT 
//         e.id_encuesta,
//         e.titulo, 
//         e.imagen, 
//         e.pin, 
//         p.id_pregunta, 
//         p.pregunta, 
//         p.tipo, 
//         p.opciones 
//       FROM encuestas e
//       LEFT JOIN preguntas p ON e.id_encuesta = p.encuesta_id
//       WHERE e.id_usuario = ?;
//     `;
//     const [rows] = await pool.query(query, [userId]);

//     const encuestas = rows.reduce((acc, row) => {
//       // Ya no es necesario tratar de parsear 'opciones', debería venir listo para usar
//       let opciones = row.opciones || [];

//       // Si la encuesta ya está en el acumulador, añade la pregunta a ella
//       if (acc[row.id_encuesta]) {
//         if (row.id_pregunta) { // Solo añadir si realmente hay una pregunta
//           acc[row.id_encuesta].preguntas.push({
//             id_pregunta: row.id_pregunta,
//             pregunta: row.pregunta,
//             tipo: row.tipo,
//             opciones: opciones
//           });
//         }
//       } else {
//         // Si no, crea una nueva entrada en el acumulador para la encuesta
//         acc[row.id_encuesta] = {
//           id_encuesta: row.id_encuesta,
//           titulo: row.titulo,
//           imagen: row.imagen,
//           pin: row.pin,
//           preguntas: row.id_pregunta ? [{
//             id_pregunta: row.id_pregunta,
//             pregunta: row.pregunta,
//             tipo: row.tipo,
//             opciones: opciones
//           }] : [] // Inicia un nuevo arreglo de preguntas
//         };
//       }
//       return acc;
//     }, {});

//     // Convertimos el objeto de encuestas en un arreglo
//     return Object.values(encuestas);
//   }


//   // Endpoint para obtener todas las encuestas del usuario autenticado
//   app.get('/encuestas', validarJwt, async (req, res) => {
//     const userId = req.auth.userId; // Esto asume que el JWT incluye el userId

//     try {
//       const encuestas = await obtenerEncuestasPorUsuario(userId); // Función modificada para filtrar por usuario
//       res.json(encuestas);
//     } catch (error) {
//       console.error('Error al obtener las encuestas:', error);
//       res.status(500).send('Error en el servidor');
//     }
//   });

// // Nombre Dashboard

// app.get('/usuario', validarJwt, async (req, res) => {
//     const userId = req.auth.userId;
//     try {
//         // Aquí podrías incluir lógica para buscar información específica del usuario
//         // Por ejemplo, obtener el nombre del usuario y contar cuántas encuestas ha creado
//         const userDetailsQuery = 'SELECT name FROM users WHERE id_usuario = ?';
//         const [user] = await pool.query(userDetailsQuery, [userId]);

//         if (user.length === 0) {
//             return res.status(404).json({ message: 'Usuario no encontrado' });
//         }

//         const surveysCountQuery = 'SELECT COUNT(*) AS surveysCount FROM encuestas WHERE id_usuario = ?';
//         const [[{ surveysCount }]] = await pool.query(surveysCountQuery, [userId]);

//         res.json({
//             message: 'Información del dashboard',
//             name: user[0].name,
//             surveysCount
//         });
//     } catch (error) {
//         console.error('Error al obtener la información del dashboard:', error);
//         res.status(500).send({ message: 'Error en el servidor' });
//     }
// });

// // Pin
// // app.post('/verifyPin', async (req, res) => {
// //     const { pin } = req.body; // Obtén el PIN del cuerpo de la solicitud

// //     try {
// //       // Ejecuta la consulta SQL para buscar un PIN que coincida en la base de datos
// //       const query = 'SELECT * FROM encuestas WHERE pin = ?';
// //       const [encuestas] = await pool.query(query, [pin]);

// //       // Verifica si la consulta devolvió algún resultado
// //       if (encuestas.length > 0) {
// //         // Si encontramos una encuesta con ese PIN, el acceso es concedido
// //         res.status(200).json({ valid: true, encuestaId: encuestas[0].id_encuesta });
// //       } else {
// //         // Si no, el acceso no es concedido
// //         res.status(200).json({ valid: false });
// //       }
// //     } catch (error) {
// //       // Maneja cualquier error que ocurra durante la ejecución de la consulta
// //       console.error('Error al verificar el PIN:', error);
// //       res.status(500).send('Error en el servidor');
// //     }
// //   });
// // app.post('/verifyPin', async (req, res) => {
// //     const { pin } = req.body; // Obtén el PIN del cuerpo de la solicitud

// //     try {
// //       // Ejecuta la consulta SQL para buscar un PIN que coincida en la base de datos
// //       const query = 'SELECT * FROM encuestas WHERE pin = ?';
// //       const [encuestas] = await pool.query(query, [pin]);

// //       // Verifica si la consulta devolvió algún resultado
// //       if (encuestas.length > 0) {
// //         // Si encontramos una encuesta con ese PIN, el acceso es concedido
// //         const encuestaId = encuestas[0].id_encuesta;

// //         // Genera el token JWT con el ID de la encuesta
// //         const token = jwt.sign({ encuestaId }, process.env.JWT_SECRET, { expiresIn: '15m' });

// //         res.status(200).json({ valid: true, token });
// //       } else {
// //         // Si no, el acceso no es concedido
// //         res.status(200).json({ valid: false });
// //       }
// //     } catch (error) {
// //       // Maneja cualquier error que ocurra durante la ejecución de la consulta
// //       console.error('Error al verificar el PIN:', error);
// //       res.status(500).send('Error en el servidor');
// //     }
// //   });

// app.post('/verifyPin', async (req, res) => {
//     const { pin } = req.body;

//     try {
//       const query = 'SELECT * FROM encuestas WHERE pin = ?';
//       const [encuestas] = await pool.query(query, [pin]);

//       if (encuestas.length > 0) {
//         const encuesta = encuestas[0];
//         const token = jwt.sign({ id_encuesta: encuesta.id_encuesta }, process.env.JWT_SECRET, { expiresIn: '15m' });

//         // Devuelve información relevante de la encuesta junto con la validación
//         res.status(200).json({ valid: true, token, nombreEncuesta: encuesta.titulo });
//       } else {
//         res.status(200).json({ valid: false });
//       }
//     } catch (error) {
//       console.error('Error al verificar el PIN:', error);
//       res.status(500).send('Error en el servidor');
//     }
// });


// // Iniciar el servidor
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en el puerto ${PORT}`);
// });




// PRUEBA-2


require('dotenv').config();
const mysql = require('mysql2/promise');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
const axios = require('axios');
// const { default: Dashboard } = require('../thePulse/src/components/Admin-/Dashboard.jsx');


// Configura la aplicación Express y CORS
const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Ajusta según sea necesario
    optionsSuccessStatus: 200
}));
app.use(express.json());

// Crea el pool de conexiones a la base de datos
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.post('/enviar-id-encuesta', async (req, res) => {
    const { id_encuesta } = req.body;
  
    try {
      // Hacer la solicitud a la API de Python
      const response = await axios.post('http://localhost:5001/api/graficas', {
        id_encuesta,
      });
  
      // Enviar la respuesta del backend de Python al frontend
      res.json(response.data);
    } catch (error) {
      console.error('Error al hacer la solicitud a la API de Python:', error);
      res.status(500).json({ error: 'Error al comunicarse con la API de Python' });
    }
  });

// Ejemplo de uso del pool para una ruta de registro
// app.post('/register', async (req, res) => {
//     const { name, organization, email, password, hasPermissions, isONG } = req.body;

//     try {
//       // Hashear la contraseña con bcrypt y saltRounds definido previamente
//       const hashedPassword = await bcrypt.hash(password, saltRounds);

//       // Consulta SQL para insertar el nuevo usuario
//       // Asegúrate de que estás usando `hashedPassword` en lugar de `password`
//       const insertQuery = `
//         INSERT INTO users (name, organization, email, password, has_permissions, is_ong) 
//         VALUES (?, ?, ?, ?, ?, ?);
//       `;

//       const [results] = await pool.execute(insertQuery, [name, organization, email, hashedPassword, hasPermissions, isONG]);

//       // Enviar respuesta de éxito al cliente
//       res.status(201).json({ message: 'Usuario registrado con éxito', userId: results.insertId });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Error al registrar el usuario' });
//     }
//   });

app.post('/register', async(req, res) => {
    const { name, organization, email, password, hasPermissions, isONG } = req.body;
    console.log(name + " " + organization + " " + email + " " + password + " " + hasPermissions + " " + isONG);

    try {
        // Hashear la contraseña con bcrypt y saltRounds definido previamente
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Consulta SQL para insertar el nuevo usuario
        // Asegúrate de que estás usando `hashedPassword` en lugar de `password`
        const insertQuery = `
      INSERT INTO users (name, organization, email, password, has_permissions, is_ong) 
      VALUES (?, ?, ?, ?, ?, ?);
    `;

        const [results] = await pool.execute(insertQuery, [name, organization, email, hashedPassword, hasPermissions, isONG]);

        // Aquí es donde generamos el token para el nuevo usuario
        // Asegúrate de tener el `id` del usuario recién creado, que normalmente es el resultado de la inserción
        // Suponiendo que `results.insertId` contiene el `id` del usuario recién insertado
        const token = jwt.sign({ userId: results.insertId }, // Asegúrate de que este campo coincida con cómo estás generando el token en el login
            process.env.JWT_SECRET, { expiresIn: '24h' }
        );

        // Enviar respuesta de éxito al cliente con el token incluido
        res.status(201).json({ message: 'Usuario registrado con éxito', userId: results.insertId, token: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
});


app.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [results] = await pool.query(query, [email]);
        if (results.length > 0) {
            const isMatch = await bcrypt.compare(password, results[0].password);
            if (isMatch) {
                const token = jwt.sign({ userId: results[0].id_usuario },
                    process.env.JWT_SECRET, { expiresIn: '24h' }
                );
                res.status(200).send({ message: 'Inicio de sesión exitoso', token: token });
            } else {
                res.status(401).send({ message: 'Credenciales inválidas' });
            }
        } else {
            res.status(404).send({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error al procesar la solicitud de inicio de sesión' });
    }
});



const validarJwt = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'auth'
});

app.use(validarJwt.unless({
    path: [
        '/login',
        '/register',
        '/verifyPin' // Agrega esta línea para permitir el acceso sin token
    ]
}));

// app.use((req, res, next) => {
//   console.log("Token:", req.auth); // Esto debería mostrar la información decodificada del token
//   next();
// });


app.get('/choose', validarJwt, (req, res) => {
    // Acceso permitido, el token es válido
    // Aquí puedes acceder a req.auth para ver los datos decodificados del token si lo necesitas
    res.send('Acceso concedido a la ruta protegida /choose');
});

app.get('/dashboard', validarJwt, (req, res) => {
    // Si el middleware `validarJwt` pasa, el usuario está autenticado
    // Aquí puedes añadir cualquier lógica adicional específica de la ruta `/dashboard`, si es necesario
    res.send('Acceso concedido a la ruta protegida /dashboard');
});

app.get('/name', validarJwt, (req, res) => {
    // Si el middleware `validarJwt` pasa, el usuario está autenticado
    // Aquí puedes añadir cualquier lógica adicional específica de la ruta `/dashboard`, si es necesario
    res.send('Acceso concedido a la ruta protegida /name');
});

app.get('/welcome', validarJwt, (req, res) => {
    // Si el middleware `validarJwt` pasa, el usuario está autenticado
    // Aquí puedes añadir cualquier lógica adicional específica de la ruta `/dashboard`, si es necesario
    res.send('Acceso concedido a la ruta protegida /welcome');
});


app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        // 401 status code indica que la petición requiere autenticación
        res.status(401).json({ message: 'No estás autorizado para acceder a este recurso. El token es inválido o no fue proporcionado.' });
    } else {
        // Otros errores inesperados
        next(err);
    }
});




async function generarPin() {
    let pin;
    let existe;
    do {
        pin = Math.floor(100000 + Math.random() * 900000).toString();
        const [rows] = await pool.query('SELECT id_encuesta FROM encuestas WHERE pin = ?', [pin]);
        existe = rows.length > 0;
    } while (existe);

    return pin;
}

async function insertarEncuesta(userId, nombreEncuesta, imagenEncuesta, pin, participantes, fechaInicio, fechaFin) {
    imagenEncuesta = imagenEncuesta !== undefined ? imagenEncuesta : null;

    console.log(userId + " " + nombreEncuesta + " " + imagenEncuesta + " " + pin + " " + participantes + " " + fechaInicio + " " + fechaFin);
    // Asegúrate de que 'participantes' sea un array antes de unirlo en un string.
    const participantesJSON = JSON.stringify(participantes);

    const query = `
      INSERT INTO encuestas (id_usuario, titulo, imagen, pin, participantes,fecha_inicio, fecha_fin)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    // No necesitas la línea participantesStr = participantes.join(';') aquí ya que lo has hecho arriba
    const [result] = await pool.execute(query, [userId, nombreEncuesta, imagenEncuesta, pin, participantesJSON, fechaInicio, fechaFin]);

    return result.insertId;
}



async function insertarPregunta(encuestaId, textoPregunta, tipoPregunta, opciones, minValue, maxValue) {

    let queryPregunta = `
      INSERT INTO preguntas (encuesta_id, pregunta, tipo, opciones, min_value, max_value)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    // Convertir las opciones a JSON solo si el tipo de pregunta es 'closed'
    let opcionesJSON = tipoPregunta === 'closed' ? JSON.stringify(opciones) : null;

    // Convertir minValue y maxValue a null si no son definidos
    let min = tipoPregunta === 'rating' && minValue !== undefined ? minValue : null;
    let max = tipoPregunta === 'rating' && maxValue !== undefined ? maxValue : null;

    const [result] = await pool.execute(queryPregunta, [
        encuestaId,
        textoPregunta,
        tipoPregunta,
        opcionesJSON,
        min,
        max
    ]);
    console.log("Hola min y max", min, max)
    return result.insertId;

}





// Crear una nueva encuesta
app.post('/encuestas', validarJwt, async(req, res) => {
    console.log("problema");
    let connection;
    const userId = req.auth.userId;
    console.log("Hola:", req.auth.userId)
    const { nombreEncuesta, imagenEncuesta, preguntas, participantes, fechaInicio, fechaFin } = req.body; // Asegúrate de que las variables estén definidas
    console.log(userId)
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const pin = await generarPin(); // Esta función debe generar un PIN único
        // Supongamos que insertas la encuesta y obtienes su ID
        const encuestaId = await insertarEncuesta(userId, nombreEncuesta, imagenEncuesta, pin, participantes, fechaInicio, fechaFin);

        // Ahora insertamos las preguntas asociadas a la encuesta
        for (const pregunta of preguntas) {
            await insertarPregunta(encuestaId, pregunta.textoPregunta, pregunta.tipoPregunta, pregunta.opciones, pregunta.minValue, pregunta.maxValue);
        }

        await connection.commit(); // Si todo va bien, hacemos commit de la transacción
        res.status(201).json({
            mensaje: 'Encuesta creada con éxito',
            pin: pin, // El PIN generado para la encuesta
            encuestaId: encuestaId // El ID de la encuesta que se acaba de insertar en la base de datos
        });
    } catch (error) {
        if (connection) {
            await connection.rollback(); // En caso de error, hacemos rollback de la transacción
        }
        console.error('Error al crear la encuesta:', error);
        res.status(500).json({ error: 'Error al crear la encuesta' });
    } finally {
        if (connection) {
            await connection.release(); // Liberamos la conexión de vuelta al pool
        }
    }
});





// Esta función debe estar definida antes de que la uses en tu endpoint.
// Obtener todas las encuestas de un usuario

// async function obtenerEncuestasPorUsuario(userId) {
//     const query = `
//     SELECT 
//     e.id_encuesta,
//     e.titulo, 
//     e.imagen, 
//     e.pin,
//     e.fecha_inicio, 
//     e.fecha_fin,
//     JSON_LENGTH(e.participantes->'$.emails') AS num_participantes,
//     p.id_pregunta, 
//     p.pregunta, 
//     p.tipo, 
//     p.opciones 
//   FROM encuestas e
//   LEFT JOIN preguntas p ON e.id_encuesta = p.encuesta_id
//   WHERE e.id_usuario = ?
//   GROUP BY e.id_encuesta, p.id_pregunta;  
//     `;
//     const [rows] = await pool.query(query, [userId]);

//     const encuestas = rows.reduce((acc, row) => {
//       // Ya no es necesario tratar de parsear 'opciones', debería venir listo para usar
//       let opciones = row.opciones || [];

//       // Si la encuesta ya está en el acumulador, añade la pregunta a ella
//       if (acc[row.id_encuesta]) {
//         if (row.id_pregunta) { // Solo añadir si realmente hay una pregunta
//           acc[row.id_encuesta].preguntas.push({
//             id_pregunta: row.id_pregunta,
//             pregunta: row.pregunta,
//             tipo: row.tipo,
//             opciones: opciones
//           });
//         }
//       } else {
//         // Si no, crea una nueva entrada en el acumulador para la encuesta
//         acc[row.id_encuesta] = {
//           id_encuesta: row.id_encuesta,
//           titulo: row.titulo,
//           imagen: row.imagen,
//           pin: row.pin,
//           num_participantes: row.num_participantes,
//           fechaInicio: row.fecha_inicio, 
//           fechaFin: row.fecha_fin,
//           preguntas: row.id_pregunta ? [{
//             id_pregunta: row.id_pregunta,
//             pregunta: row.pregunta,
//             tipo: row.tipo,
//             opciones: opciones
//           }] : [] // Inicia un nuevo arreglo de preguntas
//         };
//       }
//       return acc;
//     }, {});

//     // Convertimos el objeto de encuestas en un arreglo
//     return Object.values(encuestas);
// }




app.get('/encuestas', validarJwt, async(req, res) => {
    const userId = req.auth.userId;

    const query = `
  SELECT 
      e.id_encuesta,
      e.titulo,
      e.pin,
      e.fecha_inicio,
      e.fecha_fin,
      COALESCE(JSON_LENGTH(JSON_EXTRACT(e.participantes, '$.emails')), 0) AS num_participantes,
      FLOOR(
          COUNT(DISTINCT resp.id_respuesta) / 
          COALESCE((SELECT COUNT(*) FROM preguntas WHERE encuesta_id = e.id_encuesta), 1)
      ) AS encuestas_completadas
  FROM 
      encuestas e
  LEFT JOIN 
      respuestas resp ON e.id_encuesta = resp.id_encuesta
  WHERE 
      e.id_usuario = ?
  GROUP BY 
      e.id_encuesta;
  `;

    try {
        const [encuestas] = await pool.query(query, [userId]);
        res.json(encuestas.map(e => ({
            ...e,
            participantes: `${e.encuestas_completadas}/${e.num_participantes}`
        })));
    } catch (error) {
        console.error('Error al obtener las encuestas:', error);
        res.status(500).send('Error en el servidor');
    }
});



// Endpoint para obtener todas las encuestas del usuario autenticado
// app.get('/encuestas', validarJwt, async (req, res) => {
//   const userId = req.auth.userId; // Esto asume que el JWT incluye el userId

//   try {
//     const encuestas = await obtenerEncuestasPorUsuario(userId); // Función modificada para filtrar por usuario
//     res.json(encuestas);
//   } catch (error) {
//     console.error('Error al obtener las encuestas:', error);
//     res.status(500).send('Error en el servidor');
//   }
// });

// Nombre Dashboard

app.get('/usuario', validarJwt, async(req, res) => {
    const userId = req.auth.userId;
    try {
        // Aquí podrías incluir lógica para buscar información específica del usuario
        // Por ejemplo, obtener el nombre del usuario y contar cuántas encuestas ha creado
        const userDetailsQuery = 'SELECT name FROM users WHERE id_usuario = ?';
        const [user] = await pool.query(userDetailsQuery, [userId]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const surveysCountQuery = 'SELECT COUNT(*) AS surveysCount FROM encuestas WHERE id_usuario = ?';
        const [
            [{ surveysCount }]
        ] = await pool.query(surveysCountQuery, [userId]);

        res.json({
            message: 'Información del dashboard',
            name: user[0].name,
            surveysCount
        });
    } catch (error) {
        console.error('Error al obtener la información del dashboard:', error);
        res.status(500).send({ message: 'Error en el servidor' });
    }
});

// Pin

// app.post('/verifyPin', async (req, res) => {
//     const { pin } = req.body;

//     try {
//       const query = 'SELECT * FROM encuestas WHERE pin = ?';
//       const [encuestas] = await pool.query(query, [pin]);

//       if (encuestas.length > 0) {
//         const encuesta = encuestas[0];
//         const token = jwt.sign({ id_encuesta: encuesta.id_encuesta }, process.env.JWT_SECRET, { expiresIn: '15m' });

//         // Devuelve información relevante de la encuesta junto con la validación
//         res.status(200).json({ valid: true, token, nombreEncuesta: encuesta.titulo });
//       } else {
//         res.status(200).json({ valid: false });
//       }
//     } catch (error) {
//       console.error('Error al verificar el PIN:', error);
//       res.status(500).send('Error en el servidor');
//     }
// });


app.post('/verifyPin', async(req, res) => {
    const { pin } = req.body;
    const currentDate = new Date(); // Fecha actual para la comparación

    try {
        const query = 'SELECT * FROM encuestas WHERE pin = ?';
        const [encuestas] = await pool.query(query, [pin]);

        if (encuestas.length > 0) {
            const encuesta = encuestas[0];
            const fechaInicio = new Date(encuesta.fecha_inicio);
            const fechaFin = new Date(encuesta.fecha_fin);

            if (currentDate >= fechaInicio && currentDate <= fechaFin) {
                // Si la encuesta está activa
                const token = jwt.sign({ id_encuesta: encuesta.id_encuesta }, process.env.JWT_SECRET, { expiresIn: '15m' });
                res.status(200).json({ valid: true, active: true, token, nombreEncuesta: encuesta.titulo });
            } else {
                // Si la encuesta no está activa
                res.status(200).json({ valid: true, active: false, message: 'La encuesta está cerrada.' });
            }
        } else {
            res.status(200).json({ valid: false, message: 'PIN inválido.' });
        }
    } catch (error) {
        console.error('Error al verificar el PIN:', error);
        res.status(500).send('Error en el servidor');
    }
});




//Answer-Survey

async function obtenerPreguntasPorPin(pin) {
    const query = `
      SELECT 
          e.id_encuesta, 
          e.titulo AS nombreEncuesta, 
          p.id_pregunta, 
          p.pregunta, 
          p.tipo, 
          p.opciones, 
          p.min_value, 
          p.max_value 
      FROM preguntas p
      JOIN encuestas e ON p.encuesta_id = e.id_encuesta
      WHERE e.pin = ?;
  `;

    const [resultados] = await pool.query(query, [pin]);
    if (resultados.length > 0) {
        const nombreEncuesta = resultados[0].nombreEncuesta;
        const idEncuesta = resultados[0].id_encuesta; // Captura el ID de la encuesta

        const preguntas = resultados.map(pregunta => ({
            id: pregunta.id_pregunta,
            pregunta: pregunta.pregunta,
            tipo: pregunta.tipo,
            opciones: pregunta.opciones,
            minValue: pregunta.min_value,
            maxValue: pregunta.max_value,
        }));
        console.log("Bitch2", nombreEncuesta, idEncuesta, preguntas)
            // Devuelve el nombre de la encuesta, el ID de la encuesta, y las preguntas como un objeto
        return { nombreEncuesta, idEncuesta, preguntas };
    } else {
        return { nombreEncuesta: "Encuesta Desconocida", idEncuesta: null, preguntas: [] };
    }
}



app.get('/survey/:pin', validarJwt, async(req, res) => {
    const pin = req.params.pin;
    console.log(`Este es el pin: -->` + pin);
    try {
        const { nombreEncuesta, idEncuesta, preguntas } = await obtenerPreguntasPorPin(pin);


        if (preguntas.length > 0) {
            res.json({ surveyName: nombreEncuesta, questions: preguntas, idEncuesta, });
        } else {
            res.status(404).send({ message: 'No se encontraron preguntas para el PIN proporcionado.' });
        }
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        res.status(500).send({ message: 'Error interno del servidor' });
    }
});


// Enviar Respuestas
// Asegúrate de que esta función esté dentro del alcance de donde defines 'pool'
async function insertarRespuesta({ id_encuesta, id_pregunta, tipo, respuesta }) {
    console.log("Insertando respuesta:", { id_encuesta, id_pregunta, tipo, respuesta });

    try {
        const query = 'INSERT INTO respuestas (id_encuesta, id_pregunta, tipo, respuesta) VALUES (?, ?, ?, ?)';
        await pool.execute(query, [id_encuesta, id_pregunta, tipo, respuesta]);
        // Log para confirmar inserción exitosa o manejar el resultado según sea necesario.
    } catch (error) {
        console.error('Error al insertar respuesta:', error);
        throw error; // Lanza el error para manejarlo en el llamado de la función.
    }
}




app.post('/respuestas', async(req, res) => {
    const { respuestas } = req.body;
    console.log("Yo que se", respuestas)

    try {
        // Esperar a que todas las respuestas sean insertadas
        await Promise.all(
            respuestas.map(respuesta =>
                insertarRespuesta({
                    id_encuesta: respuesta.id_encuesta,
                    id_pregunta: respuesta.id_pregunta,
                    tipo: respuesta.tipo , // Asegura que 'tipo' no sea undefined.
                    respuesta: respuesta.respuesta
                })
            )

        );

        res.status(200).json({ message: 'Respuestas guardadas con éxito' });
    } catch (error) {
        console.error('Error al guardar respuestas:', error);
        res.status(500).json({ message: 'Error al guardar respuestas' });
    }
});


// Participantes-Dashboard


app.post('/api/encuestas/:idEncuesta/participantes', async(req, res) => {
    const { idEncuesta } = req.params;
    const { emails, telefonos } = req.body; // Desestructura los arrays del cuerpo de la solicitud

    try {
        // Prepara el objeto JSON para la columna 'participantes'
        const participantesJson = JSON.stringify({ emails, telefonos });

        // Asume que la columna 'participantes' en 'encuestas' puede almacenar datos en formato JSON
        const query = 'UPDATE encuestas SET participantes = ? WHERE id_encuesta = ?';
        await pool.query(query, [participantesJson, idEncuesta]);

        res.status(200).json({ message: 'Datos de participantes actualizados exitosamente en la encuesta' });
    } catch (error) {
        console.error('Error al actualizar los datos de participantes:', error);
        res.status(500).send('Error en el servidor');
    }
});


app.post('/api/encuestas/:idEncuesta/encuestaeliminar2', async(req, res) => {
    const { idEncuesta } = req.params;
    const { emails, telefonos } = req.body; // Desestructura los arrays del cuerpo de la solicitud

    try {
        // Prepara el objeto JSON para la columna 'participantes'
        const participantesJson = JSON.stringify({ emails, telefonos });

        // Asume que la columna 'participantes' en 'encuestas' puede almacenar datos en formato JSON
        const query = 'UPDATE encuestas SET participantes = ? WHERE id_encuesta = ?';
        await pool.query(query, [participantesJson, idEncuesta]);

        res.status(200).json({ message: 'Datos de participantes actualizados exitosamente en la encuesta' });
    } catch (error) {
        console.error('Error al actualizar los datos de participantes:', error);
        res.status(500).send('Error en el servidor');
    }
});



app.post('/api/encuestas/:idEncuesta/encuestaeliminar', async(req, res) => {
    const { idEncuesta } = req.params;
    const { pincode } = req.body;

    console.log(`Este es: -->` + pincode);

    try {
        // Prepara el objeto JSON para la columna 'participantes'
        const participantesJson = JSON.stringify({ pincode });

        // Asume que la columna 'participantes' en 'encuestas' puede almacenar datos en formato JSON
        const query = 'DELETE FROM encuestas WHERE pin = ?';
        await pool.query(query, [idEncuesta]);

        res.status(200).json({ message: 'Datos eliminados' });
    } catch (error) {
        console.error('Error al eliminar dato', error);
    }
});


// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});