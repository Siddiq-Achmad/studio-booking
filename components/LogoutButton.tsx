"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 w-full"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      <LogOut size={18} /> Logout
    </Button>
  );
}
