"use client"
import { useAuth } from "@/components/common/authentication/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import UserStatus from "@components/common/enums/UserStatus";

export default function WithAuth(Component, allowedRoles) {
  return function WithAuthWrapper(props) {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const checkAuthorization = async () => {
        try {
          if (!allowedRoles.includes(user.status.toLowerCase())) {
            router.push(`${UserStatus[user.status].apiLink}`);
          } else {
            setIsAuthorized(true);
          }
        } finally {
          setLoading(false);
        }
      };

      checkAuthorization();
    }, [user.status, allowedRoles, router]);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!isAuthorized) {
      return null;
    }

    return <Component {...props} />;
  };
}
