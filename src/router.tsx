import { createBrowserRouter } from "react-router-dom";

import { Layout } from "@/components/Layout";

import Home from "@/pages/Home";
import Addresses from "@/pages/Addresses";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/addresses",
        element: <Addresses />,
      },
    ],
  },
]);
