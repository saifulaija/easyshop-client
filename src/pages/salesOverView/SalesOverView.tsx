import React, { useState, useEffect } from "react";
import axios from "axios";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type SalesData = {
  _id: {
    year: number;
    month?: number;
    day?: number;
    quarter?: number;
  };
  totalSales: number;
};

const SalesOverView: React.FC = () => {
  const [data, setData] = useState<SalesData[]>([]);
  const [view, setView] = useState<
    "daily" | "monthly" | "quarterly" | "yearly"
  >("daily");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/order/sales-measurement",
          {
            params: { interval: view },
          }
        );
        setData(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load sales data. Please try again later.");
      }
    };

    fetchData();
  }, [view]);

  const chartData = {
    labels: data.map((item) => {
      if (view === "quarterly") {
        return `Q${item._id.quarter} ${item._id.year}`;
      } else if (view === "yearly") {
        return `${item._id.year}`;
      } else if (view === "monthly") {
        const date = new Date(item._id.year, item._id.month! - 1);
        return date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
      } else if (view === "daily") {
        const date = new Date(item._id.year, item._id.month! - 1, item._id.day);
        return date.toLocaleDateString();
      }
      return "";
    }),
    datasets: [
      {
        label: `Total sales by ${view}`,
        data: data.map((item) => item.totalSales),

        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(220, 20, 60, 1)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        cubicInterpolationMode: "monotone",
        fill: false,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-[80%] mx-auto p-4">
      <div className="flex flex-col  md:flex-row md:justify-between md:items-center mb-2">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0 text-gray-600">
          Sales Overview
        </h1>

        <div className="w-full md:w-auto">
          <Select
            onValueChange={(value) => setView(value as typeof view)}
            value={view}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default SalesOverView;
