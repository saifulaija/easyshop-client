import { useState } from "react";
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetRepeatingCustomersQuery } from "@/redux/features/dashboard/dashboardApi";
import Loader from "@/components/shared/Loader/Loader";

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

const RepeatCustomers = () => {
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
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
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

  return (
    <div className="w-[80%] mx-auto p-4">
      <div className="flex flex-col  md:flex-row md:justify-between md:items-center mb-2">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0 text-gray-600">
          Repeated Customer Growth
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
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="relative h-[400px]">
          <Line data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default RepeatCustomers;
