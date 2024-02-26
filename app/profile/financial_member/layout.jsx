"use client";
import Navbar from "@components/layout/profile/Navbar";
import withAuth from "@/components/common/authentication/WithAuth";

const items = [
    {name: "Dashboard", link: "/profile/financial_member", image: "/profiles/home.svg"},
    {name: "Investments", link: "/profile/financial_member/investment", image: "/profiles/application.svg"}
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
