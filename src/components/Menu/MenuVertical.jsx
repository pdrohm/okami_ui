import React from "react";
import { useNavigate } from "react-router-dom";
import okamiLogo from "../../assets/okami.png";
import { menuTabs } from "../../utils/menuTabs";

const MenuVertical = () => {
  const navigate = useNavigate();

  const handleTabClick = (url) => {
    console.log(`url`, url);
    navigate(url);
  };

  return (
    <div className="bg-blue-400 h-screen w-1/6 bg-orange flex flex-col items-center ">
      <img
        src={okamiLogo}
        onClick={() => handleTabClick("/")}
        className="w-2/5 cursor-pointer"
      />
      {menuTabs.map((menuTab) => (
        <div
          key={menuTab.url}
          onClick={() => handleTabClick(menuTab.url)}
          className="cursor-pointer border-b-[1px] w-full flex justify-center p-5 border-black hover:bg-light-orange"
        >
          {menuTab.name}
        </div>
      ))}
    </div>
  );
};

export default MenuVertical;
