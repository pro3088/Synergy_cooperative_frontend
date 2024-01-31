"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@components/page-sections/authentication/AuthProvider";
import Button from "@components/common/OverlayButton";
import Invoice from "@components/page-sections/profile/Invoice";

const UserTable = () => {
  const pageSize = 20;
  const [applicationData, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(pageSize);
  const [offset, setOffset] = useState(0);
  const { user } = useAuth();

  const fetchData = async () => {
    const userId = user.id;
    try {
      const response = await fetch(
        `/api/transactions/${userId}/applications?offset=${offset}&limit=${limit}&pageSize=${pageSize}`
      );
      if (response.ok) {
        const data = await response.json();
        setApplications(data.transactions);
        setTotalPages(data.totalPages);
      } else {
        console.error("Failed to fetch applications.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setOffset(offset + pageSize);
      setLimit(limit + pageSize);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      if (page == 1) {
        setOffset(0);
      } else {
        setOffset(offset - pageSize);
        setLimit(limit - pageSize);
      }
    }
  };

  return (
    <div className="w-full">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border-b border-gray-200 px-4 py-2">ID</th>
            <th className="border-b border-gray-200 px-4 py-2">Amount</th>
            <th className="border-b border-gray-200 px-4 py-2">Date Created</th>
            <th className="border-b border-gray-200 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {applicationData.map((application) => (
            <tr key={application.id}>
              <td className="border-b border-gray-200 px-4 py-2">
                {application.status != "COMPLETED" ? (
                  <Button
                    text={application.id.substring(0, 8)}
                    overlayContent={<Invoice id={application.id} />}
                  />
                ) : (
                  application.id.substring(0, 8)
                )}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {application.amount}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {application.dateCreated}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {application.status}
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
