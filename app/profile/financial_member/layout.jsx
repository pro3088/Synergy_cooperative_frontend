"use client";
import Navbar from "@components/layout/profile/Navbar";
import withAuth from "@/components/page-sections/authentication/WithAuth";

const items = [
    {name: "Dashboard", link: "/profile/investor"},
    {name: "Investments", link: "/profile/investor/investment"}
]

function RootLayout({ children }) {
  return (
    <div className="flex space-x-12 w-full">
      <Navbar items={items} />
      {children}
    </div>
  );
}

export default withAuth(RootLayout, ['financial_member']);
