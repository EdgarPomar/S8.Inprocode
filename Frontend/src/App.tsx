import { useContext, useState } from 'react'
import { AuthContext } from './contexts/authContext'
import ProtectedApp from './components/ProtectedApp'
import Placeholder from './components/Placeholder'
import LoginForm from './components/LoginForm'
import ResponsiveAppBar from './components/SearchNavbar'

function App() {
  const authContext = useContext(AuthContext)
  const [showLoginForm, setShowLoginForm] = useState(false)

  if (!authContext) throw new Error('AuthContext no disponible')

  const { usuario, logout } = authContext

  // Función que hace logout y regresa a página de pega
  const handleLogout = () => {
    logout()
    setShowLoginForm(false) // vuelve a la página de pega
  }

  if (!usuario) {
    if (showLoginForm) {
      return (
        <div className="container p-4 bg-light min-vh-100">
          <ResponsiveAppBar
            onMenuSelect={() => setShowLoginForm(true)}
            onLogout={handleLogout}
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
        usuario={usuario}
      />
      <ProtectedApp />
    </div>
  )
}


export default App
