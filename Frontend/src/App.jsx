import React, { useState, useEffect } from 'react'; // Importa React y hooks necesarios para el estado y efectos.
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Importa componentes para la navegación y las rutas.
import Header from './components/Header'; // Importa el componente Header.
import Register from './components/Register'; // Importa el componente Register para el registro de usuarios.
import Login from './components/Login'; // Importa el componente Login para el inicio de sesión.
import Tasks from './components/Tasks'; // Importa el componente Tasks donde se gestionan las tareas.
import TaskList from './components/TaskList'; // Importa el componente TaskList para listar tareas.
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap para el diseño.
import './css/App.css'; // Importa el CSS personalizado de la aplicación.

function App() {
  // Estado para almacenar la información del usuario
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Carga el usuario almacenado en sessionStorage al iniciar el componente
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Establece el usuario en el estado
    }
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = (userData) => {
    setUser(userData); // Establece el usuario en el estado
    sessionStorage.setItem('user', JSON.stringify(userData)); // Guarda el usuario en sessionStorage
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setUser(null); // Elimina el usuario del estado
    sessionStorage.removeItem('user'); // Elimina el usuario de sessionStorage
  };

  return (
    <Router>
      <div style={{ position: 'relative' }}>
        <Header /> {/* Muestra el componente Header en la parte superior */}
        {user ? (
          <>
            <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button> {/* Botón para cerrar sesión */}
            <Routes>
              <Route path="/tasks" element={<Tasks user={user} />} /> {/* Ruta para el componente Tasks */}
              <Route path="/task-list" element={<TaskList user={user} />} /> {/* Ruta para el componente TaskList */}
              <Route path="*" element={<Navigate to="/tasks" />} /> {/* Redirige cualquier ruta no definida a /tasks */}
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Register />} /> {/* Ruta para el componente Register (registro de usuarios) */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Ruta para el componente Login con función de manejo de inicio de sesión */}
            <Route path="*" element={<Navigate to="/login" />} /> {/* Redirige cualquier ruta no definida a /login */}
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App; // Exporta el componente App para su uso en otras partes de la aplicación
