import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom' // 👈 IMPORTANTE
import { AuthContext } from '../contexts/authContext'
import 'bootstrap/dist/css/bootstrap.min.css'

interface ResponsiveAppBarProps {
  onLogout: () => void
  onNavClick: (page: string) => void
  usuario: { nombre: string } | null
}

function ResponsiveAppBar({ onLogout, onNavClick, usuario }: ResponsiveAppBarProps) {
  const auth = useContext(AuthContext)
  const navigate = useNavigate() // 👈 Hook para navegación
  if (!auth) throw new Error('AuthContext is undefined. ¿Olvidaste envolver la app con <AuthProvider>?')
  const { logout } = auth

  const [menuAvatarAbierto, setMenuAvatarAbierto] = useState(false)
  const [menuNavAbierto, setMenuNavAbierto] = useState(false)

  const toggleAvatarMenu = () => setMenuAvatarAbierto(!menuAvatarAbierto)
  const cerrarAvatarMenu = () => setMenuAvatarAbierto(false)
  const toggleNavMenu = () => setMenuNavAbierto(!menuNavAbierto)
  const cerrarNavMenu = () => setMenuNavAbierto(false)

  const handleGoTo = (path: string) => {
    navigate(path) // 👈 Navega directamente
    cerrarAvatarMenu()
  }

  const handleLogout = () => {
    logout()
    onLogout()
    cerrarAvatarMenu()
  }

  const handleNavItemClick = (page: string) => {
    onNavClick(page)
    cerrarNavMenu()
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#home">
          <img src="/logo.png" alt="Logo" height="50" className="d-none d-md-block me-2" />
          <img src="/logo.png" alt="Logo" height="40" className="d-md-none me-2" />
        </a>

        {/* Avatar + Nombre */}
        <div className="order-md-2 ms-auto d-flex align-items-center position-relative">
          <span className="text-white me-2">{usuario ? usuario.nombre : 'Invitado'}</span>
          <img
            src={'/profileLogo.png'}
            alt="User Avatar"
            width="32"
            height="32"
            className="rounded-circle"
            onClick={toggleAvatarMenu}
            style={{ cursor: 'pointer' }}
          />
          {menuAvatarAbierto && (
            <ul
              className="dropdown-menu dropdown-menu-end dropdown-menu-dark text-small show position-absolute"
              style={{ top: '40px', right: 0 }}
            >
              {usuario ? (
                <>
                  <li>
                    <span className="dropdown-item-text">👤 {usuario.nombre}</span>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button className="dropdown-item" onClick={() => handleGoTo('/register')}>
                      Registrarse
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => handleGoTo('/login')}>
                      Iniciar sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>

        {/* Menú hamburguesa */}
        <button className="navbar-toggler ms-2" type="button" onClick={toggleNavMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú navegación */}
        <div className={`collapse navbar-collapse order-md-1 ${menuNavAbierto ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {['card', 'calendar', 'graphics'].map(page => (
              <li className="nav-item" key={page}>
                <button
                  className="nav-link btn btn-link text-white"
                  onClick={() => handleNavItemClick(page)}
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default ResponsiveAppBar
