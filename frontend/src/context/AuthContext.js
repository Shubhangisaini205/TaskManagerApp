import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser as loginAPI } from "../utils/api";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const userData = urlParams.get("user");

    if (token && userData) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", userData);
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuth(true);
      } catch (error) {
        console.error("Failed to parse user data from URL:", error);
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setIsAuth(true);
        } catch (error) {
          console.error("Failed to parse stored user data:", error);
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (userData) => {
    setIsLoading(true);
    try {
      const { data, message, redirectTo } = await loginAPI(userData);
      if (redirectTo) {
        window.location.href = redirectTo;
      } else {
        localStorage.setItem("token", data?.token);
        const userInfo = { first_name: data.username, email: data.email };
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
        setIsAuth(true);
        toast.success(message, { position: "top-center" });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuth(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout, isLoading, setIsAuth, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
