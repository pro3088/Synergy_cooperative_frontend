"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Button from "@components/common/Button";
import CheckoutForm from "@/components/common/payment/CheckoutForm";
import UserStatus from "@components/common/enums/UserStatus";
import { useAuth } from "@/components/common/authentication/AuthProvider";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const PaymentPage = () => {
  const [amount, setAmount] = useState(null);
  const [type, setType] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get("amount");
    const type = urlParams.get("type");
    const transactionId = urlParams.get("id");
    setAmount(amount);
    setType(type);
    setTransactionId(transactionId)

    const fetchData = async () => {
      try {
        const response = await fetch("/api/transactions/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amount }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (amount !== null) {
      fetchData();
    }
  }, [amount]);

  const otherLink = user.status === "MEMBER" ? "" : "investment";
  const link = user.status === "ADMIN" ? "/applications" : otherLink;
  const returnUrl = `${UserStatus[user.status].apiLink}/${link}`;

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div class="mx-auto w-9/12 m-10">
      <div className="flex flex-row justify-between w-full items-center">
        <h1 class="ml-5 mb-5 font-semibold text-3xl font-sans text-indigo-600">
          Checkout
        </h1>
        <Button text="Back" textColor="blue" link={returnUrl} border={true} />
      </div>
      <div class="content-center flex flex-col lg:flex-row">
        <div class="rounded-l-xl lg:rounded-l-none lg:rounded-t-xl bg-gray-200 basis-1/2 p-10">
          <h1 class="mb-5 font-semibold text-2xl font-sans text-indigo-600">
            Payment Summary
          </h1>
          <div class="mt-10 border-gray-300 border-t-2 pt-2 text-gray-600">
            {type}: &#x20A6;{amount}
          </div>
        </div>
        <div class="rounded-r-xl lg:rounded-r-none lg:rounded-b-xl bg-blue-200 basis-1/2 p-10">
          {clientSecret ? (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm link={returnUrl} transactionId={transactionId} />
            </Elements>
          ) : (
            <h1 class="font-semibold text-3xl font-sans">Loading ...</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
