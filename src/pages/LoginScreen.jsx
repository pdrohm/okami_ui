import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bannerOkami2 from "../../public/bannerOkami2.jpg";
import okamiLogo from "../assets/okami.png";

import { useAuthStore } from "../store/useAuthStore";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email: email, password: password };

      await login(userData);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex bg-green-dark">
      <div className="banner-container items-end h-screen justify-start w-2/3 hidden lg:flex">
        <img
          src={bannerOkami2}
          alt="banner Okami"
          className="grayscale h-screen filter "
        />
      </div>
      <div className="flex flex-col justify-center items-center w-full h-screen mx-10 md:mx-0">
        <div className="md:w-1/2 md:h-1/2 w-full h-1/2 bg-whiter rounded-xl flex flex-col justify-center items-center gap-y-5">
          <img src={okamiLogo} className="w-36" />
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            <input
              type="text"
              placeholder="Usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="student-form-input bg-white font-semibold"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="student-form-input bg-white font-semibold"
            />
            <button
              type="submit"
              className="w-full bg-orange px-5 py-2 rounded-md text-white font-semibold hover:bg-orange/80"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
