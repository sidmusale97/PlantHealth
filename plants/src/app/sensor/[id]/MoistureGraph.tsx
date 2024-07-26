// LineChart.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

import 'chartjs-adapter-moment';

// Register necessary Chart.js components
ChartJS.register(
    TimeScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement, // Register the PointElement
    LineElement    // Register the LineElement
  );

export default function MoistureGraph({ id }: { id: number }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Humidity',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  const fetchData = async () => {
    try {
      const beUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await fetch(`${beUrl}/moisture?sensor_id=${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await res.json();
      const ts = result.timestamps;
      const labels = ts.map((timestamp: number) => new Date(timestamp * 1000)); // Convert UNIX timestamps to Date objects
      const updatedChartData = {
        labels: labels,
        datasets: [
          {
            ...chartData.datasets[0],
            data: result.humidities,
          },
        ],
      };

      setChartData(updatedChartData);
      console.log(updatedChartData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error state or display error message
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
  }, [id]);

  const options = {
    plugins: {
        title: {
          display: true,  // Show the title
          text: 'Moisture Levels Over Time',  // Title text
          font: {
            size: 18,   // Font size for the title
          },
          padding: {
            top: 10,    // Padding above the title
            bottom: 30  // Padding below the title
          }
        },
      },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const, // Specify the time unit ('day', 'month', 'year', etc.)
          tooltipFormat: 'MMMM D, YYYY h:mm:ss a', // Tooltip format
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Humidity %',
        },
      },
    } as any, // Using 'any' to bypass type-checking temporarily for 'options'


  };

  return (
    <div className= "object-cover" style={{ height: '700px', width: '800px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}