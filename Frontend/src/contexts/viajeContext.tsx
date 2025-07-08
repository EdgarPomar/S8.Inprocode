/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Viaje {
  _id?: string;
  lugar: string;
  fechaIda: string;
  fechaVuelta: string;
  imagen?: string;
  descripcion?: string;
  opinion?: string;
  inscritos?: string[]; 
}

interface ViajesContextProps {
  viajes: Viaje[];
  viajeActual: Viaje | null;
  cargarViajes: () => void;
  crearViaje: (nuevoViaje: Viaje) => void;
  editarViaje: (viajeActualizado: Viaje) => void;
  eliminarViaje: (id: string) => void;
  seleccionarViaje: (viaje: Viaje) => void;
  limpiarViajeActual: () => void;
}

const ViajesContext = createContext<ViajesContextProps | undefined>(undefined);

export const useViajes = () => {
  const context = useContext(ViajesContext);
  if (!context) throw new Error('useViajes debe usarse dentro de un ViajesProvider');
  return context;
};

export const ViajesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viajes, setViajes] = useState<Viaje[]>([]);
  const [viajeActual, setViajeActual] = useState<Viaje | null>(null);

  const cargarViajes = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/viajes');
      const data = await res.json();
      setViajes(data);
    } catch (err) {
      console.error('Error al cargar viajes', err);
    }
  };

  const crearViaje = async (nuevoViaje: Viaje) => {
    try {
      const res = await fetch('http://localhost:3000/api/viajes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoViaje),
      });
      if (res.ok) cargarViajes();
    } catch (err) {
      console.error('Error al crear viaje:', err);
    }
  };

  const editarViaje = async (viajeActualizado: Viaje) => {
    try {
      if (!viajeActualizado._id) return;
      const res = await fetch(`http://localhost:3000/api/viajes/${viajeActualizado._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(viajeActualizado),
      });
      if (res.ok) {
        cargarViajes();
        limpiarViajeActual();
      }
    } catch (err) {
      console.error('Error al editar viaje:', err);
    }
  };

  const eliminarViaje = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/api/viajes/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) cargarViajes();
    } catch (err) {
      console.error('Error al eliminar viaje:', err);
    }
  };

  const seleccionarViaje = (viaje: Viaje) => setViajeActual(viaje);
  const limpiarViajeActual = () => setViajeActual(null);

  useEffect(() => {
    cargarViajes();
  }, []);

  return (
    <ViajesContext.Provider
      value={{
        viajes,
        viajeActual,
        cargarViajes,
        crearViaje,
        editarViaje,
        eliminarViaje,
        seleccionarViaje,
        limpiarViajeActual,
      }}
    >
      {children}
    </ViajesContext.Provider>
  );
};
