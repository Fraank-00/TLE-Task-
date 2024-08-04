
const { DataTypes } = require('sequelize'); // Importa los tipos de datos de Sequelize.
const { sequelize } = require('../../Db'); // Importa la instancia de Sequelize configurada para la conexión a la base de datos.
const User = require('./User'); // Importa el modelo de usuario para establecer relaciones.

const Task = sequelize.define('Task', { // Define un nuevo modelo llamado 'Task' que representa una tabla en la base de datos.
  id: {
    type: DataTypes.INTEGER, // Define el tipo de dato como un número entero.
    autoIncrement: true, // Configura para que el campo se incremente automáticamente.
    primaryKey: true // Define este campo como la clave primaria de la tabla.
  },
  userId: {
    type: DataTypes.INTEGER, // Tipo de dato entero para almacenar la referencia al usuario.
    allowNull: false, // No permite que este campo sea nulo.
    references: {
      model: User, // Define una relación con el modelo de Usuario.
      key: 'id' // Especifica que se refiere al campo 'id' de la tabla de usuarios.
    }
  },
  title: {
    type: DataTypes.STRING, // Tipo de dato cadena para el título de la tarea.
    allowNull: false // No permite que este campo sea nulo.
  },
  description: {
    type: DataTypes.TEXT, // Tipo de dato texto para la descripción de la tarea.
    allowNull: true // Permite que este campo sea nulo.
  },
  dueDate: {
    type: DataTypes.DATE, // Tipo de dato fecha para la fecha límite de la tarea.
    allowNull: true // Permite que este campo sea nulo.
  },
  priority: {
    type: DataTypes.STRING, // Tipo de dato cadena para la prioridad de la tarea.
    allowNull: false, // No permite que este campo sea nulo.
    defaultValue: 'low' // Valor por defecto para la prioridad (puede ser 'low', 'medium' o 'high').
  }
}, {
  tableName: 'tasks' // Especifica el nombre de la tabla en la base de datos.
});

module.exports = Task; // Exporta el modelo de Task para su uso en otras partes de la aplicación.
