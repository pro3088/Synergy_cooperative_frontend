"use client";
import { useEffect, useState } from "react";
import Navbar from "@components/layout/profile/Navbar";
import withAuth from "@/components/common/authentication/WithAuth";
import Panel from "@/components/page-sections/profile/Panel";

const items = [
  { name: "Dashboard", link: "/profile/admin", image: "/profiles/home.svg" },
  {
    name: "Members",
    link: "/profile/admin/members",
    image: "/profiles/members.svg",
  },
  {
    name: "Applications",
    link: "/profile/admin/applications",
    image: "/profiles/application.svg",
  }
];

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
    <div className="w-full h-full">
      {isMobileView ? (
        <div className="flex flex-col w-full p-2 md:p-0 space-y-4">
          <Panel isMobileView={true} />
          <Navbar items={items} isMobileView={true} />
          {children}
        </div>
      ) : (
        <div className="flex flex-row p-0 space-x-12 w-full h-full min-h-screen">
          <Navbar items={items} />
          <div className="flex w-full md:w-3/4 flex-col space-y-2 pt-4 md:pr-12">
            <Panel />
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(RootLayout, ["admin"]);
