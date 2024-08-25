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

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: `Growth Rate by ${view}`,
        data: [chartData.data.growthRate],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(220, 20, 60, 1)",
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
      // title: {
      //   display: true,
      //   text: "Sales Growth Rate",
      // },
    },
  };

  return (
    <div className="w-[80%] mx-auto p-4">
      <div className="flex flex-col  md:flex-row md:justify-between md:items-center mb-2">
        <h1 className="text-2xl font-semibold mb-4 md:mb-0 text-gray-600">
          Sales Growth Rate
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
        <Line data={data} options={options} />
      )}
    </div>
  );
};

export default SalesGrowth;
