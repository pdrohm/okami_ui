import React, { useContext } from "react";
import Layout from "../components/Layout";
import AuthContext from "../context/AuthContext";
import MyAccount from "../components/Account/MyAccount";
import AddUser from "../components/Account/AddUser";

const Account = () => {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <div className="flex justify-start w-full p-10 h-full flex-col">
        <MyAccount user={user} />
        <AddUser />
      </div>
    </Layout>
  );
};

export default Account;
