
const { DataTypes } = require('sequelize'); // Importa los tipos de datos de Sequelize.
const { sequelize } = require('../../Db'); // Importa la instancia de Sequelize configurada para la conexión a la base de datos.

const User = sequelize.define('User', { // Define un nuevo modelo llamado 'User' que representa una tabla en la base de datos.
  id: {
    type: DataTypes.INTEGER, // Define el tipo de dato como un número entero.
    autoIncrement: true, // Configura para que el campo se incremente automáticamente.
    primaryKey: true // Define este campo como la clave primaria de la tabla.
  },
  name: {
    type: DataTypes.STRING, // Tipo de dato cadena para el nombre del usuario.
    allowNull: false // No permite que este campo sea nulo.
  },
  email: {
    type: DataTypes.STRING, // Tipo de dato cadena para el correo electrónico del usuario.
    allowNull: false, // No permite que este campo sea nulo.
    unique: true // Garantiza que el correo electrónico sea único en la tabla.
  },
  password: {
    type: DataTypes.STRING, // Tipo de dato cadena para almacenar la contraseña (hash).
    allowNull: false // No permite que este campo sea nulo.
  },
  createdAt: {
    type: DataTypes.DATE, // Tipo de dato fecha para la fecha de creación del registro.
    defaultValue: DataTypes.NOW // Valor por defecto, se establece a la fecha y hora actuales.
  }
}, {
  tableName: 'users' // Especifica el nombre de la tabla en la base de datos.
});

module.exports = User; // Exporta el modelo de User para su uso en otras partes de la aplicación.
