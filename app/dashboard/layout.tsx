"use client";
import Sidebar from "./sidebar";
import Header from "./header";

import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col w-full">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <SessionProvider>{children}</SessionProvider>
        </main>
      </div>
    </div>
  );
}
