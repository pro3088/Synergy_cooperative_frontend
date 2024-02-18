"use client"
import Navbar from "@components/layout/profile/Navbar";
import withAuth from "@/components/common/authentication/WithAuth";

const items = [
    {name: "Dashboard", link: "/profile/admin", image: "/profiles/home.svg"},
    {name: "Members", link: "/profile/admin/members", image: "/profiles/members.svg"},
    {name: "Applications", link: "/profile/admin/applications", image: "/profiles/application.svg"},
    {name: "Bank", link: "/profile/admin/bank", image: "/profiles/home.svg"}
]

function RootLayout({ children }) {
  return (
    <div className="flex space-x-12 w-full">
      <Navbar items={items} />
      {children}
    </div>
  );
}

export default withAuth(RootLayout, ['admin']);