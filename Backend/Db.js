const { Sequelize } = require('sequelize'); // Importa el módulo Sequelize para interactuar con la base de datos.
require('dotenv').config(); // Carga las variables de entorno desde un archivo .env.

const dbName = process.env.DB_NAME; // Nombre de la base de datos desde las variables de entorno.
const dbUserName = process.env.DB_USER; // Nombre de usuario de la base de datos desde las variables de entorno.
const dbPassword = process.env.DB_PASSWORD; // Contraseña de la base de datos desde las variables de entorno.

const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
  host: 'localhost', // Dirección del servidor de la base de datos.
  dialect: 'mysql' // Tipo de base de datos utilizada (en este caso, MySQL).
});

// Función para probar la conexión a la base de datos
const DBTest = async () => {
  try {
    await sequelize.authenticate(); // Intenta autenticar la conexión con la base de datos.
    console.log('Se conectó a la base de datos.'); // Muestra un mensaje si la conexión es exitosa.
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error); // Muestra un error si la conexión falla.
  }
};

module.exports = { sequelize, DBTest }; // Exporta la instancia de Sequelize y la función de prueba de conexión.
