import React from "react";
import LeftPanel from "./Menu/LeftPanel";
import { useGlobalSettings } from "../store/useGlobalSettings";

const Layout = ({ children }) => {
  const { showLeftPanel } = useGlobalSettings();

  return (
    <div className="flex min-h-screen min-w-screen bg-white">
      {showLeftPanel && <LeftPanel />}
      <div className={`h-full ${showLeftPanel ? "w-full ml-64" : "w-full"}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;