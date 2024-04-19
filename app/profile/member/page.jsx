"use client";
import { useEffect, useState } from "react";
import Button from "@components/common/OverlayButton";
import { useAuth } from "@/components/common/authentication/AuthProvider";
import ApplicationOverlay from "@components/page-sections/profile/loanee/ApplicationOverlay";
import Applications from "@components/page-sections/profile/admin/Applications";
import withAuth from "@/components/common/authentication/WithAuth";
import Panel from "@/components/page-sections/profile/Panel";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function fetchData(setData, apiEndpoint) {
  return async () => {
    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setData(data.value);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
}

const page = () => {
  const { user } = useAuth();
  const name =
    user != null
      ? capitalizeString(user.firstName) + " " + capitalizeString(user.lastName)
      : "";
  const [amount, setAmount] = useState(0);
  const [interest, setInterest] = useState("3%");
  const [pay, setPay] = useState(0);
  const [status, setStatus] = useState("PENDING");
  const userId = user != null ? user.id : "";

  function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const fetchStatus = fetchData(
    setStatus,
    `/api/transactions/${userId}/status`
  );
  const fetchPay = fetchData(setPay, `/api/transactions/${userId}/getTotal`);
  const fetchAmount = fetchData(
    setAmount,
    `/api/transactions/total/${"LOAN"}/${userId}`
  );

  useEffect(() => {
    fetchPay();
    fetchStatus();
    fetchAmount();
  }, []);

  return (
    <section>
      <div className="flex flex-col gap-2 container mx-auto max-w-screen-2xl px-4 md:px-12 lg:px-28 pt-4">
        <Panel isMobileView={true} />
        <div className="flex items-center flex-no-shrink items-stretch justify-between mt-4">
          <h5 className="font-bold">Hello {name}</h5>
          <Button
            text="Add Application"
            bg="green"
            overlayContent={<ApplicationOverlay type="LOAN" period={true} loan={true} />}
          />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex gap-2">
            <div className="w-full">
              <div className="flex w-full bg-[var(--plain-color)] rounded-t-md p-4">
                <div className="flex flex-col gap-2">
                  <h5 className="text-xl font-bold">Total Loan</h5>
                  <p className="font-bold text-[var(--money-green)]">
                    {amount}
                  </p>
                  <p>Interests payable - {interest}</p>
                </div>
              </div>
              <div className="flex w-full bg-[var(--primary-color)] rounded-b-md p-4">
                <div className="flex flex-col gap-2">
                  <h6 className="text-white">
                    Payment amount to be made - ₦ {pay}
                  </h6>
                  <h6 className="text-white">Status - {status}</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-2">
            <Elements stripe={stripePromise}>
              <Applications isUser={true} />
            </Elements>
            <div className="flex flex-row lg:flex-col items-center lg:items-start gap-8  bg-white shadow-md p-4 lg:p-8 lg:px-12 rounded-md w-full lg:w-fit">
              <p>
                Do you need any help? <br /> We are here to assist you
              </p>
              <div className="flex flex-col md:flex-row lg:flex-col gap-4">
                <p>help@example.com</p>
                <p>091234567890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withAuth(page, ["member"]);
