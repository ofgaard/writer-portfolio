import type { Metadata } from "next";
import Header from "@/components/site/header/header";
import Nav from "@/components/site/nav/nav";
import { Cormorant_Garamond } from "next/font/google";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Oliver Fruergaard - Writer's Portfolio",
  description: "Professional portfolio showcasing journalism, reporting, and press communications by Oliver Fruergaard",
};

const cormorantGaramond = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${cormorantGaramond.className} antialiased`}>
      <Header />
      <Nav />
      {children}
    </div>
  );
}
