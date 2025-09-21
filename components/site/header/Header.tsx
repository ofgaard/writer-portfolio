import { MenuIcon } from "lucide-react";
import { Lora } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
const lora = Lora({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});
const cormorantGaramond = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});
const Header = () => {
    return (

        <header className="flex items-center justify-between py-3 px-8 border-b">
            <div className="flex flex-col items-center">
            <Link href="/home" className={`text-4xl text-yellow-600 font-bold tracking-tighter ${cormorantGaramond.className}`}>Oliver Fruergaard</Link>
            <p className="font-bold">Writers Portfolio</p>
</div>  
            <div className="flex flex-col items-center">
            <MenuIcon size={30}/>
            <ThemeSwitcher />
            </div>
    
        </header>
    );
}

export default Header;