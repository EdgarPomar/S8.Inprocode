import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes que usa el gráfico de barras
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  labels: string[];
  values: number[];
}

const BarChart: React.FC<Props> = ({ labels, values }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Usuarios inscritos',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.7)', // barra color sólido
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Usuarios inscritos por viaje' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="card shadow-sm p-3">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
