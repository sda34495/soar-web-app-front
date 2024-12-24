"use client";
import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import GraphTabs from "@/app/(dashboard)/components/GraphTabs";
import DropDownChat from "../UI/DropDownChat";

// Register Chart.js components
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

export default function CustomYAxisBarChart({
  user,
  data,
  updateActivity,
  updateFilter,
}: any) {
  const transformedData = data?.chartData.map((item: any) => ({
    date: item.day,
    AM: item.morning ? 1 : 0,
    PM: item.evening ? 2 : 0,
    No: !item.morning && !item.evening ? 0.1 : null,
  }));

  // ChartJS data configuration
  const designdata = {
    labels: transformedData.map((item) => item.date),
    datasets: [
      {
        label: "AM",
        data: transformedData.map((item) => item.AM),
        backgroundColor: "#FFA500",
        borderWidth: 1,
        barThickness: 15,
        borderRadius: 5,
      },
      {
        label: "PM",
        data: transformedData.map((item) => item.PM),
        backgroundColor: "#32CD32",
        borderWidth: 1,
        barThickness: 15,
        borderRadius: 5,
      },
      {
        label: "NO",
        data: transformedData.map((item) => item.No),
        backgroundColor: "red",
        borderWidth: 1,
        barThickness: 15,
        borderRadius: 5,
      },
    ],
  };

  // ChartJS options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#FFFFFF",
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#7C7C7C",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: (value: any) => {
            const labels = ["", "AM", "PM"];
            return labels[value];
          },
          color: "#7C7C7C",
        },
        grid: {
          color: "#7C7C7C",
        },
        min: 0,
        max: 2,
        stepSize: 1,
      },
    },
  };

  return (
    <>
      {user === "user" && <GraphTabs updateActivityType={updateActivity} />}
      <div className="bg-gradient-to-b overflow-hidden from-[#454545] to-[#3c3c3c] p-[1px] rounded-2xl">
        <div className="bg-[#121212] p-4 rounded-2xl">
          <div className="flex flex-row justify-between">
            <h2 className="text-white text-xl mb-4">Your Check-ins Stats</h2>
            <div className="flex flex-row gap-5 items-center">
              <p className="text-sm text-[#7C7C7C]">Last month</p>
              <DropDownChat updateFilter={updateFilter} />
              <img src="/vertical.svg" />
            </div>
          </div>
          <div className="relative w-full h-80 sm:h-96 md:h-[400px]">
            <Bar data={designdata} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}
