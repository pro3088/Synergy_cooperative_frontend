"use client";
import Button from "@components/common/Button";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const [notifications, setNotifications] = useState([]);
  const [previousUrl, setPreviousUrl] = useState("");

  const fetchNotifications = async (user) => {
    try {
      const response = await fetch(`/api/profile/nofication/${user}`);
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        console.error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('An error occurred while fetching notifications', error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("UTIL");
    const status = localStorage.getItem("STATUS");
    if (user) {
      fetchNotifications(user);
    }
    if (status == "ADMIN"){
      setPreviousUrl("/profile/admin");
    }
    else if (status == "FINANCIAL_MEMBER"){
      setPreviousUrl("/profile/financial_member");
    }
    else{
      setPreviousUrl("/profile/member");
    }
  }, []);

  return (
    <div className="w-full h-full mt-4 space-y-4">
      <div className="flex flex-col justify-between xl:justify-around space-y-2">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-bold">Notifications</h3>
            <h4 className="text-md">Check your notifications here</h4>
          </div>
          <Button text="Back" textColor="blue" link={previousUrl} border={true} />
        </div>
        <div className="flex flex-col space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="flex flex-row rounded-md border border-[var(--primary-color)] justify-between p-2 px-4 items-center">
                <p className="text-md">{notification.message}</p>
                <Link
                  className="rounded-md border border-[var(--primary-color)] text-[var(--primary-color)] text-center p-2"
                  href={`/notifications/notification?id=${notification.id}`}
                >
                  <p>view</p>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-red-400">No notifications available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
