"use client";
import Panel from "@/components/page-sections/profile/Panel";

function RootLayout({ children }) {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col w-full p-2 md:p-0 space-y-4">
        <Panel isMobileView={true} />
        {children}
      </div>
    </div>
  );
}

export default RootLayout;
