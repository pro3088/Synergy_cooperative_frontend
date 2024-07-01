"use client";
import { useEffect, useState } from "react";
import Button from "@components/common/OverlayButton";
import Referral from "@components/page-sections/profile/admin/ReferralGenerator";
import { useAuth } from "@/components/common/authentication/AuthProvider";

const fetchData = async (apiEndpoint, setter) => {
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
      setter(data.value);
    } else {
      console.error("Failed to fetch data from " + apiEndpoint);
    }
  } catch (error) {
    console.error("Error during API call:", error);
  }
};

const page = () => {
  const { user } = useAuth();
  const userId = user?.id || "id";
  const type = "INVESTMENT";

  const [stats, setStats] = useState({
    investments: 0,
    withdrawn: 0,
    earning: 0,
    transactions: 0,
    profile: "",
    dateJoined: "",
  });

  const date = new Date().toISOString().split("T")[0];
  const remainder = stats.investments - stats.withdrawn;

  const options = [{ name: "MEMBER" }, { name: "FINANCIAL_MEMBER" }];

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchData(`/api/transactions/total/INVESTMENT/${userId}`, (value) =>
          setStats((prev) => ({ ...prev, investments: value }))
        ),
        fetchData(`/api/transactions/total/WITHDRAW/${userId}`, (value) =>
          setStats((prev) => ({ ...prev, withdrawn: value }))
        ),
        fetchData(`/api/transactions/total/${type}/${userId}/count`, (value) =>
          setStats((prev) => ({ ...prev, transactions: value }))
        ),
        fetchData(`/api/transactions/total/earning/${userId}`, (value) =>
          setStats((prev) => ({ ...prev, earning: value }))
        ),
      ]);

      if (user) {
        setStats((prev) => ({
          ...prev,
          profile: user.firstName,
          dateJoined: user.dateJoined,
        }));
      }
    };

    fetchAllData();
  }, [userId, user]);

  const InfoCard = ({ title, value, className, addNaira = false }) => {
    const formattedValue = addNaira
      ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(value)
      : value;
  
    return (
      <div className={`flex flex-col bg-[var(--plain-color)] p-4 rounded-md w-full justify-around gap-2 ${className}`}>
        <h5 className="text-lg font-bold">{title}</h5>
        <span className={addNaira ? "text-[var(--money-green)]" : "text-black"}>
          {formattedValue}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full py-2">
      <div className="flex flex-col w-full h-full space-y-4 left-0">
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-2xl">Dashboard</h3>
          <h5>Good to see you here</h5>
        </div>
        <div className="flex flex-col lg:flex-row w-full justify-around space-y-2 md:space-y-0 lg:space-x-2">
          <div className="w-full flex flex-row space-x-2">
            <InfoCard title="Total Investments" value={stats.investments} addNaira={true} />
            <InfoCard title="Total Withdrawn" value={stats.withdrawn} addNaira={true} />
          </div>
          <div className="w-full flex flex-row space-x-2">
            <InfoCard title="Remaining Investments" value={remainder} addNaira={true} />
            <InfoCard title="Total Earnings" value={stats.earning} addNaira={true} />
          </div>
        </div>
        <div className="flex w-full space-x-2 h-full">
          <div className="flex flex-col w-1/2 space-y-2 h-full">
            <div className="bg-[var(--plain-color)] h-1/2 p-4 rounded-md w-full font-bold">
              <h5>Transactions</h5>
              <span>{stats.transactions}</span>
            </div>
            <div className="bg-[var(--plain-color)] h-1/2 p-4 rounded-md w-full font-bold">
              <h5>JOINED</h5>
              <span>{stats.dateJoined}</span>
            </div>
          </div>
          <div className="flex flex-col w-1/2 space-y-2 h-full">
            <div className="bg-[var(--plain-color)] p-4 rounded-md w-full h-1/2 font-bold">
              <h5>Profile</h5>
              <span>{stats.profile}</span>
            </div>
            <div className="bg-[var(--plain-color)] p-4 rounded-md w-full h-1/2 font-bold">
              <h5>DATE</h5>
              <span>{date}</span>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <div className="bg-[var(--plain-color)] w-full md:w-1/2 flex flex-col gap-4 p-4 py-12 rounded-md">
            <h5 className="font-bold text-lg">Generate Referral</h5>
            <Button
              text="Generate Referral"
              overlayContent={<Referral options={options} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
