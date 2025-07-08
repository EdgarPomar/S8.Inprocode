import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // <-- Importa BrowserRouter
import App from './App.tsx';
import { AuthProvider } from './contexts/authContext';
import { ViajesProvider } from './contexts/viajeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'mapbox-gl/dist/mapbox-gl.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* <-- Envuelve aquí */}
      <AuthProvider>
        <ViajesProvider>
          <App />
        </ViajesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
