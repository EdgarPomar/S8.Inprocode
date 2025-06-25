import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const pages = ['Calendar', 'Graphics'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#app-bar-with-responsive-menu">
          <img src="/logo.png" alt="Logo" height="50" className="d-none d-md-block me-2" />
          <img src="/logo.png" alt="Logo" height="40" className="d-md-none me-2" />
        </a>

        {/* Avatar - SIEMPRE visible */}
        <div className="order-md-2 ms-auto d-flex">
          <div className="dropdown">
            <a
              href="#settings"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="/profileLogo.png"
                alt="User Avatar"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark text-small" aria-labelledby="userDropdown">
              {settings.map((setting) => (
                <li key={setting}>
                  <a className="dropdown-item" href={`#${setting.toLowerCase()}`}>{setting}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler ms-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido colapsable (solo navigation) */}
        <div className="collapse navbar-collapse order-md-1" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {pages.map((page) => (
              <li className="nav-item" key={page}>
                <a className="nav-link" href={`#${page.toLowerCase()}`}>{page}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default ResponsiveAppBar;
