"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "@/components/common/authentication/AuthProvider";

function fetchBanksData(setData) {
  return async () => {
    try {
      const response = await fetch("/api/banks", {
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

const ApplicationOverlay = ({ type, period }) => {
  let { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [date, setPeriod] = useState(new Date());
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [banks, setBanks] = useState([]);
  const fetchBanks = fetchBanksData(setBanks);
  user = user.id;

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          date,
          user,
          type,
          bank: selectedOption,
        }),
      });

      if (response.ok) {
        setSubmissionSuccess(true);
      } else {
        console.error("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
    setAmount("");
    setPeriod(new Date());
  };

  const handleInputChange = (e) => {
    const inputElement = e.target;
    const inputValue = inputElement.value;
    const inputNumeric = inputValue.replace(/[^\d.]/g, "");
    const [integerPart] = inputNumeric.split(".");
    const formattedIntegerPart = Number(integerPart).toLocaleString();
    inputElement.value = formattedIntegerPart;

    setAmount(formattedIntegerPart);
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <h2 className="text-xl font-bold">{type} APPLICATION</h2>
      {submissionSuccess ? (
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
            {period ? (
              <div className="flex flex-col gap-1">
                <span className="font-bold">{type} PERIOD</span>
                <Calendar onChange={setPeriod} value={date} />
              </div>
            ) : null}
            <div className="flex flex-col gap-1">
              <span className="font-bold">SELECT BANK</span>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="">Select Option</option>
                {banks
                  .filter((option) => option.company === true)
                  .map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}:{option.accountNumber}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-[var(--money-green)] text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ApplicationOverlay;
