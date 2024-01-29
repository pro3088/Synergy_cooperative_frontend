import Navbar from "@components/layout/profile/Navbar";

const items = [
    {name: "Dashboard", link: "/profile/investor"},
    {name: "Investments", link: "/profile/investor/investment"}
]

export default function RootLayout({ children }) {
  return (
    <div className="flex space-x-12 w-full">
      <Navbar items={items} />
      {children}
    </div>
  );
}
