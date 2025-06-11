import React, { useEffect, useState } from 'react';

interface Viaje {
  _id: string;
  lugar: string;
  fechaIda: string;
  fechaVuelta: string;
  imagen?: string;
  descripcion?: string;
  opinion?: string;
}

const Card: React.FC = () => {
  const [viajes, setViajes] = useState<Viaje[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/viajes')
      .then(res => res.json())
      .then(data => setViajes(data))
      .catch(err => console.error('Error al obtener viajes:', err));
  }, [viajes]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {viajes.map(viaje => (
        <div
          key={viaje._id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            width: '300px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          }}
        >
          <h2>{viaje.lugar}</h2>
          <p><strong>Ida:</strong> {new Date(viaje.fechaIda).toLocaleDateString()}</p>
          <p><strong>Vuelta:</strong> {new Date(viaje.fechaVuelta).toLocaleDateString()}</p>
          {viaje.imagen && (
            <img src={viaje.imagen} alt={viaje.lugar} style={{ width: '100%', height: 'auto' }} />
          )}
          <p>{viaje.descripcion}</p>
          <p><em>{viaje.opinion}</em></p>
        </div>
      ))}
    </div>
  );
};

export default Card;
