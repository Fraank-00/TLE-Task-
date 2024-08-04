const express = require('express'); // Importa Express para manejar las rutas.
const bcrypt = require('bcrypt'); // Importa bcrypt para el hash de contraseñas.
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para la creación de tokens JWT.
const User = require('../model/User'); // Importa el modelo de User para interactuar con la base de datos.
require('dotenv').config(); // Carga las variables de entorno desde un archivo .env.

const router = express.Router(); // Crea un enrutador para definir las rutas relacionadas con la autenticación.

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body; // Extrae los datos del cuerpo de la solicitud.

  try {
    // Validar datos de entrada
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' }); // Responde con un error si falta algún campo.
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado' }); // Responde con un error si el correo ya está registrado.
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // Hashea la contraseña con bcrypt.

    // Crear y guardar el nuevo usuario
    const newUser = await User.create({ name, email, password: hashedPassword });

    // Generar un token JWT
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // El token expira en 1 hora.
    });

    res.status(201).json({ token, user: { id: newUser.id, name, email } }); // Responde con el token y los datos del usuario.
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' }); // Maneja errores y responde con un mensaje de error.
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Extrae los datos del cuerpo de la solicitud.

  try {
    // Validar datos de entrada
    if (!email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' }); // Responde con un error si falta algún campo.
    }

    // Buscar al usuario por correo electrónico
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Credenciales inválidas' }); // Responde con un error si no se encuentra el usuario.
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Credenciales inválidas' }); // Responde con un error si la contraseña no coincide.
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // El token expira en 1 hora.
    });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } }); // Responde con el token y los datos del usuario.
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' }); // Maneja errores y responde con un mensaje de error.
  }
});

module.exports = router; // Exporta el enrutador para que pueda ser utilizado en la aplicación principal.
