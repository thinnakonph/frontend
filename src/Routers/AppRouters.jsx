import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import useAuth from "../Hooks/userAuth";
import NavbarScroll from "../page/NavbarScroll";
import Loginfrom from "../page/Login";
import Register from "../page/Register";
import Test from "../page/ProductAll";
import Cont from "../page/Contact1";
import Product from "../page/Product";
import ShippingAddress from "../page/ShippingAddress";
import Profile from "../page/Profile";
import Navbar1 from "../page/Navber1";
import Order from "../page/Order";
import Showshppingaddress from "../page/showShippingaddress";

const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      { index: true,element: <NavbarScroll/>},
      { path: "/login", element: <Loginfrom /> },
      { path: "/register", element: <Register /> },
      { path: "/contact", element: <Cont />},
      {path: "/product",element: <Product />},
    ],
  },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar1 />
        <Outlet />
      </>
    ),
    children: [
      { index: true , element: <Test /> },
      {
        path: "/contact",
        element: <Cont />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/shippingaddress",
        element: <ShippingAddress />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/showshpingaddress",
        element: <Showshppingaddress />,
      },

    ],
  },
]);
export default function AppRouters() {
  const { user } = useAuth();
  const finalRouter = user?.id ? userRouter : guestRouter;
  return <RouterProvider router={finalRouter} />;
}
