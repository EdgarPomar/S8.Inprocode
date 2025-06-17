import React, { useEffect, useState } from 'react';
import { useViajes, Viaje } from '../contexts/viajeContext';

interface FormViajeProps {
  viajeEditar?: Viaje;
  onClose?: () => void;
}

const FormViaje: React.FC<FormViajeProps> = ({ viajeEditar, onClose }) => {
  const { crearViaje, editarViaje } = useViajes();

  const [formData, setFormData] = useState({
    lugar: '',
    fechaIda: '',
    fechaVuelta: '',
    imagen: '',
    descripcion: '',
    opinion: '',
  });

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
    }
  }, [viajeEditar]);

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
    };

    if (viajeEditar && viajeEditar._id) {
      await editarViaje({ ...viajeEditar, ...formateado });
    } else {
      await crearViaje(formateado);
    }

    if (onClose) onClose();

    setFormData({
      lugar: '',
      fechaIda: '',
      fechaVuelta: '',
      imagen: '',
      descripcion: '',
      opinion: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded p-4 max-w-md mx-auto">
      {['lugar', 'fechaIda', 'fechaVuelta', 'imagen', 'descripcion', 'opinion'].map((field) => (
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
