export const obtenerViajes = async () => {
  const res = await fetch("http://localhost:3000/api/viajes");
  return await res.json();
};

export const crearViaje = async (viaje: []) => {
  const res = await fetch("http://localhost:3000/api/viajes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(viaje),
  });
  return res.ok;
};

export const actualizarViaje = async (id: string, viaje: []) => {
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
