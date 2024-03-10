import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          setUser(decodedToken);
        }
      } catch (error) {
        console.error("Erro ao obter informações do usuário:", error);
      }
    };

    fetchUser();
  }, []);



  const login = async (username, password) => {
    try {
      const response = await authService.loginUser(username, password);

      localStorage.setItem("token", response.token);
      const decodedToken = jwtDecode(response.token);
      await setUser(decodedToken);
      navigate('/');
    } catch (error) {
      console.error("Erro durante o login:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
