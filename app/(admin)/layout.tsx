import DashboardNav from "@/components/dashboard/site/nav/dashboard-nav";
import ResponsiveSidebar from "@/components/dashboard/site/nav/responsive-sidebar";
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
