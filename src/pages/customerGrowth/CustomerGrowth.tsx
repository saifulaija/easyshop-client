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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { useGetCustomerGrowthOverTimeQuery } from "@/redux/features/dashboard/dashboardApi";
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
  newCustomers: number;
}

const CustomerGrowth= () => {
  const [view, setView] = useState<"daily" | "monthly" | "yearly">("daily");
  const {
    data: chartData,
    error,
    isLoading,
  } = useGetCustomerGrowthOverTimeQuery({ interval: view });

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading data!</p>;

  // Map data based on the selected interval
  let labels: string[] = [];
  let dataValues: number[] = [];

  if (view === "daily") {
    labels =
      chartData?.data?.map(
        (item: CustomerGrowthData) =>
          `${item._id.day}-${item._id.month}-${item._id.year}`
      ) || [];
    dataValues =
      chartData?.data?.map((item: CustomerGrowthData) => item.newCustomers) || [];
  } else if (view === "monthly") {
    labels =
      chartData?.data?.map(
        (item: CustomerGrowthData) => `${item._id.month}-${item._id.year}`
      ) || [];
    dataValues =
      chartData?.data?.map((item: CustomerGrowthData) => item.newCustomers) ||
      [];
  } else if (view === "yearly") {
    labels =
      chartData?.data?.map((item: CustomerGrowthData) => `${item._id.year}`) ||
      [];
    dataValues =
      chartData?.data?.map((item: CustomerGrowthData) => item.newCustomers) ||
      [];
  }

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: `New Customers by ${view}`,
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
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setView(e.target.value as "daily" | "monthly" | "yearly");
  };

  return (
    // <div className="w-[80%] mx-auto">
    //   <h1>Customer Growth Over Time</h1>
    //   <label htmlFor="interval-select">Select Interval: </label>
    //   <select
    //     id="interval-select"
    //     value={view}
    //     onChange={handleIntervalChange}
    //     className="mb-4 border border-gray-300 rounded p-2"
    //   >
    //     <option value="daily">Daily</option>
    //     <option value="monthly">Monthly</option>
    //     <option value="yearly">Yearly</option>
    //   </select>
    //   <Line data={data} options={options} />
    // </div>

    <div className="w-[80%] mx-auto p-4">
      <div className="flex flex-col  md:flex-row md:justify-between md:items-center mb-2">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0 text-gray-600">
          Customer Growth Rate
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
        <Line data={data} options={options} />
      )}
    </div>
  );
};

export default CustomerGrowth;
