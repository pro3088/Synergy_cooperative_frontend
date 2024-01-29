import Navbar from "@components/layout/Navbar";
import { useAuth } from "@components/page-sections/authentication/AuthProvider";
import ProtectedRoute from "@components/page-sections/authentication/ProtectedRoute";

export default function RootLayout({ children }) {
  return (
    <ProtectedRoute >
        <Navbar
          linkColor="black"
          showBackground={false}
          plainBackground={true}
        />
        {children}
    </ProtectedRoute>
  );
}
