import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

import { Loader } from "lucide-react";
import { useGetCohortLifetimeValueQuery } from "@/redux/features/dashboard/dashboardApi";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CLVData {
  cohort: string;
  customerCount: number;
  totalLifetimeValue: number;
}

const CohortLifetimeValue = () => {
  const {
    data: clvData,
    error,
    isLoading,
  } = useGetCohortLifetimeValueQuery({});

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading data!</p>;

  const labels: string[] = clvData.data.map((item: CLVData) => item.cohort);
  const customerCounts: number[] = clvData.data.map(
    (item: CLVData) => item.customerCount
  );
  const totalLifetimeValues: number[] = clvData.data.map(
    (item: CLVData) => item.totalLifetimeValue
  );

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Customer Count",
        data: customerCounts,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
        yAxisID: "y1",
      },
      {
        label: "Total Lifetime Value",
        data: totalLifetimeValues,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
        borderWidth: 1,
        yAxisID: "y2",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      y1: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Customer Count",
        },
      },
      y2: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Total Lifetime Value ($)",
        },
        grid: {
          drawOnChartArea: false, // Avoid drawing the grid lines for y2 over y1
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Customer Lifetime Value by Cohorts",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.raw || 0;
            if (label === "Total Lifetime Value") {
              return `${label}: $${value}`;
            }
            return `${label}: ${value}`;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="w-[80%] mx-auto">
      <h1>Customer Lifetime Value by Cohorts</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CohortLifetimeValue;
