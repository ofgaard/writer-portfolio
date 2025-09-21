import { Lora } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});


const Nav = () => {
  return <nav className="flex justify-center border-b">
    <ul className={`flex text-xl space-x-10 p-4 ${cormorantGaramond.className} font-bold`}>
      <li>Reporting</li>
        <li>Press & Communication</li>
        <li>Profile</li>

    </ul>
  </nav>;
}

export default Nav;
