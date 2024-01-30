"use client";
import { useState } from "react";
import { useAuth } from "@components/page-sections/authentication/AuthProvider";


const ReferralGenerator = ({ options }) => {
  const [referralText, setReferralText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const { user } = useAuth();

  const generateReferral = async () => {
    try {
      const response = await fetch(
        `/api/profile/referrals/generate?status=${selectedOption}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ users: user.id }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setReferralText(data.code);
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error fetching referral text:", error);
    }
  };

  const copyToClipboard = () => {
    const textArea = document.createElement("textarea");
    textArea.value = referralText;

    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand('copy');

    document.body.removeChild(textArea);

    setCopyMessage("Copied to clipboard!");

    setTimeout(() => {
        setCopyMessage("");
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex gap-2">
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Select Option</option>
          {options.map((option, index) => (
            <option key={index} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
        <button
          className="text-[var(--primary-color)] cursor-pointer"
          onClick={generateReferral}
          disabled={!selectedOption}
        >
          Generate Referral
        </button>
      </div>

      {showPopup && (
        <div className="flex gap-2 items-center">
          <p className="text-lg text-center">{referralText}</p>
          <button
            className="text-[var(--primary-color)] hover:text-blue-900 focus:outline-none"
            onClick={copyToClipboard}
          >
            COPY
          </button>
        </div>
      )}

      {copyMessage && <div className="text-green-500 mt-2">{copyMessage}</div>}
    </div>
  );
};

export default ReferralGenerator;
