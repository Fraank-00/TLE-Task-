import React, { useState, useEffect } from 'react'; // Importa React y hooks useState y useEffect.
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP.
import { Button, ListGroup, Card, Modal, Form } from 'react-bootstrap'; // Importa componentes de Bootstrap para la UI.

const TaskList = ({ user }) => { // Componente TaskList que recibe un objeto user como prop.
  const [tasks, setTasks] = useState([]); // Estado para almacenar la lista de tareas.
  const [selectedTask, setSelectedTask] = useState(null); // Estado para almacenar la tarea seleccionada para editar.
  const [show, setShow] = useState(false); // Estado para controlar la visibilidad del modal.

  // Hook useEffect para obtener las tareas cuando el componente se monta o cuando cambia el usuario.
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks', {
          headers: {
            Authorization: `Bearer ${user.token}`, // Incluye el token de autorización en el encabezado
          },
        });
        setTasks(response.data); // Actualiza el estado con la lista de tareas obtenidas.
      } catch (error) {
        console.error(error); // Muestra el error en la consola.
      }
    };

    fetchTasks(); // Llama a la función para obtener las tareas.
  }, [user]); // Dependencia en `user` para volver a ejecutar el efecto si cambia el usuario.

  // Maneja la eliminación de una tarea.
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Incluye el token de autorización en el encabezado.
        },
      });
      setTasks(tasks.filter(task => task.id !== id)); // Actualiza la lista de tareas después de eliminar la tarea.
    } catch (error) {
      console.error(error); // Muestra el error en la consola.
    }
  };

  // Maneja la actualización de una tarea.
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/tasks/${selectedTask.id}`, selectedTask, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Incluye el token de autorización en el encabezado.
        },
      });
      setTasks(tasks.map(task => (task.id === selectedTask.id ? selectedTask : task))); // Actualiza la lista de tareas después de actualizar la tarea.
      setShow(false); // Cierra el modal.
    } catch (error) {
      console.error(error); // Muestra el error en la consola.
    }
  };

  // Muestra el modal para editar una tarea.
  const handleShow = (task) => {
    setSelectedTask(task); // Establece la tarea seleccionada.
    setShow(true); // Muestra el modal.
  };

  // Maneja los cambios en los campos del formulario del modal.
  const handleChange = (e) => {
    setSelectedTask({ ...selectedTask, [e.target.name]: e.target.value });
  };

  return (
    <div className="tasks-container"> {/* Contenedor para la lista de tareas */}
      <h2>Lista de Tareas</h2>
      <ListGroup>
        {tasks.map(task => (
          <ListGroup.Item key={task.id} className="task-item">
            <Card>
              <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Card.Text>{task.description}</Card.Text>
                <Card.Text>Fecha de Vencimiento: {task.dueDate}</Card.Text>
                <Card.Text>Prioridad: {task.priority}</Card.Text>
                <Button variant="primary" onClick={() => handleShow(task)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(task.id)}>Eliminar</Button>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={selectedTask ? selectedTask.title : ''} // Valor del campo controlado por el estado seleccionado.
                onChange={handleChange} // Maneja los cambios en el campo.
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={selectedTask ? selectedTask.description : ''} // Valor del campo controlado por el estado seleccionado.
                onChange={handleChange} // Maneja los cambios en el campo.
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDueDate">
              <Form.Label>Fecha de Vencimiento</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={selectedTask ? selectedTask.dueDate : ''} // Valor del campo controlado por el estado seleccionado.
                onChange={handleChange} // Maneja los cambios en el campo.
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPriority">
              <Form.Label>Prioridad</Form.Label>
              <Form.Select
                name="priority"
                value={selectedTask ? selectedTask.priority : ''} // Valor del campo controlado por el estado seleccionado.
                onChange={handleChange} // Maneja los cambios en el campo.
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" onClick={handleUpdate}>Actualizar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TaskList; // Exporta el componente TaskList para su uso en otras partes de la aplicación.
