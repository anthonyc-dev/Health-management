"use client";

import { AuthContextProvider, useAuth } from "@/context/AuthContext";
import Sidebar from "./_components/Sidebar";
import LoginScreen from "@/app/_components/LoginAuth";
import { useEffect, useState } from "react";
import Header from "./_components/Header";

export default function Layout({ children }) {
  //   return (
  //     <AuthContextProvider>
  //       <AuthenticatedLayout>{children}</AuthenticatedLayout>
  //     </AuthContextProvider>
  //   );
  // }

  // function AuthenticatedLayout({ children }) {
  //   const { isAuthenticated } = useAuth();
  //   const [hasMounted, setHasMounted] = useState(false);

  //   useEffect(() => {
  //     // Ensures component only renders after mounting on the client
  //     setHasMounted(true);
  //   }, []);

  //   if (!hasMounted) {
  //     // Optionally, return a loading indicator
  //     return null;
  //   }

  //   if (!isAuthenticated) {
  //     return <LoginScreen />;
  //   }

  return (
    <>
      <Header />
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white">
          <Sidebar />
        </div>
        {/* Main content */}
        <div className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</div>
      </div>
    </>
  );
}
