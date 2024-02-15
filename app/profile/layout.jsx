import Navbar from "@components/layout/Navbar";
import { useAuth } from "@/components/common/authentication/AuthProvider";
import ProtectedRoute from "@/components/common/authentication/ProtectedRoute";

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
