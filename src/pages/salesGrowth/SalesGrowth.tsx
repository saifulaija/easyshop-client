import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";

import Loader from "@/components/shared/Loader/Loader";
import { useGetSellsGrowthRateQuery } from "@/redux/features/dashboard/dashboardApi";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesGrowth: React.FC = () => {
  const [view, setView] = useState<
    "daily" | "monthly" | "quarterly" | "yearly"
  >("daily");
  const {
    data: chartData,
    error,
    isLoading,
  } = useGetSellsGrowthRateQuery({ interval: view });



  

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading data!</p>;

  // Format the labels based on the selected view
  const getLabels = () => {
    if (!chartData?.data) return [];

    const { currentPeriod, previousPeriod } = chartData.data;

    if (view === "daily") {
      return [
        `${previousPeriod.day}/${previousPeriod.month}/${previousPeriod.year}`,
        `${currentPeriod.day}/${currentPeriod.month}/${currentPeriod.year}`,
      ];
    } else if (view === "monthly") {
      return [
        `${previousPeriod.month}/${previousPeriod.year}`,
        `${currentPeriod.month}/${currentPeriod.year}`,
      ];
    } else if (view === "quarterly") {
      return [
        `Q${previousPeriod.quarter} ${previousPeriod.year}`,
        `Q${currentPeriod.quarter} ${currentPeriod.year}`,
      ];
    } else if (view === "yearly") {
      return [`${previousPeriod.year}`, `${currentPeriod.year}`];
    }
    return [];
  };

  const labels = getLabels();
  const growthRates = [
    chartData.data.previousPeriod.growthRate,
    chartData.data.currentPeriod.growthRate,
  ];

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Growth Rate",
        data: [chartData.data.growthRate],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointStyle: "rectRounded",
        pointRadius: 10,
        pointHoverRadius: 15,
        fill: false,
        yAxisID: "y-axis-1",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    scales: {
      y: {
        beginAtZero: true,
        position: "left",
      },
      "y-axis-1": {
        beginAtZero: true,
        position: "right",
      },
    },
    elements: {
      line: {
        tension: 0.4,
        cubicInterpolationMode: "monotone",
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Growth Rate",
      },
    },
  };

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-center text-2xl font-semibold mb-4">
        Sales Growth Chart
      </h1>
      <select
        className="mb-4 p-2 border border-gray-300 rounded"
        value={view}
        onChange={(e) =>
          setView(
            e.target.value as "daily" | "monthly" | "quarterly" | "yearly"
          )
        }
      >
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="yearly">Yearly</option>
      </select>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesGrowth;
