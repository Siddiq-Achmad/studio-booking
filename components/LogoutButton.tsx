"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LogoutButton() {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 w-full"
      onClick={() =>
        signOut({ callbackUrl: "/login" })
          .then(() => {
            toast.warning("Logout Success!", {
              description: "You have been logged out.",
            });
          })
          .catch((error) => {
            toast.error("Logout Failed!", {
              description: error.message,
            });
          })
      }
    >
      <LogOut size={18} /> Logout
    </Button>
  );
}
