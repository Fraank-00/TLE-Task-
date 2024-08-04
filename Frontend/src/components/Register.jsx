import { Form, Button } from 'react-bootstrap'; // Importa componentes de Bootstrap para el formulario y el botón.
import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado del formulario.
import Swal from 'sweetalert2'; // Importa SweetAlert2 para mostrar alertas amigables.
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP.
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redireccionar después del registro.

const Register = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Hook para redirección después del registro

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de página)

    const { name, email, password } = formData; // Extrae los valores del formulario
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del email

    // Validaciones de los campos del formulario
    if (!name) {
      Swal.fire('El campo de nombre no puede estar vacío'); // Alerta si el nombre está vacío
      return;
    }

    if (!regexEmail.test(email)) {
      Swal.fire('Email no válido'); // Alerta si el email no tiene un formato válido
      return;
    }

    if (password.length < 6) {
      Swal.fire('La contraseña debe tener al menos 6 caracteres'); // Alerta si la contraseña es demasiado corta
      return;
    }

    try {
      // Envía una solicitud POST para registrar el usuario
      const response = await axios.post('http://localhost:3000/auth/register', formData);
      Swal.fire('Registro exitoso', 'Ahora puedes iniciar sesión', 'success'); // Alerta de éxito
      navigate('/login'); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      console.error(error); // Muestra el error en la consola
      Swal.fire('Error al registrarse'); // Alerta en caso de error en la solicitud
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form-container"> {/* Formulario con el manejador de envío */}
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Registrarse
      </Button>
    </Form>
  );
};

export default Register; // Exporta el componente Register para su uso en otras partes de la aplicación
