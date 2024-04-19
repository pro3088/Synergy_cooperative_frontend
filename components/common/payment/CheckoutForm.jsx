"use client";
import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAuth } from "@/components/common/authentication/AuthProvider";

export default function CheckoutForm({ link, transactionId }) {
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useAuth();
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const applicationUrl = window.location.origin;
    const returnUrl = `${applicationUrl}/${link}?id=${transactionId}`;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
        receipt_email: user.emailAddress,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    }
     else {
      setMessage("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={paymentElementOptions} />
      <button class="w-full mt-5 p-2 bg-black text-white rounded-md " id="submit">
        {isLoading ? "Loading ...." : "Pay now"}
      </button>
      {message && <div>{message}</div>}
    </form>
  );
}
