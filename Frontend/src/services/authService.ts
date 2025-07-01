// src/services/authService.ts

const API = 'http://localhost:3000/api/usuarios'

export const registerUser = async (datos: { nombre: string; email: string; password: string }) => {
  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  return res.json()
}

export const loginUser = async (datos: { email: string; password: string }) => {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  return res.json()
}
