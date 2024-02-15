"use client";
import { useState } from "react";
import { useAuth } from "@/components/common/authentication/AuthProvider";

const Status = ({id}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [completed, setCompleted] = useState(false);
  const { user } = useAuth();

  const changeStatus = async () => {
    try {
      const response = await fetch(
        `/api/transactions/application/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({user: user.id, status: selectedOption}),
        }
      );
      if (response.ok) {
        setCompleted(true);
      }
    } catch (error) {
      console.error("Error fetching referral text:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-2">
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Select Option</option>
          <option value="APPROVED">APPROVED</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <button
          className="text-[var(--primary-color)] cursor-pointer"
          onClick={changeStatus}
          disabled={!selectedOption}
        >
          Change Status
        </button>
      </div>

      {completed && (
        <div className="text-green-500 mt-2">{"Changed Successfully"}</div>
      )}
    </div>
  );
};

export default Status;
