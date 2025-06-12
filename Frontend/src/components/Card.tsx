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
  }, []); // <- Corregido para que no sea una llamada infinita

  return (
    <div className="container my-4">
      <div className="row g-4">
        {viajes.map(viaje => (
          <div className="col-md-4" key={viaje._id}>
            <div className="card h-100 shadow-sm">
              {viaje.imagen && (
                <img src={viaje.imagen} className="card-img-top" alt={viaje.lugar} />
              )}
              <div className="card-body">
                <h5 className="card-title">{viaje.lugar}</h5>
                <p className="card-text">
                  <strong>Ida:</strong> {new Date(viaje.fechaIda).toLocaleDateString()}<br />
                  <strong>Vuelta:</strong> {new Date(viaje.fechaVuelta).toLocaleDateString()}
                </p>
                {viaje.descripcion && <p className="card-text">{viaje.descripcion}</p>}
                {viaje.opinion && <p className="card-text"><em>{viaje.opinion}</em></p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
