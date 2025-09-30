import Link from "next/link";
import UserMenu from "@/components/dashboard/user/user-menu";
import StoriesAccordion from "./stories-accordion";
import { AddStoryDialog } from "../../stories/add-story-dialog";

const DashboardNav = () => {
  return (
    <nav className="flex flex-col h-full gap-20 px-5 py-8">
      <div className="mb-8 flex">
        <UserMenu />
      </div>
      <ul className="flex flex-col text-lg space-y-6 font-bold">
        <li>
          <AddStoryDialog>
            <button className="w-full text-left">Add Story</button>
            </AddStoryDialog>
            </li>
        <li>
          <StoriesAccordion />
        </li>
        <li>
          <Link href="/dashboard/profile/edit">Edit Profile Text</Link>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardNav;
