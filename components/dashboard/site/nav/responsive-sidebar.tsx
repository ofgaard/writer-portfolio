"use client";

import { useState, useEffect } from "react";
import { MenuIcon, XIcon } from "lucide-react";

export default function ResponsiveSidebar({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setNavOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button
        className="md:hidden mb-4 fixed top-4 left-4 z-50"
        onClick={() => setNavOpen(true)}
        aria-label="Open navigation"
      >
        <MenuIcon size={30} />
      </button>
      {navOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/40" onClick={() => setNavOpen(false)}>
          <aside
            className="absolute left-0 top-0 h-full bg-background w-64 shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4"
              onClick={() => setNavOpen(false)}
              aria-label="Close navigation"
            >
              <XIcon size={30} />
            </button>
            {children}
          </aside>
        </div>
      )}
    </>
  );
}