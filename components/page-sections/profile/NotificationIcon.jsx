'use client'
import React, { useState, useEffect, useRef } from 'react';

const NotificationIcon = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(3);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('your_notification_endpoint');
      const data = await response.json();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
    if (!isDropdownVisible) {
      fetchNotifications();
      // Send request to mark notifications as read if unreadCount > 1
      if (unreadCount > 1) {
        markNotificationsAsRead();
      }
    }
  };

  const markNotificationsAsRead = async () => {
    try {
      // Assuming your backend supports marking notifications as read
      await fetch('your_mark_read_endpoint', {
        method: 'POST',
        body: JSON.stringify({ notificationIds: notifications.map(notification => notification.id) }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUnreadCount(0); // Reset unread count after marking as read
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <img src="/notification.svg" alt="notification" className="cursor-pointer h-[26px]" onClick={toggleDropdown} />
      {unreadCount > 0 && (
        <div className="absolute top-0 right-0 bg-red-500 rounded-full text-white text-[8px] px-1 py-0.5">
          {unreadCount}
        </div>
      )}
      {isDropdownVisible && (
        <div className="absolute top-8 right-0 bg-white p-4 shadow-md">
          {/* Render notifications */}
          <ul>
            {notifications.slice(0, 5).map(notification => (
              <li key={notification.id}>{notification.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
