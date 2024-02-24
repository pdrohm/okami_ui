import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Finances from "../pages/Finances";

const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/alunos",
    element: <Students />,
  },
  {
    path: "/financeiro",
    element: <Finances />,
  },
];

const router = createBrowserRouter(routes);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
