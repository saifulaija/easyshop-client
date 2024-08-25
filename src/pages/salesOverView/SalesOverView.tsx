// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const SalesOverView: React.FC = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [view, setView] = useState<
//     "daily" | "monthly" | "quarterly" | "yearly"
//   >("daily");

//   useEffect(() => {
//     // Fetch data from the API
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/order/sales-measurement",
//           {
//             params: { interval: view },
//           }
//         );
//         console.log(response);
//         setData(response.data.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [view]); // Fetch data whenever `view` changes

//   // Prepare data for Chart.js

//   console.log(data);

//   const chartData = {
//     labels: data.map((item) => item._id),
//     datasets: [
//       {
//         label: "Total Sales",
//         data: data.map((item) => item.totalSales),
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//       {
//         label: "Count",
//         data: data.map((item) => item.count),
//         backgroundColor: "rgba(153, 102, 255, 0.2)",
//         borderColor: "rgba(153, 102, 255, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="w-[60%] mx-auto">
//       <h1>Sales Data</h1>
//       <select
//         value={view}
//         onChange={(e) =>
//           setView(
//             e.target.value as "daily" | "monthly" | "quarterly" | "yearly"
//           )
//         }
//       >
//         <option value="daily">Daily</option>
//         <option value="monthly">Monthly</option>
//         <option value="quarterly">Quarterly</option>
//         <option value="yearly">Yearly</option>
//       </select>

//       <Bar data={chartData} options={chartOptions} />
//     </div>
//   );
// };

// export default SalesOverView;


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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesOverView: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [view, setView] = useState<
    "daily" | "monthly" | "quarterly" | "yearly"
  >("daily");

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/order/sales-measurement",
          {
            params: { interval: view },
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [view]); // Fetch data whenever `view` changes

  // Prepare data for Chart.js
  const chartData = {
    labels: data.map((item) => {
      if (view === "quarterly") {
        return `Q${item._id.quarter} ${item._id.year}`;
      } else if (view === "yearly") {
        return `${item._id.year}`;
      } else if (view === "monthly") {
        const date = new Date(item._id.year, item._id.month - 1); // Assuming `_id.month` is 1-based
        return date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
      } else if (view === "daily") {
        const date = new Date(item._id.year, item._id.month - 1, item._id.day); // Assuming `_id.month` is 1-based
        return date.toLocaleDateString(); // Adjust format as needed
      } else {
        return item._id; // Fallback, just in case
      }
    }),
    datasets: [
      {
        label: "Total Sales",
        data: data.map((item) => item.totalSales),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
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
    <div className="w-[80%] mx-auto">
      <h1>Sales Data</h1>
      <select
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

      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default SalesOverView;
