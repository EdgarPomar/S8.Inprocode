// src/pages/CalendarPage.tsx
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { obtenerViajes } from '../services/viajeService';
import { Viaje } from '../contexts/viajeContext';
// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';

const CalendarPage: React.FC = () => {
  const [viajes, setViajes] = useState<Viaje[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerViajes();
      setViajes(data);
    };
    fetchData();
  }, []);

  const eventos = viajes.map(v => {
  const fechaVuelta = new Date(v.fechaVuelta);
  fechaVuelta.setDate(fechaVuelta.getDate() + 1); // ⬅️ Incluir el último día

  return {
    id: v._id,
    title: v.lugar,
    start: v.fechaIda,
    end: fechaVuelta.toISOString().split('T')[0], // formato YYYY-MM-DD
    allDay: true,
  };
});


  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Calendario de Viajes</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={eventos}
        locale="es"
        height="auto"
      />
    </div>
  );
};

export default CalendarPage;
