
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

import { Loader } from "lucide-react";
import { useGetGeographicalCustomersQuery } from "@/redux/features/dashboard/dashboardApi";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface GeoData {
  _id: string;
  customerCount: number;
}

const CustomerGeography = () => {
  const {
    data: geoData,
    error,
    isLoading,
  } = useGetGeographicalCustomersQuery({});

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading data!</p>;

  const labels: string[] = geoData.data.map((item: GeoData) => item._id);
  const dataValues: number[] = geoData.data.map(
    (item: GeoData) => item.customerCount
  );

  const data: ChartData<"pie"> = {
    labels,
    datasets: [
      {
        label: "Customer Distribution",
        data: dataValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value} customers`;
          },
        },
      },
    },
  };

  return (
    <div className="w-[50%] mx-auto">
      <h1>Geographical Distribution of Customers</h1>
      <Pie data={data} options={options} />
    </div>
  );
};

export default CustomerGeography;
