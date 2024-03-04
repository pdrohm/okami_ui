import * as React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { StudentProvider } from "../context/StudentContext";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Finances from "../pages/Finances";
import RegisterStudent from "../pages/RegisterStudent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OkamiRoutes = () => {
  return (
    <HashRouter>
      <StudentProvider>
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/alunos" element={<Students />} />
          <Route exact path="/alunos/registro" element={<RegisterStudent />} />
          <Route exact path="/financeiro" element={<Finances />} />
        </Routes>
      </StudentProvider>
    </HashRouter>
  );
};

export default OkamiRoutes;
