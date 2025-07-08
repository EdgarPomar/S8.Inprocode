import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom'; // 👈 Importa useNavigate

function RegisterForm() {
  const { register } = useAuth();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // 👈 Hook para navegar

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(nombre, email, password);
      setError(null);
      console.log('✅ Usuario registrado correctamente');
      // 👇 Después de registrar, navegar al login
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('Error al registrar usuario');
    }
  };

  const handleNavigateLogin = () => {
    navigate('/login');
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: 400 }}>
      <h3 className="mb-3 text-center">Registrarse</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            className="form-control"
            type="text"
            required
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            className="form-control"
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-success w-100" type="submit">
          Crear cuenta
        </button>
      </form>

      <div className="mt-3 text-center">
        <span>¿Ya tienes cuenta? </span>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={handleNavigateLogin}
          style={{ textDecoration: 'underline' }}
        >
          Inicia sesión
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;
