import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/LogoutButton";

export default function Header() {
  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <LogoutButton />
    </header>
  );
}
