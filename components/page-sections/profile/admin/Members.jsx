"use client";
import { useState, useEffect } from "react";

function fetchData(setData, apiEndpoint) {
  return async () => {
    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
}

const UserTable = () => {
  const [userData, setUserData] = useState([]);
  const fetchUsers = fetchData(setUserData, "/api/profile/users");

  useEffect(() => {
    fetchUsers();
    const intervalId = setInterval(fetchUsers, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border-b border-gray-200 px-4 py-2">Name</th>
            <th className="border-b border-gray-200 px-4 py-2">Status</th>
            <th className="border-b border-gray-200 px-4 py-2">Email</th>
            <th className="border-b border-gray-200 px-4 py-2">Date Joined</th>
            <th className="border-b border-gray-200 px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {userData.map((user) => (
            <tr key={user.id}>
              <td className="border-b border-gray-200 px-4 py-2">
                {user.firstName + " " + user.lastName}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {user.status}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {user.emailAddress}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {user.dateJoined}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
                  {/* Add your three dots icon or any other UI element for more information */}
                  ...
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
