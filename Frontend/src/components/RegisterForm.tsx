import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const { register } = useAuth();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(nombre, email, password);
      setError(null);
      console.log('✅ Usuario registrado correctamente');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('⚠️ Error al registrar usuario');
    }
  };

  const handleNavigateLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: 450, width: '100%' }}>
        <div className="text-center mb-4">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: 60, height: 60 }}
            className="mb-2"
          />
          <h3 className="fw-bold">Registrarse</h3>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              type="text"
              required
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Tu nombre completo"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              className="form-control"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <button className="btn btn-success w-100 mb-3" type="submit">
            Crear cuenta
          </button>
        </form>

        <div className="text-center">
          <span>¿Ya tienes cuenta? </span>
          <button
            type="button"
            className="btn btn-link fw-semibold"
            onClick={handleNavigateLogin}
            style={{
              textDecoration: 'none',
              color: '#0d6efd',
            }}
          >
            Inicia Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
