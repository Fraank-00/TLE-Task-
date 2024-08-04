import React from 'react'; // Importa React para crear el componente.
import { Link } from 'react-router-dom'; // Importa Link para manejar la navegación en la aplicación.
import Container from 'react-bootstrap/Container'; // Importa Container para la disposición del contenido.
import Nav from 'react-bootstrap/Nav'; // Importa Nav para crear la barra de navegación.
import Navbar from 'react-bootstrap/Navbar'; // Importa Navbar para crear la barra de navegación principal.

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg"> {/* Barra de navegación con fondo oscuro y texto blanco */}
        <Container>
          <Navbar.Brand>TLE-Task</Navbar.Brand> {/* Nombre o logotipo de la aplicación */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" /> {/* Botón para alternar la visibilidad de la barra de navegación en dispositivos móviles */}
          <Navbar.Collapse id="basic-navbar-nav"> {/* Contenido de la barra de navegación que se colapsa en dispositivos móviles */}
            <Nav className="me-auto"> {/* Grupo de enlaces de navegación */}
              <Nav.Link as={Link} to="/">Inicio</Nav.Link> {/* Enlace a la página de inicio usando Link */}
              <Nav.Link as={Link} to="/login">Login</Nav.Link> {/* Enlace a la página de inicio de sesión usando Link */}
              <Nav.Link as={Link} to="/task">Tareas</Nav.Link> {/* Enlace a la página de agregar tareas usando Link */}
              <Nav.Link as={Link} to="/task-list">Lista de Tareas</Nav.Link> {/* Enlace a la lista de tareas usando Link */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header; // Exporta el componente Header para que pueda ser usado en otras partes de la aplicación.
