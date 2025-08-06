import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCharts = () => {
  const worldwideSalesData = {
    labels: ['USA', 'UK', 'Canada', 'Germany', 'Australia', 'India'],
    datasets: [
      {
        label: 'Sales',
        data: [1200, 1900, 3000, 500, 2000, 1500],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const salesRevenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [1200, 1500, 1800, 2000, 2500, 2200],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-12 col-xl-6">
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Worldwide Sales</h6>
              <a href="#">Show All</a>
            </div>
            <Bar data={worldwideSalesData} options={chartOptions} />
          </div>
        </div>
        <div className="col-sm-12 col-xl-6">
          <div className="bg-secondary text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Sales & Revenue</h6>
              <a href="#">Show All</a>
            </div>
            <Line data={salesRevenueData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
