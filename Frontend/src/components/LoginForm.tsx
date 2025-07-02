/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/LoginForm.tsx
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      setError(null)
      console.log('✅ Usuario logueado correctamente')
    } catch (err) {
      setError('Credenciales inválidas')
    }
  }

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
        <button className="btn btn-primary w-100" type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default LoginForm
