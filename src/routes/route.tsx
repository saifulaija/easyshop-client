
import Home from "@/components/dadhboard/home/Home";
import HomeLayout from "@/components/layout/HomeLayout";
import NotFound from "@/components/shared/NotFound/NotFound";
import CohortLifetimeValue from "@/pages/cohortLifetimeValue/CohortLifetimeValue";
import CustomerGeography from "@/pages/customerGeography/CustomerGeography";
import CustomerGrowth from "@/pages/customerGrowth/CustomerGrowth";
import RepeatCustomers from "@/pages/repeatCustomers/RepeatCustomers";
import SalesGrowth from "@/pages/salesGrowth/SalesGrowth";
import SalesOverView from "@/pages/salesOverView/SalesOverView";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "sales_over_time",
        element: <SalesOverView />,
      },

      {
        path: "sales_growth_rate",
        element: <SalesGrowth />,
      },
      {
        path: "repeat_customers",
        element: <RepeatCustomers />,
      },
      {
        path: "customers_growth",
        element: <CustomerGrowth />,
      },
      {
        path: "customer_geography",
        element: <CustomerGeography />,
      },
      {
        path: "cohort_lifetime_value",
        element: <CohortLifetimeValue />,
      },
    ],
  },
]);

export default router;
