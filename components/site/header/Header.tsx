import { MenuIcon } from "lucide-react";
import { Lora } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { ThemeSwitcher } from "@/components/theme-switcher";
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
            <h1 className={`text-4xl text-yellow-600 font-bold tracking-tighter ${cormorantGaramond.className}`}>Oliver Fruergaard</h1>
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