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

const Banks = () => {
  const [bankData, setBankData] = useState([]);

  const fetchBanks = fetchData(setBankData, "/api/banks");

  useEffect(() => {
    fetchBanks();
  }, []);

  return (
    <div className="w-full">
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border-b border-gray-200 px-4 py-2">NAME</th>
            <th className="border-b border-gray-200 px-4 py-2">Account-Name</th>
            <th className="border-b border-gray-200 px-4 py-2">Account-Number</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {bankData.map((bank) => (
            <tr key={bank.id}>
              <td className="border-b border-gray-200 px-4 py-2">
              {bank.name}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {bank.accountName}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {bank.accountNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Banks;
