'use client'
import { useState, useEffect, useRef } from 'react';

const NotificationIcon = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
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
      <span className="text-white cursor-pointer" onClick={toggleDropdown}>🔔</span>
      {isDropdownVisible && (
        <div className="absolute top-8 right-0 bg-white p-4 shadow-md">
          {/* Notification dropdown content */}
          Your notification content goes here.
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
