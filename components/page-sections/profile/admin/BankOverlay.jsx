"use client";
import { useState } from "react";

const Overlay = ({ formConfig }) => {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {};
    formConfig.forEach((field, index) => {
      formData[field.name] = document.getElementById(
        `${field.name}-${index}`
      ).value;
    });

    const company = document.getElementById("company-bank").checked;

    try {
      const apiEndpoint = "/api/banks";

      await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, company }),
      });
      if (response.ok) {
        setSubmissionSuccess(true);
      } else {
        console.error("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error during process:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <h2 className="text-xl font-bold">{type} ADD BANK</h2>
      {submissionSuccess ? (
        <div className="text-green-600 font-bold">
          Application submitted successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
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
          <div className="mb-4">
            <input type="checkbox" id="company-bank" className="mr-2" />
            <label htmlFor="company-bank" className="text-sm text-gray-700">
              Company bank?
            </label>
          </div>
          <button
            type="submit"
            className="bg-[var(--primary-color)] text-white w-full px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Overlay;
