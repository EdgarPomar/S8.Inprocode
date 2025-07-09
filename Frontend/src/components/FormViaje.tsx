import React, { useEffect, useState } from 'react';
import { useViajes, Viaje } from '../contexts/viajeContext';
import MapSelector from './MapSelector';
import { Place } from '../types/mapbox';

interface FormViajeProps {
  viajeEditar?: Viaje;
  onClose?: () => void;
  onViajeGuardado?: () => void; // ✅ Nueva prop para actualizar lista
}

const FormViaje: React.FC<FormViajeProps> = ({ viajeEditar, onClose, onViajeGuardado }) => {
  const { crearViaje, editarViaje } = useViajes();

  const [formData, setFormData] = useState({
    lugar: '',
    fechaIda: '',
    fechaVuelta: '',
    imagen: '',
    descripcion: '',
    opinion: '',
  });

  const [coords, setCoords] = useState<{ lng: number; lat: number } | null>(null);

  useEffect(() => {
    if (viajeEditar) {
      setFormData({
        lugar: viajeEditar.lugar || '',
        fechaIda: viajeEditar.fechaIda?.slice(0, 10) || '',
        fechaVuelta: viajeEditar.fechaVuelta?.slice(0, 10) || '',
        imagen: viajeEditar.imagen || '',
        descripcion: viajeEditar.descripcion || '',
        opinion: viajeEditar.opinion || '',
      });
      // Si tienes lat/lng en viajeEditar, asignalos aquí
      // setCoords({ lng: viajeEditar.lng, lat: viajeEditar.lat });
    }
  }, [viajeEditar]);

  const handlePlaceSelected = (place: Place) => {
    const fullName = `${place.name}${place.country ? ', ' + place.country : ''}`;
    setFormData(prev => ({ ...prev, lugar: fullName }));
    setCoords({ lng: place.lng, lat: place.lat });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formateado = {
      ...formData,
      fechaIda: new Date(formData.fechaIda).toISOString(),
      fechaVuelta: new Date(formData.fechaVuelta).toISOString(),
      ...coords,
    };

    if (viajeEditar && viajeEditar._id) {
      await editarViaje({ ...viajeEditar, ...formateado });
    } else {
      await crearViaje(formateado);
    }

    // ✅ Notificar a Card que debe recargar la lista
    if (onViajeGuardado) {
      onViajeGuardado();
    }

    // ✅ Cerrar modal si hay onClose
    if (onClose) {
      onClose();
    }

    // Limpiar formulario
    setFormData({
      lugar: '',
      fechaIda: '',
      fechaVuelta: '',
      imagen: '',
      descripcion: '',
      opinion: '',
    });
    setCoords(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded p-4 max-w-md mx-auto">
      <div className="mb-3">
        <label className="form-label">Lugar</label>
        <MapSelector onPlaceSelected={handlePlaceSelected} />
        <input
          type="text"
          readOnly
          value={formData.lugar}
          className="form-control mt-2"
          placeholder="Selecciona un lugar en el mapa"
        />
      </div>

      {['fechaIda', 'fechaVuelta', 'imagen', 'descripcion', 'opinion'].map((field) => (
        <div className="mb-3" key={field}>
          <label htmlFor={field} className="form-label">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          {field === 'descripcion' || field === 'opinion' ? (
            <textarea
              id={field}
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="form-control"
              rows={field === 'descripcion' ? 3 : 2}
            />
          ) : (
            <input
              id={field}
              name={field}
              type={field.includes('fecha') ? 'date' : 'text'}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              className="form-control"
            />
          )}
        </div>
      ))}

      <div className="text-end d-flex gap-2">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cerrar
        </button>
        <button type="submit" className="btn btn-primary">
          {viajeEditar ? 'Actualizar' : 'Crear Viaje'}
        </button>
      </div>
    </form>
  );
};

export default FormViaje;
