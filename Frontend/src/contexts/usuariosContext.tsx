/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'

// Modelo de usuario
export interface Usuario {
  _id?: string
  nombre: string
  email: string
  edad: number
}

// Propiedades del contexto
interface UsuariosContextProps {
  usuarios: Usuario[]
  usuarioActual: Usuario | null
  cargarUsuarios: () => void
  crearUsuario: (nuevoUsuario: Usuario) => void
  editarUsuario: (usuarioActualizado: Usuario) => void
  eliminarUsuario: (id: string) => void
  seleccionarUsuario: (usuario: Usuario) => void
  limpiarUsuarioActual: () => void
}

const UsuariosContext = createContext<UsuariosContextProps | undefined>(undefined)

// Hook personalizado
export const useUsuarios = () => {
  const context = useContext(UsuariosContext)
  if (!context) throw new Error('useUsuarios debe usarse dentro de un UsuariosProvider')
  return context
}

// Proveedor
export const UsuariosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [usuarioActual, setUsuarioActual] = useState<Usuario | null>(null)

  const cargarUsuarios = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/usuarios')
      const data = await res.json()
      setUsuarios(data)
    } catch (err) {
      console.error('Error al cargar usuarios', err)
    }
  }

  const crearUsuario = async (nuevoUsuario: Usuario) => {
    try {
      const res = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
      })
      if (res.ok) cargarUsuarios()
    } catch (err) {
      console.error('Error al crear usuario:', err)
    }
  }

  const editarUsuario = async (usuarioActualizado: Usuario) => {
    try {
      if (!usuarioActualizado._id) return
      const res = await fetch(`http://localhost:3000/api/usuarios/${usuarioActualizado._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioActualizado)
      })
      if (res.ok) {
        cargarUsuarios()
        limpiarUsuarioActual()
      }
    } catch (err) {
      console.error('Error al editar usuario:', err)
    }
  }

  const eliminarUsuario = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: 'DELETE'
      })
      if (res.ok) cargarUsuarios()
    } catch (err) {
      console.error('Error al eliminar usuario:', err)
    }
  }

  const seleccionarUsuario = (usuario: Usuario) => setUsuarioActual(usuario)
  const limpiarUsuarioActual = () => setUsuarioActual(null)

  useEffect(() => {
    cargarUsuarios()
  }, [])

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        usuarioActual,
        cargarUsuarios,
        crearUsuario,
        editarUsuario,
        eliminarUsuario,
        seleccionarUsuario,
        limpiarUsuarioActual
      }}
    >
      {children}
    </UsuariosContext.Provider>
  )
}
