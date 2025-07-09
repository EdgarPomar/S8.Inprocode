import React, { useEffect, useState, useCallback, useContext } from 'react';
import { obtenerViajes, borrarViaje, inscribirUsuario } from '../services/viajeService';
import { AuthContext } from '../contexts/authContext';
import FormViaje from './FormViaje';
import { Viaje } from '../contexts/viajeContext';

const Card: React.FC = () => {
  const [viajes, setViajes] = useState<Viaje[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [viajeSeleccionado, setViajeSeleccionado] = useState<Viaje | null>(null);
  const auth = useContext(AuthContext);

  const cargarViajes = useCallback(async () => {
    try {
      const data = await obtenerViajes();
      setViajes(data);
    } catch (error) {
      console.error('Error al cargar viajes:', error);
    }
  }, []);

  useEffect(() => {
    cargarViajes();
  }, [cargarViajes]);

  const handleInscribir = async (viajeId: string) => {
    if (!auth?.usuario?._id) {
      alert('Debes iniciar sesión para inscribirte');
      return;
    }
    const res = await inscribirUsuario(viajeId, auth.usuario._id);
    alert(res.mensaje);
    cargarViajes();
  };

  const handleEliminar = async (viajeId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este viaje?')) {
      await borrarViaje(viajeId);
      await cargarViajes(); // ✅ Recargar lista tras eliminar
    }
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
                <p className="card-text">
                  <strong>Ida:</strong> {new Date(viaje.fechaIda).toLocaleDateString()}<br />
                  <strong>Vuelta:</strong> {new Date(viaje.fechaVuelta).toLocaleDateString()}
                </p>
                <p className="card-text">
                  <strong>Inscritos:</strong> {viaje.inscritos?.length || 0}
                </p>

                <div className="mt-auto d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={() => handleInscribir(viaje._id!)}
                  >
                    Inscribirme
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      setViajeSeleccionado(viaje);
                      setShowModal(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminar(viaje._id!)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <FormViaje
                  viajeEditar={viajeSeleccionado ?? undefined}
                  onClose={() => setShowModal(false)}
                  onViajeGuardado={async () => {
                    await cargarViajes();     // ✅ Recargar lista
                    setShowModal(false);      // ✅ Cerrar modal
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
