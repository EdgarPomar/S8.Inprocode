import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

// const pages = ['Calendar', 'Graphics']

// Agrega props:
function ResponsiveAppBar({ onMenuSelect }: { onMenuSelect: (form: 'register' | 'login') => void }) {
  const [menuAvatarAbierto, setMenuAvatarAbierto] = useState(false)
  const [menuNavAbierto, setMenuNavAbierto] = useState(false)

  const toggleAvatarMenu = () => setMenuAvatarAbierto(!menuAvatarAbierto)
  const cerrarAvatarMenu = () => setMenuAvatarAbierto(false)

  const toggleNavMenu = () => setMenuNavAbierto(!menuNavAbierto)
  const cerrarNavMenu = () => setMenuNavAbierto(false)

  const handleClick = (form: 'register' | 'login') => {
    onMenuSelect(form)
    cerrarAvatarMenu()
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#home">
          <img src="/logo.png" alt="Logo" height="50" className="d-none d-md-block me-2" />
          <img src="/logo.png" alt="Logo" height="40" className="d-md-none me-2" />
        </a>

        {/* Avatar */}
        <div className="order-md-2 ms-auto d-flex position-relative">
          <img
            src="/profileLogo.png"
            alt="User Avatar"
            width="32"
            height="32"
            className="rounded-circle"
            onClick={toggleAvatarMenu}
            style={{ cursor: 'pointer' }}
          />
          {menuAvatarAbierto && (
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark text-small show position-absolute" style={{ top: '40px', right: 0 }}>
              <li><button className="dropdown-item" onClick={() => handleClick('register')}>Register</button></li>
              <li><button className="dropdown-item" onClick={() => handleClick('login')}>Login</button></li>
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
            {['Calendar', 'Graphics'].map(page => (
              <li className="nav-item" key={page}>
                <a className="nav-link" href={`#${page.toLowerCase()}`} onClick={cerrarNavMenu}>{page}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default ResponsiveAppBar

