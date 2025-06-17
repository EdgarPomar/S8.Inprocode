import { useRef } from 'react';
import Card from './components/Card';
import { ViajesProvider } from './contexts/viajeContext';
import FormViaje from './components/FormViaje';
import { Modal } from 'bootstrap';  // Importamos Modal de bootstrap

function App() {
  const modalRef = useRef<HTMLDivElement>(null);
  let bootstrapModal: Modal | null = null;

  const abrirModal = () => {
    if (modalRef.current) {
      bootstrapModal = new Modal(modalRef.current);
      bootstrapModal.show();
    }
  };

  return (
    <ViajesProvider>
      <div className="p-8 bg-light min-vh-100">
        <div className="d-flex justify-content-center align-items-center mb-4">
          <h1 className="h3 fw-bold text-center ">Mis Viajes</h1>
          
        </div>

        <Card />
        <button className="btn btn-success" onClick={abrirModal}>
            <i className="bi bi-plus-lg me-1"></i> Nuevo
          </button>
        {/* Modal Bootstrap Scrollable */}
        <div className="modal fade" ref={modalRef} tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nuevo Viaje</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div className="modal-body">
                <FormViaje />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ViajesProvider>
  );
}

export default App;
