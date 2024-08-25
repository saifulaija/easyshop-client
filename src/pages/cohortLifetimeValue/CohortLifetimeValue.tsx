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

import { useGetCohortLifetimeValueQuery } from "@/redux/features/dashboard/dashboardApi";
import Loader from "@/components/shared/Loader/Loader";

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

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading data. Please try again later.
      </div>
    );
  }

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
        backgroundColor: "rgba(54, 162, 235, 0.7)", // Semi-transparent blue
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        yAxisID: "y1",
      },
      {
        label: "Total Lifetime Value",
        data: totalLifetimeValues,
        backgroundColor: "rgba(255, 99, 132, 0.7)", // Semi-transparent red
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        yAxisID: "y2",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y1: {
        type: "linear",
        position: "left",
        beginAtZero: true,
        title: {
          display: true,
          text: "Customer Count",
          font: {
            size: 14,
          },
        },
      },
      y2: {
        type: "linear",
        position: "right",
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Lifetime Value ($)",
          font: {
            size: 14,
          },
        },

        grid: {
          drawOnChartArea: false,
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
        padding: {
          top: 20,
          bottom: 30,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.raw || 0;
            if (label === "Total Lifetime Value") {
              return `${label}: $${value.toLocaleString()}`;
            }
            return `${label}: ${value.toLocaleString()}`;
          },
        },
      },
      legend: {
        position: "top",
        labels: {
          padding: 20,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <div className="w-[80%] mx-auto">
      <div className="relative h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CohortLifetimeValue;
