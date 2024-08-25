// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   ChartData,
//   ChartOptions,
// } from "chart.js";

// import { Loader } from "lucide-react";
// import { useGetGeographicalCustomersQuery } from "@/redux/features/dashboard/dashboardApi";

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// interface GeoData {
//   _id: string;
//   customerCount: number;
// }

// const CustomerGeography = () => {
//   const {
//     data: geoData,
//     error,
//     isLoading,
//   } = useGetGeographicalCustomersQuery({});

//   if (isLoading) return <Loader />;
//   if (error) return <p>Error loading data!</p>;

//   const labels: string[] = geoData.data.map((item: GeoData) => item._id);
//   const dataValues: number[] = geoData.data.map(
//     (item: GeoData) => item.customerCount
//   );

//   const data: ChartData<"pie"> = {
//     labels,
//     datasets: [
//       {
//         label: "Customer Distribution",
//         data: dataValues,
//         backgroundColor: [
//           "#FF6384",
//           "#36A2EB",
//           "#FFCE56",
//           "#4BC0C0",
//           "#9966FF",
//           "#FF9F40",
//           "#FF6384",
//           "#36A2EB",
//           "#FFCE56",
//           "#4BC0C0",
//           "#9966FF",
//         ],
//         borderColor: [
//           "#FF6384",
//           "#36A2EB",
//           "#FFCE56",
//           "#4BC0C0",
//           "#9966FF",
//           "#FF9F40",
//           "#FF6384",
//           "#36A2EB",
//           "#FFCE56",
//           "#4BC0C0",
//           "#9966FF",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options: ChartOptions<"pie"> = {
//     responsive: true,
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: (context) => {
//             const label = context.label || "";
//             const value = context.raw || 0;
//             return `${label}: ${value} customers`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="w-[50%] mx-auto">
//       <h1>Geographical Distribution of Customers</h1>
//       <Pie data={data} options={options} />
//     </div>
//   );
// };

// export default CustomerGeography;

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useGetGeographicalCustomersQuery } from "@/redux/features/dashboard/dashboardApi";
import Loader from "@/components/shared/Loader/Loader";

// Create a custom icon for the markers
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // A sample icon, you can change it
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface GeoData {
  _id: string;
  customerCount: number;
}

const CustomerMap = () => {
  const {
    data: geoData,
    error,
    isLoading,
  } = useGetGeographicalCustomersQuery({});

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading data!</p>;

  const cityCoordinates: { [key: string]: [number, number] } = {
    Dinajpur: [25.6298, 88.6334],
    Khulna: [22.8456, 89.5403],
    Gazipur: [23.9999, 90.4203],
    Rajshahi: [24.3745, 88.6042],
    Mymensingh: [24.7471, 90.4203],
    Sylhet: [24.8949, 91.8687],
    Dhaka: [23.8103, 90.4125],
    Barishal: [22.701, 90.3535],
    Chattogram: [22.3475, 91.8123],
    Bogura: [24.8467, 89.3775],
    Cumilla: [23.4606, 91.1809],
  };

  return (
    <div className="h-[500px] w-[80%] mx-auto p-8">
      <h1 className="text-2xl font-semibold  md:mb-0 text-gray-600 text-center ">
         Customer Geography
      </h1>
      <MapContainer center={[23.685, 90.3563]} zoom={7} className="h-full mt-4 rounded-sm">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoData.data.map((item: GeoData) => {
          const coordinates = cityCoordinates[item._id];
          if (!coordinates) return null; // Skip if coordinates are not defined
          return (
            <Marker key={item._id} position={coordinates} icon={customIcon}>
              <Popup>
                {item._id}: {item.customerCount} customers
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default CustomerMap;
