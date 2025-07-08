// src/components/Placeholder.tsx
import React from 'react';

interface PlaceholderProps {
  onContinue: () => void;
}

const Placeholder: React.FC<PlaceholderProps> = ({ onContinue }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 px-4 text-center"
      style={{
        background: 'linear-gradient(135deg, #6DD5FA 0%, #2980B9 100%)',
        color: 'white',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1
        className="mb-3"
        style={{
          fontWeight: '900',
          fontSize: '3rem',
          textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        ¡Tu aventura comienza aquí!
      </h1>

      <p
        className="mb-5"
        style={{
          fontSize: '1.25rem',
          maxWidth: '600px',
          lineHeight: '1.6',
          textShadow: '1px 1px 6px rgba(0,0,0,0.2)',
        }}
      >
        Descubre destinos increíbles, experiencias únicas y ofertas exclusivas diseñadas solo para ti.
        Explora el mundo con nuestra agencia de viajes y haz que cada viaje sea inolvidable.
      </p>

      <button
        onClick={onContinue}
        className="btn btn-light btn-lg"
        style={{
          minWidth: '220px',
          fontWeight: '600',
          color: '#2980B9',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => {
          const btn = e.currentTarget;
          btn.style.backgroundColor = '#fff';
          btn.style.color = '#1c5980';
          btn.style.transform = 'scale(1.05)';
          btn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={e => {
          const btn = e.currentTarget;
          btn.style.backgroundColor = '';
          btn.style.color = '#2980B9';
          btn.style.transform = 'scale(1)';
          btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        }}
      >
        Continuar
      </button>
    </div>
  );
};

export default Placeholder;
