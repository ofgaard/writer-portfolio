"use client"

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button aria-label="Open menu">
          <MenuIcon size={30} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className={`${cormorantGaramond.className} pl-10`}>
        <nav className="mt-8">
          <ul className="flex flex-col space-y-6 text-xl font-bold">
            <li>
              <Link href="/stories/reporting" className="hover:text-muted-foreground" onClick={() => setOpen(false)}>
                Reporting
              </Link>
            </li>
            <li>
              <Link href="/stories/press" className="hover:text-muted-foreground" onClick={() => setOpen(false)}>
                Press & Communication
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-muted-foreground" onClick={() => setOpen(false)}>
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
