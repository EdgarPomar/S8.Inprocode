import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';  // <-- Importa useNavigate

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();  // <-- Inicializa el hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log('✅ Usuario logueado correctamente');
      const storedUser = localStorage.getItem('usuario');
      console.log('Usuario almacenado en localStorage:', storedUser);
      setError(null);
      // Aquí podrías navegar al dashboard u otra página tras login exitoso
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  const handleNavigateRegister = () => {
    navigate('/register');  // Navega a la página de registro
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: 400 }}>
      <h3 className="mb-3 text-center">Iniciar sesión</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
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
        <button className="btn btn-primary w-100" type="submit">
          Entrar
        </button>
      </form>

      <div className="mt-3 text-center">
        <span>¿No estás registrado? </span>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={handleNavigateRegister}
          style={{ textDecoration: 'underline' }}
        >
          Regístrate
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
