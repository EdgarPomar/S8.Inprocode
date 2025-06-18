import React, { useEffect, useState, useCallback } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { obtenerViajes, borrarViaje } from '../services/viajeService';
import FormViaje from './FormViaje';
import { Viaje } from '../contexts/viajeContext';

const Card: React.FC = () => {
  const [viajes, setViajes] = useState<Viaje[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [viajeSeleccionado, setViajeSeleccionado] = useState<Viaje | null>(null);

  const cargarViajes = useCallback(async () => {
    const data = await obtenerViajes();
    setViajes(data);
  }, []);

  useEffect(() => {
    cargarViajes();
  }, [cargarViajes]);

  const handleEdit = (viaje: Viaje) => {
    setViajeSeleccionado(viaje);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar este viaje?');
    if (confirmar) {
      const eliminado = await borrarViaje(id);
      if (eliminado) {
        cargarViajes();
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setViajeSeleccionado(null);
    cargarViajes();
  };

  return (
    <div className="container my-4">
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={() => {
          setViajeSeleccionado(null);
          setShowModal(true);
        }}
      >
        Crear Viaje
      </button>

      <div className="row g-4">
        {viajes.map((viaje) => (
          <div className="col-md-4" key={viaje._id}>
            <div className="card h-100 shadow-sm">
              {viaje.imagen && (
                <img src={viaje.imagen} className="card-img-top" alt={viaje.lugar} />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{viaje.lugar}</h5>
                <p className="card-text mb-2">
                  <strong>Ida:</strong> {new Date(viaje.fechaIda).toLocaleDateString()}<br />
                  <strong>Vuelta:</strong> {new Date(viaje.fechaVuelta).toLocaleDateString()}
                </p>
                {viaje.descripcion && <p className="card-text">{viaje.descripcion}</p>}
                {viaje.opinion && <p className="card-text"><em>{viaje.opinion}</em></p>}

                <div className="mt-auto d-flex justify-content-end gap-2">
                  <button
                    type='button'
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(viaje)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    type='button'
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(viaje._id!)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Bootstrap */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{viajeSeleccionado ? 'Editar Viaje' : 'Crear Viaje'}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <FormViaje viajeEditar={viajeSeleccionado ?? undefined} onClose={handleCloseModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
