"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const returnToLogin = async (router) => {
    try {
      const response = await fetch(`/api/profile/users/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        router.replace("/login");
        localStorage.removeItem("UTIL");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      return false;
    }
  };

  const login = useCallback((userData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    returnToLogin(router);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
