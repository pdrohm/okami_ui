import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StudentProvider } from "../context/StudentContext";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Finances from "../pages/Finances";
import RegisterStudent from "../pages/RegisterStudent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    path: "/alunos/registro",
    element: <RegisterStudent />,
  },
  {
    path: "/financeiro",
    element: <Finances />,
  },
];

const router = createBrowserRouter(routes);

const Routes = () => {
  return (
    <StudentProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </StudentProvider>
  );
};

export default Routes;
