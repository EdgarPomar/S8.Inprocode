import React, { useEffect, useState } from 'react';
import { obtenerViajes } from '../services/viajeService';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';

const GraphicsPage: React.FC = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const viajes = await obtenerViajes();
        setLabels(viajes.map((v: { lugar: string }) => v.lugar));
        setValues(viajes.map((v: { inscritos: unknown[] }) => v.inscritos.length));
      } catch (err) {
        console.error('Error al cargar viajes:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">📊 Usuarios inscritos por viaje</h2>

      <div className="row gy-4">
        <div className="col-12 col-md-6 col-lg-4">
          <h5 className="text-center mb-3">Gráfico de Líneas</h5>
          <LineChart labels={labels} values={values} />
        </div>

        <div className="col-12 col-md-12 col-lg-4">
          <h5 className="text-center mb-3">Gráfico de Pastel</h5>
          <PieChart labels={labels} values={values} />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <h5 className="text-center mb-3">Gráfico de Barras</h5>
          <BarChart labels={labels} values={values} />
        </div>
        
      </div>
    </div>
  );
};

export default GraphicsPage;
