import React from "react";
import Layout from "../components/Layout";
import MyAccount from "../components/Account/MyAccount";
import AddUser from "../components/Account/AddUser";
import { useAuthStore } from "../store/useAuthStore";

const Account = () => {
  const { user } = useAuthStore();

  return (
    <Layout>
      <div className="flex justify-start w-full p-10 h-full flex-col">
        {user && <MyAccount user={user} />}
        <AddUser />
      </div>
    </Layout>
  );
};

export default Account;
