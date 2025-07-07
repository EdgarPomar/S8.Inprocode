import { useContext, useState } from 'react'
import { AuthContext } from './contexts/authContext'
import ProtectedApp from './components/ProtectedApp'
import Placeholder from './components/Placeholder'
import LoginForm from './components/LoginForm'
import ResponsiveAppBar from './components/SearchNavbar'
import Card from './components/Card'
import CalendarPage from './pages/CalendarPage'

function App() {
  const authContext = useContext(AuthContext)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [view, setView] = useState<'card' | 'calendar' | 'graphics'>('card')

  if (!authContext) throw new Error('AuthContext no disponible')

  const { usuario, logout } = authContext

  // Función que hace logout y regresa a página de pega
  const handleLogout = () => {
    logout()
    setShowLoginForm(false) // vuelve a la página de pega
    setView('card') // Reset vista por si acaso
  }

  // Maneja clicks en el menú de navegación para cambiar la vista
  const handleNavClick = (page: string) => {
    if (page === 'calendar') setView('calendar')
    else if (page === 'card') setView('card')
    else if (page === 'graphics') setView('graphics')
    else setView('card')
  }

  if (!usuario) {
    if (showLoginForm) {
      return (
        <div className="container p-4 bg-light min-vh-100">
          <ResponsiveAppBar
            onMenuSelect={() => setShowLoginForm(true)}
            onLogout={handleLogout}
            onNavClick={handleNavClick}
            usuario={usuario}
          />
          <LoginForm />
        </div>
      )
    }

    return (
      <div className="p-4 bg-light min-vh-100">
        <ResponsiveAppBar
          onMenuSelect={() => setShowLoginForm(true)}
          onLogout={handleLogout}
          onNavClick={handleNavClick}
          usuario={usuario}
        />
        <Placeholder onContinue={() => setShowLoginForm(true)} />
      </div>
    )
  }

  return (
    <div className="p-4 bg-light min-vh-100">
      <ResponsiveAppBar
        onMenuSelect={() => setShowLoginForm(true)}
        onLogout={handleLogout}
        onNavClick={handleNavClick}
        usuario={usuario}
      />

      {/* Contenido según la vista seleccionada */}
      {view === 'card' && <Card />}
      {view === 'calendar' && <CalendarPage />}
      {view === 'graphics' && (
        <div className="text-center mt-4 text-muted" style={{ fontSize: '1.5rem' }}>
          🎨 Próximamente...
        </div>
      )}
    </div>
  )
}

export default App
