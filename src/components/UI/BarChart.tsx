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
  activityType,
}: any) {
  const transformedData = data?.chartData.map((item: any) => ({
    date: item.day, // Use the `day` field for the X-axis labels
    AM: item.morning ? 1 : 0, // Convert `morning` boolean to 0/1
    PM: item.evening ? 2 : 0, // Convert `evening` boolean to 0/1
    No: !item.morning && !item.evening ? 0.1 : null,
  }));

  const AM = activityType === "sobriety" ? "night" : "AM";
  const PM = activityType === "sobriety" ? "day" : "PM";

  // ChartJS data configuration
  const designdata = {
    labels: transformedData.map((item) => item.date), // X-axis labels (days)
    datasets: [
      {
        label: AM,
        data: transformedData.map((item) => item.AM),
        // backgroundColor: activityType === "sobriety" ? "#FFA500" : "#FFA500",// orange
        backgroundColor: activityType === "sobriety" 
        ? "#FFA500" 
        : activityType === "praying" 
          ? "#ffff" 
          : "#FFA500",
        borderWidth: 1,
        barThickness: 15,
        borderRadius: 5,
      },
      {
        label: PM,
        data: transformedData.map((item) => item.PM),
        backgroundColor: activityType === "sobriety" 
        ? "#ffff" 
        : activityType === "praying" 
          ? "#005Db3" 
          : "#00FF00", 
        borderWidth: 1,
        barThickness: 15,
        borderRadius: 5,
      },
      {
        label: "NO",
        data: transformedData.map((item) => item.No),
        backgroundColor:"red",// Red
        borderWidth: 1,
        barThickness: 15,
        borderRadius: 5,
      },
    ],
  };

  

  // ChartJS options configuration
  const options = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#FFFFFF", // White text for legend
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        borderColor: "#FFFFFF",
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            const datasetLabel = context.dataset.label || "";
            const value = context.raw;
  
            // Customize tooltips for AM and PM
            if (datasetLabel === "AM" && value === 1) {
              return "AM";
            } else if (datasetLabel === "PM" && value === 2) {
              return "PM";
            } else if (datasetLabel === "NO" && value === 0.1) {
              return "No Activity";
            }
            return "";
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#7C7C7C", // White labels for X-axis
        },
        grid: {
          display: false, // No gridlines on X-axis
        },
      },
      y: {
        ticks: {
          callback: (value: any) => {
            const labels = ["", AM, PM];
            return labels[value]; // Map numeric values to custom labels
          },
          color: "#7C7C7C", // White labels for Y-axis
        },
        grid: {
          color: "#7C7C7C", // Subtle gridlines for Y-axis
        },
        min: 0, // Minimum value on the Y-axis
        max: 2, // Maximum value (to match the 3 labels)
        stepSize: 1, // Step size to ensure only 3 ticks (0, 1, 2)
      },
    },
    maintainAspectRatio: false, // Allow resizing
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
             
            </div>
          </div>
          <div style={{ width: "100%", height: "320px" }}
          // className="relative w-full h-80 sm:h-96 md:h-[400px]"
          >
            <Bar data={designdata} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}
