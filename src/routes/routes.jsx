import * as React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { StudentProvider } from "../context/StudentContext";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Finances from "../pages/Finances";
import RegisterStudent from "../pages/RegisterStudent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginScreen from "../pages/LoginScreen";

const OkamiRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <HashRouter>
      <StudentProvider>
        <Routes>
          {token ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/alunos" element={<Students />} />
              <Route path="/alunos/registro" element={<RegisterStudent />} />
              <Route path="/financeiro" element={<Finances />} />
            </>
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
          <Route path="/login" element={<LoginScreen />} />
        </Routes>
      </StudentProvider>
    </HashRouter>
  );
};

export default OkamiRoutes;
