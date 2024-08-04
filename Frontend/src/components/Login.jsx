import { Form, Button } from 'react-bootstrap'; // Importa componentes de Bootstrap para el formulario y el botón.
import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado del formulario.
import Swal from 'sweetalert2'; // Importa SweetAlert2 para mostrar alertas amigables.
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP.

const Login = ({ onLogin }) => { // Componente Login que recibe una función onLogin como prop.
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de página)

    const { email, password } = formData; // Extrae los valores del formulario

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del email
    // Validaciones de los campos del formulario
    if (!regexEmail.test(email)) {
      Swal.fire('Email no válido'); // Alerta si el email no tiene un formato válido
      return;
    }
    if (email === '') {
      Swal.fire('El campo de email no puede estar vacío'); // Alerta si el email está vacío
      return;
    }
    if (password === '') {
      Swal.fire('El campo de contraseña no puede estar vacío'); // Alerta si la contraseña está vacía
      return;
    }
    
    try {
      // Envía una solicitud POST para iniciar sesión
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      onLogin(response.data); // Llama a onLogin con los datos de usuario recibidos del backend
    } catch (error) {
      console.error(error); // Muestra el error en la consola
      Swal.fire('Error al iniciar sesión'); // Alerta en caso de error en la solicitud
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form-container"> {/* Formulario con el manejador de envío */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email"
          name="email"
          value={formData.email} // Vincula el valor del campo al estado
          onChange={handleChange} // Maneja los cambios en el input
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password} // Vincula el valor del campo al estado
          onChange={handleChange} // Maneja los cambios en el input
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Ingresar
      </Button>
    </Form>
  );
};

export default Login; // Exporta el componente Login para su uso en otras partes de la aplicación
