import { useState } from 'react'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import { ViajesProvider } from './contexts/viajeContext'
import { AuthProvider } from './contexts/authContext' // importa tu AuthProvider
import ResponsiveAppBar from './components/SearchNavbar'
import Card from './components/Card'
import CalendarPage from './pages/CalendarPage'

function App() {
  const [formVisible, setFormVisible] = useState<'register' | 'login' | null>(null)

  return (
    <AuthProvider>
      <ViajesProvider>
        <div className="p-4 bg-light min-vh-100">
          <ResponsiveAppBar onMenuSelect={setFormVisible} />

          <div className="container mt-4">
            {formVisible === 'register' && <RegisterForm />}
            {formVisible === 'login' && <LoginForm />}
          </div>

          {/* Mostrar contenido principal solo si no se está mostrando un formulario */}
          {!formVisible && (
            <>
              <div className="d-flex justify-content-center align-items-center mb-4">
                <h1 className="h3 fw-bold text-center pt-4">Mis Viajes</h1>
              </div>
              <Card />
              <CalendarPage />
            </>
          )}
        </div>
      </ViajesProvider>
    </AuthProvider>
  )
}

export default App
