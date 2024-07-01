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

  const [stats, setStats] = useState({
    companyInvestments: 0,
    companyWithdrawn: 0,
    investments: 0,
    withdrawn: 0,
    loanees: 0,
    investors: 0,
    referrals: 0,
    earning: 0,
  });

  const date = new Date().toISOString().split("T")[0];

  const options = [
    { name: "MEMBER" },
    { name: "ADMIN" },
    { name: "FINANCIAL_MEMBER" },
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchData(`/api/transactions/total/INVESTMENT`, (value) =>
          setStats((prev) => ({ ...prev, companyInvestments: value }))
        ),
        fetchData(`/api/transactions/total/WITHDRAW`, (value) =>
          setStats((prev) => ({ ...prev, companyWithdrawn: value }))
        ),
        fetchData(`/api/transactions/total/INVESTMENT/${userId}`, (value) =>
          setStats((prev) => ({ ...prev, investments: value }))
        ),
        fetchData(`/api/transactions/total/WITHDRAW/${userId}`, (value) =>
          setStats((prev) => ({ ...prev, withdrawn: value }))
        ),
        fetchData(`/api/transactions/total/earning/${userId}`, (value) =>
          setStats((prev) => ({ ...prev, earning: value }))
        ),
        fetchData(`/api/profile/referrals/${userId}/count`, (value) =>
          setStats((prev) => ({ ...prev, referrals: value }))
        ),
        fetchData(`/api/profile/users/types/FINANCIAL_MEMBER/count`, (value) =>
          setStats((prev) => ({ ...prev, investors: value }))
        ),
        fetchData(`/api/profile/users/types/MEMBER/count`, (value) =>
          setStats((prev) => ({ ...prev, loanees: value }))
        ),
      ]);
    };

    fetchAllData();
  }, [userId]);

  const InfoCard = ({ title, value, className, addNaira = false }) => (
    <div className={`flex flex-col bg-[var(--plain-color)] p-4 rounded-md w-full justify-around gap-2 ${className}`}>
      <h5 className="text-lg font-bold">{title}</h5>
      <span className={addNaira ? "text-[var(--money-green)]" : "text-black"}>
        {addNaira ? `₦ ${value}` : value}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col w-full pt-2">
      <div className="flex flex-col w-full h-full space-y-4 left-0">
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-2xl">Dashboard</h3>
          <h5>Good to see you here</h5>
        </div>
        <div className="flex flex-col lg:flex-row w-full justify-around space-y-2 md:space-y-0 lg:space-x-2">
          <div className="w-full flex flex-row space-x-2">
            <InfoCard title="Company Investments" value={stats.companyInvestments} addNaira={true} />
            <InfoCard title="Company Total Withdrawn" value={stats.companyWithdrawn} addNaira={true} />
          </div>
          <div className="w-full flex flex-row space-x-2">
            <InfoCard title="Total Investments" value={stats.investments} addNaira={true} />
            <InfoCard title="Total Withdrawn" value={stats.withdrawn} addNaira={true} />
          </div>
        </div>
        <div className="flex w-full space-x-2 h-full">
          <div className="flex flex-col w-1/2 space-y-2 h-full">
            <InfoCard title="REFERRAL'S" value={stats.referrals} className="h-1/2" />
            <InfoCard title="DATE" value={date} className="h-1/2" />
          </div>
          <div className="flex flex-col w-1/2 space-y-2 h-full">
            <InfoCard title="Member's" value={stats.loanees} className="h-1/2" />
            <InfoCard title="Financial Member's" value={stats.investors} className="h-1/2" />
          </div>
        </div>
        <div className="flex flex-row w-full gap-2">
          <div className="bg-[var(--plain-color)] w-full h-full md:w-1/4 flex flex-col gap-4 p-4 py-12 rounded-md">
            <h5 className="font-bold text-lg">Investment Gains</h5>
            <span className="text-[var(--money-green)]">₦ {stats.earning}</span>
          </div>
          <div className="bg-[var(--plain-color)] w-full md:w-3/4 flex flex-col gap-4 p-4 py-12 rounded-md">
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
