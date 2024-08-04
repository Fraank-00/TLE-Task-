import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado del componente.
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP.
import { Form, Button, Alert } from 'react-bootstrap'; // Importa componentes de Bootstrap para el formulario y las alertas.
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir al usuario.

const Tasks = ({ user }) => { // Componente Tasks que recibe un objeto user como prop.
  // Estado para almacenar los datos de la nueva tarea y los mensajes de éxito o error
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low'
  });
  const [error, setError] = useState(''); // Estado para mensajes de error
  const [success, setSuccess] = useState(''); // Estado para mensajes de éxito
  const navigate = useNavigate(); // Hook para redirección

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de página)
    try {
      // Envía una solicitud POST para añadir una nueva tarea
      await axios.post('http://localhost:3000/tasks', newTask, {
        headers: {
          Authorization: `Bearer ${user.token}` // Incluye el token de autorización en el encabezado
        }
      });
      setSuccess('Tarea añadida con éxito'); // Muestra un mensaje de éxito
      setNewTask({ // Resetea el formulario
        title: '',
        description: '',
        dueDate: '',
        priority: 'low'
      });
      navigate('/task-list'); // Redirige al usuario al componente TaskList
    } catch (error) {
      setError('No se pudo añadir la tarea'); // Muestra un mensaje de error
      console.error(error); // Muestra el error en la consola
    }
  };

  return (
    <div className="tasks-container"> {/* Contenedor para el formulario de tareas */}
      <h2>Agregar Nueva Tarea</h2>
      {success && <Alert variant="success">{success}</Alert>} {/* Muestra un mensaje de éxito si existe */}
      {error && <Alert variant="danger">{error}</Alert>} {/* Muestra un mensaje de error si existe */}
      <Form onSubmit={handleSubmit}> {/* Formulario con el manejador de envío */}
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduce el título"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Introduce una descripción"
            name="description"
            value={newTask.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDueDate">
          <Form.Label>Fecha de Vencimiento</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPriority">
          <Form.Label>Prioridad</Form.Label>
          <Form.Select
            name="priority"
            value={newTask.priority}
            onChange={handleChange}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Añadir Tarea
        </Button>
      </Form>
    </div>
  );
};

export default Tasks; // Exporta el componente Tasks para su uso en otras partes de la aplicación
