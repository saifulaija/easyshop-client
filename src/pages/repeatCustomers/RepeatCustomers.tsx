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
import { Loader } from "lucide-react";
import { useGetRepeatingCustomersQuery } from "@/redux/features/dashboard/dashboardApi";

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

interface CustomerGrowthData {
  _id: { day?: number; month: number; year: number };
  repeatCustomers: number;
}

const RepeatCustomers: React.FC = () => {
  const [view, setView] = useState<"daily" | "monthly" | "yearly">("daily");
  const {
    data: chartData,
    error,
    isLoading,
  } = useGetRepeatingCustomersQuery({ interval: view });

  // Handle loading and error states
  if (isLoading) return <Loader />;
  if (error) return <p>Error loading data!</p>;

  // Map data based on the selected interval
  const labels: string[] =
    chartData?.data?.map((item: CustomerGrowthData) => {
      if (view === "daily") {
        return `${item._id.day}-${item._id.month}-${item._id.year}`;
      } else if (view === "monthly") {
        return `${item._id.month}-${item._id.year}`;
      } else if (view === "yearly") {
        return `${item._id.year}`;
      }
      return "";
    }) || [];

  const dataValues: number[] =
    chartData?.data?.map((item: CustomerGrowthData) => item.repeatCustomers) ||
    [];

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Repeat Customers",
        data: dataValues,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 10,
        fill: false,
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    scales: {
      y: {
        beginAtZero: true,
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
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setView(e.target.value as "daily" | "monthly" | "yearly");
  };

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Repeated Customers</h1>
      <label htmlFor="interval-select" className="mr-2">
        Select Interval:
      </label>
      <select
        id="interval-select"
        value={view}
        onChange={handleIntervalChange}
        className="mb-4 border border-gray-300 rounded p-2"
      >
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <div className="relative h-[500px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default RepeatCustomers;
