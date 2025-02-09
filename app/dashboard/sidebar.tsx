import Link from "next/link";
import { Home, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/LogoutButton";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-6">Dashboard</h2>

      <nav className="flex-1">
        <ul className="space-y-3">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-800"
            >
              <Home size={20} /> Home
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-800"
            >
              <User size={20} /> Profile
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <LogoutButton />
    </aside>
  );
}
