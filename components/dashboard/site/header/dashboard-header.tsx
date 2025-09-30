import { MenuIcon } from "lucide-react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import UserMenu from "@/components/dashboard/user/user-menu";


const DashboardHeader = ({ onMenuClick }: { onMenuClick: () => void }) => {

  return (
    <header className="flex items-center justify-between py-3 px-8 border-b">
      <div className="flex items-center gap-4">
        <UserMenu/>

      </div>
      <div className="flex flex-col items-center">
        {onMenuClick && <MenuIcon size={30} onClick={onMenuClick} />}
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default DashboardHeader;