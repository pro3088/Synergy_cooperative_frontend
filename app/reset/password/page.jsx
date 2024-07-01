"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@components/layout/Navbar";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const mail = searchParams.get("email");
    const resetCode = searchParams.get("code");

    if (mail && resetCode) {
      setEmail(mail);
      setCode(resetCode);
      verifyEmailAndCode(mail, resetCode);
    }
  }, []);

  const verifyEmailAndCode = async (email, code) => {
    try {
      const response = await fetch(`/api/profile/users/exists/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        if (body.resetCode == code) {
          setValid(true);
        }
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText);
      }
    } catch (error) {
      console.error("Error verifying email and code:", error.message);
      setErrorMessage("An error occurred while verifying the email and code.");
    }
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    checkPasswordsMatch(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkPasswordsMatch(newPassword, e.target.value);
  };

  const checkPasswordsMatch = (newPwd, confirmPwd) => {
    setPasswordsMatch(newPwd === confirmPwd && newPwd !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = JSON.stringify({ emailAddress: email, password: newPassword });

    const updateTransaction = async () => {
      try {
        const response = await fetch(`/api/profile/reset/password`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        });
        if (response.ok) {
          setSuccessMessage("Successfully changed password");
        } else {
          const errorText = await response.text();
          setErrorMessage(errorText);
        }
      } catch (error) {
        console.error("Error changing password:", error.message);
        setErrorMessage("An error occurred while changing the password.");
      }
    };

    updateTransaction();
  };

  return (
    <section className="flex flex-col gap-2">
      <Navbar
        buttonText="Back"
        buttonLink="/login"
        showBackground={true}
        linkColor="white"
        buttonTextColor="white"
      />
      {valid ? (
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-xl font-semibold">Password Reset</h2>
          {successMessage ? (
            <div className="flex flex-col gap-2 items-center text-green-600 mt-4">
              <p>{successMessage}</p>
              <button
                onClick={() => window.location.replace("/login")}
                className="bg-blue-500 text-white rounded-md px-4 py-2 focus:outline-none hover:bg-blue-600"
              >
                Login
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 items-center"
            >
              <label htmlFor="newPassword" className="font-semibold">
                New Password:
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:border-blue-500"
              />
              <label htmlFor="confirmPassword" className="font-semibold">
                Confirm Password:
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!passwordsMatch}
                className={`bg-blue-500 text-white rounded-md px-4 py-2 focus:outline-none ${
                  passwordsMatch
                    ? "hover:bg-blue-600"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                Reset Password
              </button>
            </form>
          )}
          {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
        </div>
      ) : (
        <p className="text-red-600 mt-4">Invalid or missing email parameter.</p>
      )}
    </section>
  );
};

export default PasswordReset;
