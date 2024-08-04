
const express = require('express'); // Importa el framework Express para crear una aplicación web.
const cors = require('cors'); // Importa el paquete para habilitar CORS.
const { sequelize } = require('./Db'); // Importa la instancia de Sequelize para la conexión a la base de datos.
require('dotenv').config(); // Carga las variables de entorno desde un archivo .env.

const authRouter = require('./src/auth/Auth'); // Importa las rutas de autenticación.
const taskRoutes = require('./src/routes/Task'); // Importa las rutas para manejar tareas.
const authenticateToken = require('./src/auth/middleware'); // Importa el middleware para autenticación de tokens.

const app = express(); // Crea una instancia de la aplicación Express.
app.use(cors()); // Habilita CORS para permitir solicitudes de otros orígenes.
app.use(express.json()); // Configura el servidor para aceptar y parsear JSON en los cuerpos de las solicitudes.

// Rutas de autenticación
app.use('/auth', authRouter);

// Rutas de tareas (protegidas con autenticación)
app.use('/tasks', authenticateToken, taskRoutes);

// Ruta de prueba para verificar el funcionamiento de la API
app.get('/', (req, res) => {
  res.send('API de Gestión de Tareas'); // Responde con un mensaje simple.
});

// Sincronización de modelos y inicio del servidor
sequelize.sync({ force: false }) // Sincroniza los modelos de Sequelize con la base de datos.
  .then(() => {
    console.log('Tablas sincronizadas'); // Muestra un mensaje si las tablas se sincronizan correctamente.
    app.listen(3000, () => {
      console.log('El servidor está corriendo en el puerto 3000'); // Inicia el servidor en el puerto 3000.
    });
  })
  .catch(err => console.error('Error al sincronizar modelos:', err)); // Muestra un error si la sincronización falla.
