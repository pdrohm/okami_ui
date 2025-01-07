import React, { Suspense } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appRoutes from "./routes";

const OkamiRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {appRoutes.map(({ path, Component }) => {
            return (
              <Route
                key={path}
                path={path}
                element={
                  path === "/login" || token ? (
                    <Component />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            );
          })}
        </Routes>
      </Suspense>
      <ToastContainer />
    </HashRouter>
  );
};

export default OkamiRoutes;
