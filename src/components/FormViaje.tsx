import React, { useState } from 'react';

const FormViaje: React.FC = () => {
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

    try {
      const response = await fetch('http://localhost:3000/api/viajes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Viaje creado correctamente');
        setFormData({
          lugar: '',
          fechaIda: '',
          fechaVuelta: '',
          imagen: '',
          descripcion: '',
          opinion: '',
        });
      } else {
        alert('Error al crear el viaje');
      }
    } catch (err) {
      console.error('Error al enviar el formulario:', err);
      alert('Error al enviar los datos');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', maxWidth: '500px' }}>
      <h2>Nuevo Viaje</h2>

      <input
        type="text"
        name="lugar"
        placeholder="Lugar"
        value={formData.lugar}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="date"
        name="fechaIda"
        value={formData.fechaIda}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="date"
        name="fechaVuelta"
        value={formData.fechaVuelta}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="text"
        name="imagen"
        placeholder="URL de imagen"
        value={formData.imagen}
        onChange={handleChange}
      />
      <br />

      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
        rows={3}
      />
      <br />

      <textarea
        name="opinion"
        placeholder="Opinión"
        value={formData.opinion}
        onChange={handleChange}
        rows={2}
      />
      <br />

      <button type="submit">Crear Viaje</button>
    </form>
  );
};

export default FormViaje;
