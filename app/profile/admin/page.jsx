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
  const [companyInvestments, setCompanyInvestment] = useState(0);
  const [companyWithdrawn, setCompanyWithdrawn] = useState(0);
  const [investments, setInvestment] = useState(0);
  const [withdrawn, setWithdrawn] = useState(0);
  const [loanees, setLoanees] = useState(0);
  const [investors, setInvestors] = useState(0);
  const [referrals, setReferrals] = useState(0);
  const date = new Date().toISOString().split("T")[0];

  const options =[{name: "LOAN"}, {name: "ADMIN"}, {name: "INVESTOR"}]

  const fetchCompanyTransactions = fetchData(
    setCompanyInvestment,
    `/api/transactions/total/${"INVESTMENT"}`
  );
  const fetchCompanyWithdrawn = fetchData(
    setCompanyWithdrawn,
    `/api/transactions/total/${"WITHDRAW"}`
  );

  const fetchTransactions = fetchData(
    setInvestment,
    `/api/transactions/total/${"INVESTMENT"}/${userId}`
  );
  const fetchWithdrawn = fetchData(
    setWithdrawn,
    `/api/transactions/total/${"WITHDRAW"}/${userId}`
  );

  const typeInvestors = "INVESTOR";
  const typeLoanees = "LOAN";
  const fetchReferrals = fetchData(
    setReferrals,
    `/api/profile/referrals/${userId}/count`
  );
  const fetchInvestors = fetchData(
    setInvestors,
    `/api/profile/users/types/${typeInvestors}/count`
  );
  const fetchLoanees = fetchData(
    setLoanees,
    `/api/profile/users/types/${typeLoanees}/count`
  );

  useEffect(() => {
    fetchCompanyTransactions();
    fetchCompanyWithdrawn();
    fetchReferrals();
    fetchInvestors();
    fetchLoanees();
  }, []);

  return (
    <div className="w-3/4 pr-12 pt-12 left-0">
      <div className="flex flex-col w-full h-full space-y-4">
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-2xl">Dashboard</h3>
          <h5>Good to see you here</h5>
        </div>
        <div className="flex w-full justify-around space-x-2">
          <div className="bg-[var(--plain-color)] p-4 rounded-md w-full">
            <div>
              <h5 className="text-lg font-bold">Company Investments</h5>
              <span className="text-[var(--money-green)]">$ {companyInvestments}</span>
            </div>
            <div>
              <h5 className="text-lg font-bold">Company Total Withdrawn</h5>
              <span className="text-[var(--money-green)]">$ {companyWithdrawn}</span>
            </div>
          </div>
          <div className="bg-[var(--plain-color)] p-4 rounded-md w-full">
          <div>
              <h5 className="text-lg font-bold">Total Investments</h5>
              <span className="text-[var(--money-green)]">$ {investments}</span>
            </div>
            <div>
              <h5 className="text-lg font-bold">Total Withdrawn</h5>
              <span className="text-[var(--money-green)]">$ {withdrawn}</span>
            </div>
          </div>
          <div className="flex w-full space-x-2 h-full">
            <div className="flex flex-col w-1/2 space-y-2 h-full">
              <div className="bg-[var(--plain-color)] h-1/2 p-4 rounded-md w-full font-bold">
                <h5>REFERRAL'S</h5>
                <span>{referrals}</span>
              </div>
              <div className="bg-[var(--plain-color)] h-1/2 p-4 rounded-md w-full font-bold">
                <h5>DATE</h5>
                <span>{date}</span>
              </div>
            </div>
            <div className="flex flex-col w-1/2 space-y-2 h-full">
              <div className="bg-[var(--plain-color)] p-4 rounded-md w-full h-1/2 font-bold">
                <h5>Loanee's</h5>
                <span>{loanees}</span>
              </div>
              <div className="bg-[var(--plain-color)] p-4 rounded-md w-full h-1/2 font-bold">
                <h5>Investor's</h5>
                <span>{investors}</span>
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
