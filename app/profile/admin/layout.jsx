import Navbar from "@components/layout/profile/Navbar";

const items = [
    {name: "Dashboard", link: "/profile/admin"},
    {name: "Members", link: "/profile/admin/members"},
    {name: "Applications", link: "/profile/admin/applications"},
    {name: "Bank", link: "/profile/admin/bank"}
]

export default function RootLayout({ children }) {
  return (
    <div className="flex space-x-12 w-full">
      <Navbar items={items} />
      {children}
    </div>
  );
}
