import React from "react";
import PublicNavbar from "./PublicNavbar";

interface Props { children: React.ReactNode }

export default function PublicLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicNavbar />
      <main className="flex-1 py-6">{children}</main>
      <footer className="bg-white border-t py-6 text-center text-gray-600">
        <div className="max-w-7xl mx-auto px-4">
          © 2024 My Article Web • All rights reserved
        </div>
      </footer>
    </div>
  );
}