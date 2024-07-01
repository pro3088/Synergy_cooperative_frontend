"use client";
import { useState, useEffect } from "react";
import Button from "@components/common/OverlayButton";
import Status from "@components/page-sections/profile/admin/Status";
import Invoice from "@components/page-sections/profile/Invoice";
import { useAuth } from "@/components/common/authentication/AuthProvider";
import { useStripe } from "@stripe/react-stripe-js";

const Applications = ({ isUser = false }) => {
  const stripe = useStripe();
  const limit = 5;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [offset, setOffset] = useState(0);
  const [applicationData, setApplicationData] = useState([]);
  const { user } = useAuth();

  const userId = user.id;

  const endpoint = isUser
    ? `/api/transactions/${userId}/applications?offset=${offset}&limit=${limit}`
    : `/api/transactions?offset=${offset}&limit=${limit}`;

  const fetchData = async () => {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        setApplicationData(data.content);
        setTotalPages(data.totalPages);
      } else {
        console.error("Failed to fetch applications.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    const transactionId = new URLSearchParams(window.location.search).get("id");

    if (!clientSecret) {
      return;
    }

    const updateTransaction = async () => {
      try {
        const response = await fetch(
          `/api/transactions/application/${transactionId}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "COMPLETED" }),
          }
        );
      } catch (error) {
        console.error("Error updating transaction:", error.message);
      }
    };

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent.status === "succeeded") {
        updateTransaction();
      }
    });
  }, [stripe]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setOffset(offset + limit);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      if (page == 1) {
        setOffset(0);
      } else {
        setOffset(offset - limit);
      }
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border-b border-gray-200 px-4 py-2">ID</th>
            {!isUser && (
              <th className="border-b border-gray-200 px-4 py-2">Name</th>
            )}
            <th className="border-b border-gray-200 px-4 py-2">Type</th>
            <th className="border-b border-gray-200 px-4 py-2">Amount</th>
            <th className="border-b border-gray-200 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {applicationData.map((application) => (
            <tr key={application.id}>
              <td className="border-b border-gray-200 px-4 py-2">
                <Button
                  text={application.id.substring(0, 8)}
                  overlayContent={<Invoice id={application.id} />}
                />
              </td>
              {!isUser && (
                <td className="border-b border-gray-200 px-4 py-2">
                  {application.user}
                </td>
              )}
              <td className="border-b border-gray-200 px-4 py-2">
                {application.type}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {application.amount}
              </td>
              <td
                className={`border-b border-gray-200 px-4 py-2 ${
                  application.status === "REJECTED"
                    ? "text-red-700"
                    : "text-[var(--primary-color)]"
                }`}
              >
                {application.status !== "COMPLETED" &&
                application.status !== "REJECTED" &&
                !isUser ? (
                  <Button
                    text={application.status}
                    overlayContent={<Status id={application.id} />}
                  />
                ) : (
                  application.status
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-around items-center">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="text-[var(--primary-color)]"
        >
          Previous Page
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="text-[var(--primary-color)]"
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Applications;
