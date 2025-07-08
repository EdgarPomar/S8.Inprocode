import { useContext } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './contexts/authContext';
import Placeholder from './components/Placeholder';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ResponsiveAppBar from './components/SearchNavbar';
import Card from './components/Card';
import CalendarPage from './pages/CalendarPage';

function App() {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('AuthContext no disponible');

  const { usuario, logout } = authContext;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // volver a la página principal
  };

  const handleNavClick = (page: string) => {
    navigate(`/${page}`);
  };

  return (
    <div className="p-4 bg-light min-vh-100">
      <ResponsiveAppBar
        onLogout={handleLogout}
        onNavClick={handleNavClick}
        usuario={usuario}
      />

      <Routes>
        {/* Ruta principal */}
        <Route
          path="/"
          element={
            usuario ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Placeholder
                onContinue={() => navigate('/login')} // 👉 Por defecto va a login
              />
            )
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={usuario ? <Navigate to="/dashboard" replace /> : <LoginForm />}
        />

        {/* Registro */}
        <Route
          path="/register"
          element={usuario ? <Navigate to="/dashboard" replace /> : <RegisterForm />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={usuario ? <Card /> : <Navigate to="/" replace />}
        />

        {/* Calendario */}
        <Route
          path="/calendar"
          element={usuario ? <CalendarPage /> : <Navigate to="/" replace />}
        />

        {/* Gráficos */}
        <Route
          path="/graphics"
          element={
            usuario ? (
              <div className="text-center mt-4 text-muted" style={{ fontSize: '1.5rem' }}>
                🎨 Próximamente...
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
