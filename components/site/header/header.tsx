import { Cormorant_Garamond } from "next/font/google";
import { ThemeSwitcher } from "@/components/theme-switcher";
import MobileNav from "@/components/site/nav/mobile-nav";
import Link from "next/link";
const cormorantGaramond = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});
const Header = () => {
    return (

        <header className="sticky top-0 z-50 bg-background flex items-center justify-between py-3 px-8 border-b">
            <div className="flex flex-col">
            <Link href="/home" className={`text-4xl font-bold tracking-tighter ${cormorantGaramond.className}`}>Oliver Fruergaard</Link>
            <p className="font-bold hidden md:block text-center">Writer&apos;s Portfolio</p>
</div>  
            <div className="flex gap-10 items-center">
            <ThemeSwitcher />
            <MobileNav />
            </div>
    
        </header>
    );
}

export default Header;