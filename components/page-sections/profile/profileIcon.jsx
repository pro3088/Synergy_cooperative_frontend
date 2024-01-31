"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@components/page-sections/authentication/AuthProvider";

function getInitial(name) {
  if (typeof name !== "string" || name.length === 0) {
    return null;
  }

  return name.charAt(0).toUpperCase();
}

const ProfileIcon = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, user } = useAuth();

  const name = user.firstName;
  const fullname = user.firstName + " " + user.lastName;
  const email = user.emailAddress;
  const initial = getInitial(name);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const logOutUser = () => {
    logout();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <span className="text-white cursor-pointer" onClick={toggleDropdown}>
        👤
      </span>
      {isDropdownVisible && (
        <div className="flex flex-col absolute top-8 right-0 bg-[var(--plain-color)] p-2 shadow-md rounded-md gap-2 ">
          <div className="flex gap-4 items-center p-2 bg-white rounded-md">
            <div className="h-14 w-14 rounded-full bg-black flex items-center justify-center text-white text-xl font-bold mr-2">
              {initial}
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="font-bold text-lg">{fullname}</h5>
              <p>{email}</p>
            </div>
          </div>
          <a href="/login" className="ml-2" onClick={logOutUser}>
            Sign out
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
