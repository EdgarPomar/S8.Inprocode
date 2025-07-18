import { Viaje } from '../contexts/viajeContext'; // ajusta la ruta si es diferente

export const obtenerViajes = async () => {
  const res = await fetch("http://localhost:3000/api/viajes", {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache", // ⚠️ fuerza al navegador a no usar caché
    },
  });

  return await res.json();
};


export const crearViaje = async (viaje: Viaje) => {
  const res = await fetch("http://localhost:3000/api/viajes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(viaje),
  });
  return res.ok;
};

export const actualizarViaje = async (id: string, viaje: Viaje) => {
  const res = await fetch(`http://localhost:3000/api/viajes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(viaje),
  });
  return res.ok;
};

export const borrarViaje = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/viajes/${id}`, { method: "DELETE" });
  return res.ok;
};

export const inscribirUsuario = async (viajeId: string, usuarioId: string) => {
  const res = await fetch(`http://localhost:3000/api/viajes/inscribir/${viajeId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuarioId }),
  });

  if (!res.ok) {
    // Opcional: Maneja el error para que no falle silenciosamente
    throw new Error('Error al inscribir usuario');
  }

  return await res.json();
};
