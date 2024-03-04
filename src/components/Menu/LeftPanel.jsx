import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import okamiLogo from "../../assets/okami.png";
import { menuTabs } from "../../utils/menuTabs";
import LogoutButton from "../LogoutButton";
import AuthContext from "../../context/AuthContext";
import ProfileButton from "../ProfileButton";

const LeftPanel = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  console.log(`user`, user);

  const handleTabClick = (url) => {
    console.log(`url`, url);
    navigate(url);
  };

  return (
    <div className="w-24 bg-orange flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <img
          src={okamiLogo}
          onClick={() => handleTabClick("/")}
          className="w-2/3 cursor-pointer"
        />
        {menuTabs.map((menuTab) => (
          <div
            key={menuTab.url}
            onClick={() => handleTabClick(menuTab.url)}
            className="cursor-pointer border-b-[1px] w-full flex flex-col items-center justify-center p-5 border-orange-light hover:bg-orange-light"
          >
            <div className="text-whiter">
              {React.createElement(menuTab.icon)}
            </div>
            <span className="text-whiter">{menuTab.name}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center mb-5 text-white flex-col items-center gap-y-2 h-24 w-full">
        <ProfileButton />
        <LogoutButton />
      </div>
    </div>
  );
};

export default LeftPanel;
