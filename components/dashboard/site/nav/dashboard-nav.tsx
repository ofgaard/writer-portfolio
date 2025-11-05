import Link from "next/link";
import UserMenu from "@/components/dashboard/user/user-menu";
import StoriesAccordion from "./stories-accordion";

const DashboardNav = () => {
  return (
    <nav className="flex flex-col h-full gap-20 px-5 py-8">
        <UserMenu />
      <ul className="flex flex-col text-lg space-y-6 font-bold">
        <li>
          <Link href="/dashboard/add-story">New Entry</Link>
        </li>
        <li>
          <StoriesAccordion />
        </li>
        <li>
          <Link href="/dashboard/profile/edit">Public Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardNav;
