import React from "react";
import Menu from "./Menu";

const Layout = ({ children }) => {
  return (
    <div className="flex w-full h-full">
      <Menu />
      <div className="w-full h-full"> {children}</div>
    </div>
  );
};

export default Layout;
