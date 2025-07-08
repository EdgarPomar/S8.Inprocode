import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log('✅ Usuario logueado correctamente');
      const storedUser = localStorage.getItem('usuario');
      console.log('Usuario almacenado en localStorage:', storedUser);
      setError(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  const handleNavigateRegister = () => {
    navigate('/register');
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow-sm p-4"
        style={{
          maxWidth: '400px',
          width: '100%',
          borderRadius: '12px',
          border: 'none',
        }}
      >
        <h2 className="mb-4 text-center fw-bold" style={{ color: '#343a40' }}>
          Iniciar sesión
        </h2>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Correo electrónico
            </label>
            <input
              id="email"
              className="form-control rounded-3"
              type="email"
              placeholder="nombre@correo.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                border: '1px solid #ced4da',
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Contraseña
            </label>
            <input
              id="password"
              className="form-control rounded-3"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                border: '1px solid #ced4da',
              }}
            />
          </div>

          <button
            className="btn btn-primary w-100 py-2 rounded-3 fw-semibold"
            type="submit"
            style={{ fontSize: '1rem' }}
          >
            Entrar
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-muted">¿No tienes cuenta?</span>{' '}
          <button
            type="button"
            className="btn btn-link fw-semibold"
            onClick={handleNavigateRegister}
            style={{
              textDecoration: 'none',
              color: '#0d6efd',
            }}
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
