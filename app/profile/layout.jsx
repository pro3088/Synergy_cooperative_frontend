import ProtectedRoute from "@/components/common/authentication/ProtectedRoute";

export default function RootLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
