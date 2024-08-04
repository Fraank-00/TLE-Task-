
const express = require('express'); // Importa Express para manejar las rutas.
const Task = require('../model/Task'); // Importa el modelo de Task para interactuar con la base de datos.
const authenticateToken = require('../auth/middleware'); // Importa el middleware de autenticación para proteger las rutas.

const router = express.Router(); // Crea un enrutador para definir las rutas relacionadas con las tareas.

// Obtener todas las tareas del usuario autenticado
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } }); // Obtiene todas las tareas del usuario autenticado.
    res.json(tasks); // Responde con las tareas en formato JSON.
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' }); // Maneja errores y responde con un mensaje de error.
  }
});

// Crear una nueva tarea
router.post('/', authenticateToken, async (req, res) => {
  const { title, description, dueDate, priority } = req.body; // Extrae los datos del cuerpo de la solicitud.

  try {
    const newTask = await Task.create({
      userId: req.user.id, // Asigna el ID del usuario autenticado a la tarea.
      title,
      description,
      dueDate,
      priority
    });
    res.status(201).json(newTask); // Responde con la nueva tarea creada y un estado 201.
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' }); // Maneja errores y responde con un mensaje de error.
  }
});

// Actualizar una tarea existente
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params; // Obtiene el ID de la tarea de los parámetros de la URL.
  const { title, description, dueDate, priority, completed } = req.body; // Extrae los datos del cuerpo de la solicitud.

  try {
    const task = await Task.findOne({ where: { id, userId: req.user.id } }); // Busca la tarea por ID y usuario autenticado.

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' }); // Si la tarea no existe, responde con un error 404.
    }

    // Actualiza los campos de la tarea con los nuevos valores, si se proporcionan.
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.completed = typeof completed !== 'undefined' ? completed : task.completed;

    await task.save(); // Guarda los cambios en la base de datos.

    res.json(task); // Responde con la tarea actualizada.
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea' }); // Maneja errores y responde con un mensaje de error.
  }
});

// Eliminar una tarea
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params; // Obtiene el ID de la tarea de los parámetros de la URL.

  try {
    const task = await Task.findOne({ where: { id, userId: req.user.id } }); // Busca la tarea por ID y usuario autenticado.

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' }); // Si la tarea no existe, responde con un error 404.
    }

    await task.destroy(); // Elimina la tarea de la base de datos.
    res.status(204).send(); // Responde con un estado 204 sin contenido.
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' }); // Maneja errores y responde con un mensaje de error.
  }
});

module.exports = router; // Exporta el enrutador para que pueda ser utilizado en la aplicación principal.
