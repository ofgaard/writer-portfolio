"use client";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

const user = {
  name: "Oliver",
  email: "oliver@example.com",
};

export default function UserMenu() {
  const router = useRouter();
  const firstLetter = user.name ? user.name[0].toUpperCase() : "?";

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/auth/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="w-10 h-10 rounded-full flex bg-yellow-500 items-center justify-center text-xl font-bold"
          aria-label="User menu"
        >
          {firstLetter}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>
          <div className="font-bold">{user.name}</div>
          <div className="text-xs">{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}