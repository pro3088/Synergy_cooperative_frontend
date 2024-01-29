"use client";
import React, { useState, useEffect } from "react";

const Invoice = ({ id }) => {
  const [details, setDetails] = useState("");
  const fetchApplication = async () => {
    try {
      const response = await fetch(`/api/transactions/application/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setDetails(data);
      }
    } catch (error) {
      console.error("Error fetching referral text:", error);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  return (
    <div className="max-w-md mx-auto min-w-[20vw] bg-white rounded-md overflow-hidden shadow-md">
      <div className="flex flex-col px-6 py-4 gap-4">
        <div className="font-bold text-xl">Transaction Details</div>
        <div className="flex flex-col gap-4">
          {Object.entries(details).map(([label, value], index) => (
            <div key={index} className="flex justify-between gap-16">
              <span className="font-bold">{label.toLocaleUpperCase()} :</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
