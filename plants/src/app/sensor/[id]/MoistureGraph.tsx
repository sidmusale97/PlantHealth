// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ timestamps, data } : {timestamps: number[], data: number[]}) => {
  const labels = timestamps.map(timestamp => new Date(timestamp * 1000)); // Convert UNIX timestamps to Date objects

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset',
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <div style={{ height: '400px', width: '600px' }}>
      <Line data={chartData} />
    </div>
  );
};

export default LineChart;
