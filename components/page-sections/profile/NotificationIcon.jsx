'use client';
import Link from "next/link";
import React, { useState, useEffect } from 'react';

const NotificationIcon = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchCount = async (user) => {
    try {
      const response = await fetch(`/api/profile/notification/${user}/count`);
      const data = await response.text();
      setUnreadCount(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("UTIL");
    fetchCount(user);
  }, []);

  return (
    <Link className="relative" href={"/profile/utils/notifications"}>
      <img src="/notification.svg" alt="notification" className="cursor-pointer h-[26px]" />
      {unreadCount > 0 && (
        <div className="absolute top-0 right-0 bg-red-500 rounded-full text-white text-[8px] px-1 py-0.5">
          {unreadCount}
        </div>
      )}
    </Link>
  );
};

export default NotificationIcon;
