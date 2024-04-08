"use client";
import React, { useState } from 'react';
import Navbar from '@components/layout/Navbar';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/reset/${email}`);
      if (response.ok) {
        setSuccess(true);
      } else {
        console.error('Failed to reset password');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Navbar
        buttonText="Back"
        buttonLink="/login"
        showBackground={true}
        linkColor="white"
        buttonTextColor="white"
      />
      <div className="flex justify-center items-center">
        <div className="max-w-lg lg:max-w-2xl w-full px-4 md:px-12 lg:px-28 py-8">
          {success ? (
            <p>
              An email has been sent to your inbox. Please check, click the link
              and reset your password.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full bg-[var(--plain-color)] mb-2"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[var(--primary-color)] text-white w-full px-4 py-2 mb-2 rounded-md"
              >
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordForm;

