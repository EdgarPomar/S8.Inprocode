/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/RegisterForm.tsx
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

function RegisterForm() {
  const { register } = useAuth()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(nombre, email, password)
      setError(null)
    } catch (err) {
      setError('Error al registrar usuario')
    }
  }

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
        <button className="btn btn-success w-100" type="submit">Crear cuenta</button>
      </form>
    </div>
  )
}

export default RegisterForm
