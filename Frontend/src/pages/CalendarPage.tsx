import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { Tooltip } from 'bootstrap';

import { obtenerViajes } from '../services/viajeService';
import { Viaje } from '../contexts/viajeContext';

import './CalendarPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const CalendarPage: React.FC = () => {
  const [viajes, setViajes] = useState<Viaje[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerViajes();
      setViajes(data);
    };
    fetchData();
  }, []);

  const eventosViajes = viajes.map((v) => {
    const fechaVuelta = new Date(v.fechaVuelta);
    fechaVuelta.setDate(fechaVuelta.getDate() + 1);

    return {
      id: v._id,
      title: v.lugar,
      start: v.fechaIda,
      end: fechaVuelta.toISOString().split('T')[0],
      allDay: true,
      extendedProps: {
        lugar: v.lugar,
        fechaIda: v.fechaIda,
        fechaVuelta: v.fechaVuelta,
      },
    };
  });

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Calendario de Viajes y Festivos</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        locale="es"
        height="auto"
        googleCalendarApiKey={import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY}
        eventSources={[
          { events: eventosViajes, id: 'viajes' },
          {
            id: 'festivos',
            googleCalendarId: 'es.spain#holiday@group.v.calendar.google.com',
            className: 'festivo',
          },
        ]}
        eventClick={(info) => {
          if (info.event.source?.id === 'festivos') {
            info.jsEvent.preventDefault(); // Evita redirección al calendario
          }
        }}
        eventDidMount={(info) => {
          if (info.event.source?.id === 'viajes') {
            const props = info.event.extendedProps;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const tooltip = new Tooltip(info.el, {
              title: `
                <div class='tooltip-card'>
                  <strong>${props.lugar}</strong><br/>
                  <small><b>Ida:</b> ${props.fechaIda}</small><br/>
                  <small><b>Vuelta:</b> ${props.fechaVuelta}</small><br/>
                </div>
              `,
              html: true,
              placement: 'top',
              trigger: 'hover',
              container: 'body',
            });
          }
        }}
      />
    </div>
  );
};

export default CalendarPage;
