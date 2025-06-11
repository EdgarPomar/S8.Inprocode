import React, { useState } from 'react';
import { useViajes } from '../contexts/viajeContext';

const FormViaje: React.FC = () => {
  const { crearViaje } = useViajes();
  const [formData, setFormData] = useState({
    lugar: '',
    fechaIda: '',
    fechaVuelta: '',
    imagen: '',
    descripcion: '',
    opinion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await crearViaje(formData);
    setFormData({ lugar: '', fechaIda: '', fechaVuelta: '', imagen: '', descripcion: '', opinion: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Nuevo Viaje</h2>

      <input name="lugar" placeholder="Lugar" value={formData.lugar} onChange={handleChange} required className="input" />
      <input type="date" name="fechaIda" value={formData.fechaIda} onChange={handleChange} required className="input" />
      <input type="date" name="fechaVuelta" value={formData.fechaVuelta} onChange={handleChange} required className="input" />
      <input name="imagen" placeholder="URL de imagen" value={formData.imagen} onChange={handleChange} className="input" />
      <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} rows={3} className="input" />
      <textarea name="opinion" placeholder="Opinión" value={formData.opinion} onChange={handleChange} rows={2} className="input" />

      <div className="text-right">
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Crear Viaje</button>
      </div>
    </form>
  );
};

export default FormViaje;