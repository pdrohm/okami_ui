import React from "react";
import MenuVertical from "./Menu/MenuVertical";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen min-w-screen bg-white">
      <MenuVertical />
      <div className="w-full h-full"> {children}</div>
    </div>
  );
};

export default Layout;
