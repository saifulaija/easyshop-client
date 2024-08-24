import Home from "@/components/home/Home";
import HomeLayout from "@/components/layout/HomeLayout";
import NotFound from "@/components/shared/NotFound/NotFound";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import { createBrowserRouter } from "react-router-dom";

const router= createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <NotFound />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
        //   {
        //     path: "product/:id",
        //     element: <ProductDetails />,
     
        //   },
    
          {
            path: "login",
            element: <Login />,
          },
        //   {
        //     path:'forget-password',
        //     element:<ForgotPasswordPage/>
        //   },
        //   {
        //     path:'reset-password',
        //     element:<ResetPassword/>
        //   },
          {
            path: "register",
            element: <Register />,
          },
        //   {
        //     path: "complain",
        //     element: <ExchangeAndComplain />,
        //   },
        //   {
        //     path: "checkout",
        //     element: <CheckoutPage />,
        //   },
        //   {
        //     path: "success",
        //     element: <Success />,
        //   },
        //   {
        //     path: "checkout",
        //     element: <CheckoutPage />,
        //   },
        //   {
        //     path: "error",
        //     element: <Error />,
        //   },
        //   {
        //     path: "order/:id",
        //     element: <OrderSuccess />,
        //   },
        ],
      },
])

export default router