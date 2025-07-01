/* eslint-disable react-refresh/only-export-components */
// src/context/authContext.tsx
import { createContext, useState, useEffect } from 'react'
import { loginUser, registerUser } from '../services/authService'

interface Usuario {
  _id: string
  nombre: string
  email: string
  rol?: string
}

interface AuthContextProps {
  usuario: Usuario | null
  login: (email: string, password: string) => Promise<void>
  register: (nombre: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('usuario')
    if (storedUser) {
      setUsuario(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    const data = await loginUser({ email, password })
    if (data.token && data.usuario) {
      setUsuario(data.usuario)
      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))
    }
  }

  const register = async (nombre: string, email: string, password: string) => {
    const data = await registerUser({ nombre, email, password })
    if (data.token && data.usuario) {
      setUsuario(data.usuario)
      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))
    }
  }

  const logout = () => {
    setUsuario(null)
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }

  return (
    <AuthContext.Provider value={{ usuario, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
