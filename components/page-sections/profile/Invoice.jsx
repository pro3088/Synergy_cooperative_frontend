"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/common/authentication/AuthProvider";

const Invoice = ({ id, pay }) => {
  const [details, setDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const { user } = useAuth();

  const handlePayment = async () => {
    window.location.href = `/profile/utils/payment?amount=${amount}&type=${type}&id=${id}`;
  };

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
        if (data.type === "LOAN") {
          setAmount(data.deposit);
        }
        else{
          setAmount(data.amount);
        }
        setType(data.type);
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
      <div className="flex flex-col px-6 py-4 gap-4 items-center">
        <div className="font-bold text-xl">Transaction Details</div>
        <div className="flex flex-col gap-4">
          {Object.entries(details).map(
            ([label, value], index) =>
              value !== null &&
              label !== "user" &&
              label !== "deposit" && (
                <div key={index} className="flex justify-between gap-16">
                  <span className="font-bold">
                    {label.toLocaleUpperCase()} :
                  </span>
                  <span>{value}</span>
                </div>
              )
          )}
        </div>
        {(details.status === "PENDING" && details.user === user.id) ||
          (details.type === "LOAN" &&
            details.status === "APPROVED" &&
            details.user === user.id &&
            details.status !== "REJECTED" && (
              <button
                type="button"
                onClick={handlePayment}
                className="mt-4 px-4 py-2 bg-[var(--money-green)] text-white rounded-md"
              >
                Proceed to Payment
              </button>
            ))}
      </div>
    </div>
  );
};

export default Invoice;
