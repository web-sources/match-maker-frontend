"use client";

import { Navbar } from "./componets/Navbar";
import { Footer } from "./componets/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { shouldHideLayout } from "./utils/helper/hideLayout";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldHide = shouldHideLayout(pathname);

  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 relative overflow-hidden">
        {!shouldHide && <Navbar />}
        <main>
          {children}
        </main>
        {!shouldHide && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default ClientLayout;
