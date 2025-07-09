import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Props {
  labels: string[];
  values: number[];
}

const LineChart: React.FC<Props> = ({ labels, values }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Usuarios inscritos',
        data: values,
        borderColor: 'rgba(75, 192, 192, 0.7)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Usuarios inscritos por viaje' },
    },
  };

  return (
    <div className="card shadow-sm p-3">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
