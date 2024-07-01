"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "@/components/common/authentication/AuthProvider";

const formConfig = [
  { name: "name", label: "Bank Name" },
  { name: "accountName", label: "Account Name" },
  { name: "accountNumber", label: "Account Number" },
];

const ApplicationOverlay = ({ type, period, withdrawal = false, loan = false }) => {
  let { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [date, setPeriod] = useState(new Date());
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [bank, setBank] = useState(null);
  const [loading, setLoading] = useState(false);
  user = user.id;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const inputNumeric = inputValue.replace(/[^\d.]/g, "");
    const [integerPart] = inputNumeric.split(".");
    const formattedIntegerPart = Number(integerPart).toLocaleString();
    setAmount(formattedIntegerPart);
  };

  const handleSubmit = async (event, redirectToPayment) => {
    event.preventDefault();
    const formData = {};
    setLoading(true);
    {
      withdrawal &&
        formConfig.forEach((field, index) => {
          formData[field.name] = document.getElementById(
            `${field.name}-${index}`
          ).value;
        });
      try {
        const apiEndpoint = "/api/banks";

        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData }),
        });
        if (response.ok) {
          const responseData = await response.json();
          setBank(responseData.id);
        } else {
          console.error("Failed to submit application.");
        }
      } catch (error) {
        console.error("Error during process:", error);
      }
    }

    const transactionData = JSON.stringify({
      amount,
      date,
      user,
      type,
      bank: bank,
    });

    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: transactionData,
      });

      if (response.ok) {
        const responseData = await response.json();

        if (redirectToPayment) {
          window.location.href = `/profile/utils/payment?amount=${amount}&type=${type}&id=${responseData.id}`;
        }
        
        setSubmissionSuccess(true);

      } else {
        console.error("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
    setAmount("");
    setPeriod(new Date());
    setLoading(false);
  };

  const handlePayment = async (event) => {
    await handleSubmit(event, true);
  };

  const handleOfflinePayment = async (event) => {
    await handleSubmit(event, false);
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <h2 className="text-xl font-bold">{type} APPLICATION</h2>
      {loading ? (
        <div className="text-gray-600 font-bold">Loading...</div>
      ) : submissionSuccess ? (
        <div className="text-green-600 font-bold">
          Application submitted successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 items-center">
            <input
              type="text"
              placeholder="Amount"
              value={amount}
              onChange={handleInputChange}
              className="mt-1 p-2 rounded-md w-full bg-white"
            />
            {period && (
              <div className="flex flex-col gap-1">
                <span className="font-bold">{type} PERIOD</span>
                <Calendar onChange={setPeriod} value={date} />
              </div>
            )}
            {withdrawal && (
              <div className="flex flex-col gap-1">
                {formConfig.map((field, index) => (
                  <div key={index} className="mb-4">
                    <label
                      htmlFor={`${field.name}-${index}`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type || "text"}
                      id={`${field.name}-${index}`}
                      placeholder={`${field.label.toLowerCase()}`}
                      className="mt-1 p-2 border rounded-md w-full bg-white"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              {withdrawal || loan ? (
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-[var(--money-green)] text-white rounded-md"
                >
                  Submit
                </button>
              ) : (
                <div className="flex flex-col gap-1">
                  <button
                  type="button"
                  onClick={handlePayment}
                  className="mt-4 px-4 py-2 bg-[var(--money-green)] text-white rounded-md"
                >
                  Pay with Card
                </button>
                <button
                  type="button"
                  onClick={handleOfflinePayment}
                  className="mt-4 px-4 py-2 bg-[var(--primary-color)] text-white rounded-md"
                >
                  Pay with Transfer
                </button>
                </div>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ApplicationOverlay;
