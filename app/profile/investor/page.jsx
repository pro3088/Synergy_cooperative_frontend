"use client";
import { useEffect, useState } from "react";
import Button from "@components/common/OverlayButton";
import Referral from "@components/page-sections/profile/admin/ReferralGenerator";
import { useAuth } from "@components/page-sections/authentication/AuthProvider";

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
        console.error("Failed to fetch data for " + name);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
}

const page = () => {
  const { user } = useAuth();
  const userId = user != null ? user.id : "id";
  const type = "INVESTMENT";
  const [investments, setInvestment] = useState(0);
  const [withdrawn, setWithdrawn] = useState(0);
  const [earning, setEarning] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [profile, setProfile] = useState("");
  const [dateJoined, setDateJoined] = useState(0);
  const date = new Date().toISOString().split("T")[0];
  const remainer = investments - withdrawn;

  const options =[{name: "LOAN"}, {name: "INVESTOR"}]

  const fetchTransactions = fetchData(
    setInvestment,
    `/api/transactions/total/${"INVESTMENT"}/${userId}`
  );
  const fetchWithdrawn = fetchData(
    setWithdrawn,
    `/api/transactions/total/${"WITHDRAW"}/${userId}`
  );
  const fetchInvestmentCount = fetchData(
    setTransactions,
    `/api/transactions/total/${type}/${userId}/count`
  );
  const fetchTotalEarning = fetchData(setEarning, `/api/transactions/total/earning/${userId}`)

  useEffect(() => {
    fetchTransactions();
    fetchWithdrawn();
    fetchInvestmentCount();
    fetchTotalEarning();
    if (user != null) {
      setProfile(user.firstName);
      setDateJoined(user.dateJoined);
    }
  }, []);

  return (
    <div className="w-3/4 pr-12 pt-12 left-0">
      <div className="flex flex-col w-full h-full space-y-4">
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-2xl">Dashboard</h3>
          <h5>Good to see you here</h5>
        </div>
        <div className="flex w-full justify-around space-x-2">
          <div className="flex flex-col gap-2 bg-[var(--plain-color)] p-4 rounded-md w-full">
            <div>
              <h5 className="text-lg font-bold">Total Investments</h5>
              <span className="text-[var(--money-green)]">$ {investments}</span>
            </div>
            <div>
              <h5 className="text-lg font-bold">Total Withdrawn</h5>
              <span className="text-[var(--money-green)]">$ {withdrawn}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 bg-[var(--plain-color)] p-4 rounded-md w-full">
            <div>
              <h5 className="text-lg font-bold">Remaining Investment</h5>
              <span className="text-[var(--money-green)]">$ {remainer}</span>
            </div>
            <div>
              <h5 className="text-lg font-bold">Total Earning</h5>
              <span className="text-[var(--money-green)]">$ {earning}</span>
            </div>
          </div>
          <div className="flex flex w-full space-x-2 h-full">
            <div className="flex flex-col w-1/2 space-y-2 h-full">
              <div className="bg-[var(--plain-color)] h-1/2 p-4 rounded-md w-full font-bold">
                <h5>Transactions</h5>
                <span>{transactions}</span>
              </div>
              <div className="bg-[var(--plain-color)] h-1/2 p-4 rounded-md w-full font-bold">
                <h5>JOINED</h5>
                <span>{dateJoined}</span>
              </div>
            </div>
            <div className="flex flex-col w-1/2 space-y-2 h-full">
              <div className="bg-[var(--plain-color)] p-4 rounded-md w-full h-1/2 font-bold">
                <h5>Profile</h5>
                <span>{profile}</span>
              </div>
              <div className="bg-[var(--plain-color)] p-4 rounded-md w-full h-1/2 font-bold">
                <h5>DATE</h5>
                <span>{date}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="bg-[var(--plain-color)] w-1/2 flex flex-col gap-4 p-4 py-12 rounded-md">
            <h5 className="font-bold text-lg">Generate Referral</h5>
            <Button text="Generate Referral" overlayContent={<Referral options={options} />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
