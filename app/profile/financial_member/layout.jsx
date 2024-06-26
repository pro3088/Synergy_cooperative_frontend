"use client";
import { useEffect, useState } from "react";
import Navbar from "@components/layout/profile/Navbar";
import withAuth from "@/components/common/authentication/WithAuth";
import Panel from "@/components/page-sections/profile/Panel";

const items = [
    {name: "Dashboard", link: "/profile/financial_member", image: "/profiles/home.svg"},
    {name: "Investments", link: "/profile/financial_member/investment", image: "/profiles/application.svg"}
]

function RootLayout({ children }) {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileView(width < 768);
    };

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full">
      {isMobileView ? (
        <div className="flex flex-col w-full p-2 md:p-0">
          <Panel isMobileView={isMobileView} />
          <Navbar items={items} isMobileView={isMobileView} />
          {children}
        </div>
      ) : (
        <div className="flex flex-row p-0 space-x-12 w-full">
          <Navbar items={items} isMobileView={isMobileView} />

          <div className="flex w-full md:w-3/4 flex-col space-y-2 pt-4 md:pr-12">
            <Panel />
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default RootLayout;
// export default withAuth(RootLayout, ['financial_member']);
