import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        credentials
      );
      const { token, user } = response.data;
      localStorage.setItem("jwt", token);
      setUser(user);
    } catch (error) {
      console.error("Login failed", error);
      throw error.response;
    }
  };

  const register = async (details) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        details
      );
    } catch (error) {
      throw error.response;
    }
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  const isAuthenticated = () => !!localStorage.getItem("jwt");

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
