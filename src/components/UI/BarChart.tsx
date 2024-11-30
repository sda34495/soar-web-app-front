'use client';
import React from 'react';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

export default function CustomYAxisBarChart() {
  // Data for the chart
  const rawData = [
    { date: '01', AM: 1, PM: 2, NO: 0 },
    { date: '02', AM: 1, PM: 2, NO: 0 },
    { date: '03', AM: 1, PM: 2, NO: 0 },
    { date: '04', AM: 0, PM: 0, NO: 2 },
    { date: '05', AM: 1, PM: 0, NO: 0 },
    { date: '06', AM: 1, PM: 0, NO: 0 },
    { date: '07', AM: 1, PM: 2, NO: 0 },
    { date: '08', AM: 0, PM: 2, NO: 0 },
    { date: '09', AM: 0, PM: 0, NO: 0.5 },
    { date: '10', AM: 1, PM: 0, NO: 0 },
    { date: '11', AM: 1, PM: 0, NO: 0 },
    { date: '12', AM: 1, PM: 2, NO: 0 },
    { date: '13', AM: 0, PM: 2, NO: 0 },
    { date: '14', AM: 1, PM: 2, NO: 0 },
    { date: '15', AM: 1, PM: 2, NO: 0 },
    { date: '16', AM: 0, PM: 2, NO: 0 },
    { date: '17', AM: 1, PM: 0, NO: 0 },
    { date: '18', AM: 1, PM: 0, NO: 0 },
    { date: '19', AM: 1, PM: 2, NO: 0 },
    { date: '20', AM: 0, PM: 2, NO: 0 },
    { date: '21', AM: 0, PM: 2, NO: 0 },
    { date: '22', AM: 0, PM: 0, NO: 2 },
    { date: '23', AM: 0, PM: 0, NO: 2 },
    { date: '24', AM: 0, PM: 2, NO: 0 },
    { date: '25', AM: 1, PM: 2, NO: 0 },
    { date: '26', AM: 1, PM: 2, NO: 0 },
    { date: '27', AM: 0, PM: 2, NO: 0 },
    { date: '28', AM: 1, PM: 0, NO: 0 },
    { date: '29', AM: 1, PM: 0, NO: 0 },
    { date: '30', AM: 0, PM: 0, NO: 2 },
  ];

  // ChartJS data configuration
  const data = {
    labels: rawData.map((item) => item.date), // X-axis labels (dates)
    datasets: [
      {
        label: 'AM',
        data: rawData.map((item) => item.AM),
        backgroundColor: '#FFA500', // Orange
        borderWidth: 1,
        barThickness: 20,
        borderRadius: 5,
      },
      {
        label: 'PM',
        data: rawData.map((item) => item.PM),
        backgroundColor: '#32CD32', // Green
        borderWidth: 1,
        barThickness: 20,    
        borderRadius: 5,
      },
      {
        label: 'No Check-in',
        data: rawData.map((item) => item.NO),
        backgroundColor: '#FF4500', // Red
        borderWidth: 1,
        barThickness: 20,
        borderRadius: 5,
      },
    ],
  };

  // ChartJS options configuration
  const options = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FFFFFF', // White text for legend
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF', // White labels for X-axis
        },
        grid: {
          display: false, // No gridlines on X-axis
        },
      },
      y: {
        ticks: {
          callback: (value) => {
            const labels = ['NO', 'AM', 'PM'];
            return labels[value]; // Map numeric values to custom labels
          },
          color: '#FFFFFF', // White labels for Y-axis
        },
        grid: {
          color: '#444444', // Subtle gridlines for Y-axis
        },
        min: 0, // Minimum value on the Y-axis
        max: 2, // Maximum value (to match the 3 labels)
        stepSize: 1, // Step size to ensure only 3 ticks (0, 1, 2)
      },
    },
    maintainAspectRatio: false, // Allow resizing
  };

  return (


    <div className="bg-gradient-to-b overflow-hidden from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl">
    <div className="bg-[#121212] p-4 rounded-2xl">
      <h2 className="text-white text-xl mb-4">Your Check-ins Stats</h2>
      <div style={{ width: '100%', height: '320px' }}>
        <Bar data={data} options={options} />
      </div>
      </div>
    </div>
  );
}
