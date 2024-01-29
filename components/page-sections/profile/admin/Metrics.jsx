"use client";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../app/profile/admin/page";

export const page = () => {
  const [investments, setInvestment] = useState(0);
  const [withdrawn, setWithdrawn] = useState(0);
  const [loans, setLoans] = useState(0);
  const [loanees, setLoanees] = useState(0);
  const [investors, setInvestors] = useState(0);
  const [referrals, setReferrals] = useState(0);
  const date = new Date().toISOString().split('T')[0];

  const fetchTransactions = fetchData(
    setInvestment,
    "/api/transactions/total/investment"
  );
  const fetchWithdrawn = fetchData(
    setWithdrawn,
    "/api/transactions/total/withdrawn"
  );
  const fetchLoans = fetchData(setLoans, "/api/transactions/total/loan");

  useEffect(() => {
    fetchTransactions();
    fetchWithdrawn();
    fetchLoans;
  }, []);

  return (
    <div className="w-full pr-12 left-0">
      <div className="flex flex-col w-full h-full justify-around">
        <div className="flex w-full justify-around space-x-2">
          <div className="bg-[var(--plain-color)] p-4 rounded-md w-full">
            <div>
              <h5>Company Investments</h5>
              <span className="text-[var(--money-green)]">${investments}</span>
            </div>
            <div>
              <h5>Total Withdrawn</h5>
              <span className="text-[var(--money-green)]">${withdrawn}</span>
            </div>
          </div>
          <div className="bg-[var(--plain-color)] p-4 rounded-md w-full">
            <div>
              <h5>Loan(s) Given</h5>
              <span className="text-[var(money-green)]">${loans}</span>
            </div>
            <div>
              <h5>Total Withdrawn</h5>
              <span className="text-[var(money-green)]">${withdrawn}</span>
            </div>
          </div>
          <div className="flex flex w-full space-x-2 h-full">
            <div className="flex flex-col w-1/2 space-y-2 h-full">
              <div className="bg-[var(--plain-color)] p-4 rounded-md w-full font-bold">
                <h5>REFERRAL'S</h5>
                <span>{referrals}</span>
              </div>
              <div className="bg-[var(--plain-color)] p-4 rounded-md w-full font-bold">
                <h5>DATE</h5>
                <span>{date}</span>
              </div>
            </div>
            <div className="flex flex-col w-1/2 space-y-2 h-full">
              <div className="bg-[var(--plain-color)] p-2 rounded-md w-full h-1/2 font-bold">
                <h5>Loanee's</h5>
                <span>{loanees}</span>
              </div>
              <div className="bg-[var(--plain-color)] p-2 rounded-md w-full h-1/2 font-bold">
                <h5>Investor's</h5>
                <span>{investors}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
