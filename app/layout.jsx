import "./globals.css";
import { AuthProvider } from "@components/page-sections/authentication/AuthProvider";

export const metadata = {
  title: "Synergy Cooperative",
  description:
    "An in-house application for investors and admins to handle investments.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
