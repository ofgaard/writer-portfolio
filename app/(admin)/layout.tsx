import DashboardNav from "@/components/dashboard/site/nav/dashboard-nav";
import ResponsiveSidebar from "@/components/dashboard/site/nav/responsive-sidebar";
import { Geist } from "next/font/google";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }
  return (
    <div className={`${geistSans.className} antialiased flex min-h-screen`}>
      <nav className="w-64 border-r flex-col hidden md:flex">
        <DashboardNav />
      </nav>
      <ResponsiveSidebar>
        <nav className="w-64 border-r flex-col md:hidden">
          <DashboardNav />
        </nav>
      </ResponsiveSidebar>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
