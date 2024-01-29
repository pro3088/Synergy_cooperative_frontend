"use client";
import { useState, useEffect } from "react";
import Button from "@components/common/OverlayButton";
import Status from "@components/page-sections/profile/admin/Status";
import Invoice from "@components/page-sections/profile/Invoice";

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

const Applications = () => {
  const [applicationData, setApplicationData] = useState([]);

  const fetchApplications = fetchData(setApplicationData, "/api/transactions");

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="w-full">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border-b border-gray-200 px-4 py-2">ID</th>
            <th className="border-b border-gray-200 px-4 py-2">Name</th>
            <th className="border-b border-gray-200 px-4 py-2">Type</th>
            <th className="border-b border-gray-200 px-4 py-2">Amount</th>
            <th className="border-b border-gray-200 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {applicationData.map((application) => (
            <tr key={application.id}>
              <td className="border-b border-gray-200 px-4 py-2">
              <Button text={application.id.substring(0, 8)} overlayContent={<Invoice id={application.id} />} />
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {application.user}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {application.type}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {application.amount}
              </td>
              <td
                className="border-b border-gray-200 px-4 py-2 text-[var(--primary-color)]"
              >
                {application.status != "COMPLETED" ? <Button text={application.status} overlayContent={<Status id={application.id} />} /> : application.status}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Applications;
