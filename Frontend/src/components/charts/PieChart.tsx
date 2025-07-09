import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Registrar los elementos que usa el gráfico circular
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface Props {
  labels: string[];
  values: number[];
}

const PieChart: React.FC<Props> = ({ labels, values }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Usuarios inscritos',
        data: values,
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          // agrega más colores si tienes más segmentos
        ],
        borderColor: 'rgba(255, 255, 255, 1)', // borde blanco entre segmentos
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'right' as const },
      title: { display: true, text: 'Usuarios inscritos por viaje' },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="card shadow-sm p-3">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
