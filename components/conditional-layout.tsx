"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide navbar and footer on admin and login pages
  const hideNavAndFooter = mounted && (pathname === "/admin" || pathname === "/login" || pathname.startsWith("/admin/"));

  return (
    <>
      {mounted && !hideNavAndFooter && <Navbar />}
      <main className={hideNavAndFooter ? "" : "min-h-screen"}>
        {children}
      </main>
      {mounted && !hideNavAndFooter && <Footer />}
    </>
  );
}