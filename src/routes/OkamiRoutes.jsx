import React, { Suspense } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import appRoutes from "./routes";
import Layout from "../components/Layout";
import StorageService from "../services/storageService";
import ReactLoading from "react-loading";

const OkamiRoutes = () => {
  const token = StorageService.getItem("userToken");

  return (
    <HashRouter>
      <Routes>
        {appRoutes.map(({ path, Component }) => {
          const isLoginRoute = path === "/login";

          return (
            <Route
              key={path}
              path={path}
              element={
                isLoginRoute ? (
                  <Suspense
                    fallback={
                      <div className="flex justify-center items-center h-screen w-screen">
                        <ReactLoading type="spin" color="#FF914C" height={100} width={100} />
                      </div>
                    }
                  >
                    <Component />
                  </Suspense>
                ) : token ? (
                  <Layout>
                    <Suspense
                      fallback={
                        <div className="flex justify-center items-center h-screen w-screen">
                          <ReactLoading type="spin" color="#FF914C" height={100} width={100} />
                        </div>
                      }
                    >
                      <Component />
                    </Suspense>
                  </Layout>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          );
        })}
      </Routes>
      <ToastContainer />
    </HashRouter>
  );
};

export default OkamiRoutes;