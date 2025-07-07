// src/components/ProtectedApp.tsx
import React, { useState } from 'react'
import Card from './Card'
import CalendarPage from '../pages/CalendarPage'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

const ProtectedApp: React.FC = () => {
  const [formVisible] = useState<'register' | 'login' | null>(null)

  return (
    <>
      <div className="container mt-4">
        {formVisible === 'register' && <RegisterForm />}
        {formVisible === 'login' && <LoginForm />}
      </div>

      {!formVisible && (
        <>
          <div className="d-flex justify-content-center align-items-center mb-4">
            <h1 className="h3 fw-bold text-center pt-4">Mis Viajes</h1>
          </div>
          <Card />
          <CalendarPage />
        </>
      )}
    </>
  )
}

export default ProtectedApp