import React from "react";
import LeftPanel from "./Menu/LeftPanel";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen min-w-screen bg-white">
      <LeftPanel />
      <div className="w-full h-full"> {children}</div>
    </div>
  );
};

export default Layout;
