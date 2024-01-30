"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@components/page-sections/authentication/AuthProvider";
import UserStatus from "@components/common/enums/UserStatus";
import CryptoJS from "crypto-js";

const Form = ({ formConfig, isSignup }) => {
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {};
    formConfig.forEach((field, index) => {
      formData[field.name] = document.getElementById(
        `${field.name}-${index}`
      ).value;
    });

    const rememberMe = document.getElementById("remember-me").checked;

    try {
      const apiEndpoint = isSignup
        ? "/api/profile/create"
        : "/api/profile/login";

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, rememberMe }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data);
        localStorage.setItem("UTIL", data.encryptedId);
        router.push(`${UserStatus[res.status].apiLink}`);
      } else {
        console.error("Authentication failed:", res);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
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
            className="mt-1 p-2 border rounded-md w-full bg-[var(--plain-color)]"
          />
        </div>
      ))}
      <div className="mb-4">
        <input type="checkbox" id="remember-me" className="mr-2" />
        <label htmlFor="remember-me" className="text-sm text-gray-700">
          Remember Me
        </label>
      </div>
      <button
        type="submit"
        className="bg-[var(--primary-color)] text-white w-full px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
