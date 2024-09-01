import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Box1Chart = () => {
    const system = useSelector((state) => state.user.systems);
    const location = useLocation();
    const getIdFromPath = () => {
        const pathSegments = location.pathname.split("/").filter(Boolean);
        return pathSegments[1];
    };
    const id = getIdFromPath();
    const device = system.find((item) => item._id === id);
    

  const chartData = {
      labels: device.params.map((item) => item.n),
    datasets: [
      {
        label: "Values",
            data: device.params.map((item) => item.v),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sensor Data",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    };

  return (
    <div className="flex justify-center items-center h-full  dark:bg-slate-800 mb-10 mt-4">
      <div className="w-full max-w-lg">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Box1Chart;
