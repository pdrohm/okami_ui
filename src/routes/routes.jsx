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
import { AuthProvider } from "../context/AuthContext";
import Account from "../pages/Account";
import Training from "../pages/Training";
import Checkin from "../pages/Checkin";
import { TrainingProvider } from "../context/TrainingContext";

const OkamiRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <HashRouter>
      <AuthProvider>
        <StudentProvider>
          <TrainingProvider >
          <Routes>
            {token ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/alunos" element={<Students />} />
                <Route path="/alunos/registro" element={<RegisterStudent />} />
                <Route path="/financeiro" element={<Finances />} />
                <Route path="/conta" element={<Account />} />
                <Route path="/treino" element={<Training />} />
                <Route path="/checkin" element={<Checkin />} />
              </>
            ) : (
              <Route path="/" element={<Navigate to="/login" />} />
            )}
            <Route path="/login" element={<LoginScreen />} />
          </Routes>
          <ToastContainer />
          </TrainingProvider>
        </StudentProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default OkamiRoutes;
