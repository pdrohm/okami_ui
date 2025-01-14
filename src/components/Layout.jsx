import React from "react";
import LeftPanel from "./Menu/LeftPanel";
import { useGlobalSettings } from "../store/useGlobalSettings";

const Layout = ({ children }) => {
  const { showLeftPanel } = useGlobalSettings();

  return (
    <div className="flex">
      {showLeftPanel && <LeftPanel />}
      {children}
    </div>
  );
};

export default Layout;
