"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@components/page-sections/authentication/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { login, user } = useAuth();

  const fetchData = async (userId) => {
    try {
      const response = await fetch(`/api/profile/users/${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        login(await response.json());
      } else {
        router.replace("/login");
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    const fetchDataAndUpdateUser = async () => {
      let util = { userId: localStorage.getItem("UTIL") };
      const encryptedId = util.userId;

      await fetchData(encryptedId);
    };

    if (!user) {
      fetchDataAndUpdateUser();
    }
  }, [user]);

  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
