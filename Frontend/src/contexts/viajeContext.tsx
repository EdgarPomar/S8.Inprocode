import React, { createContext, useContext, useState } from 'react';

interface Viaje {
  _id?: string;
  lugar: string;
  fechaIda: string;
  fechaVuelta: string;
  imagen?: string;
  descripcion?: string;
  opinion?: string;
}

interface ViajeContextType {
  viajeSeleccionado: Viaje | null;
  setViajeSeleccionado: (viaje: Viaje | null) => void;
}

const ViajeContext = createContext<ViajeContextType | undefined>(undefined);

export const ViajeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viajeSeleccionado, setViajeSeleccionado] = useState<Viaje | null>(null);

  return (
    <ViajeContext.Provider value={{ viajeSeleccionado, setViajeSeleccionado }}>
      {children}
    </ViajeContext.Provider>
  );
};

export const useViajeContext = () => {
  const context = useContext(ViajeContext);
  if (!context) throw new Error('useViajeContext debe usarse dentro de ViajeProvider');
  return context;
};
