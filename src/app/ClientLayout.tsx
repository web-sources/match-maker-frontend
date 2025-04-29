"use client";

import { Navbar } from "./componets/Navbar";
import { Footer } from "./componets/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { shouldHideLayout } from "./utils/helper/hideLayout";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

function ClientLayout({ children }: { children: React.ReactNode }) {
  const [routeChange, setRouteChange] = useState("");

  const pathname = usePathname();
  const shouldHide = shouldHideLayout(pathname);

  useEffect(() => {
    setRouteChange(pathname);
  }, [pathname]);

  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <div className="min-h-screen flex flex-col">
        {!shouldHide && <Navbar changeRoute={routeChange} />}
        <main className="flex-1 relative z-0">{children}</main>
        {pathname !== "/login" && pathname !== "/register" && !shouldHide && (
          <Footer />
        )}
      </div>
    </AuthProvider>
  );
}

export default ClientLayout;
