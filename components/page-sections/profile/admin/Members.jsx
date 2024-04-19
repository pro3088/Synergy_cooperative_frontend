"use client";
import { useState, useEffect } from "react";

const UserTable = () => {
  const limit = 5;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [offset, setOffset] = useState(0);
  const [userData, setUserData] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `/api/profile/users?offset=${offset}&limit=${limit}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserData(data.content);
        setTotalPages(data.totalPages);
      } else {
        console.error("Failed to fetch applications.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setOffset(offset + limit);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      if (page == 1) {
        setOffset(0);
      } else {
        setOffset(offset - limit);
      }
    }
  };


  return (
    <div className="overflow-x-auto w-full max-w-screen-lg mx-auto">
      <table className="w-full bg-white border border-gray-200">
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
                  ...
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-around items-center">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="text-[var(--primary-color)]"
        >
          Previous Page
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="text-[var(--primary-color)]"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default UserTable;