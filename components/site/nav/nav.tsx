
import Link from "next/link";

const Nav = () => {
  return <nav className="hidden md:flex justify-center border-b">
    <ul className={`flex text-xl space-x-10 p-4 font-bold`}>
      <li>
        <Link href="/stories/reporting" className="hover:text-muted-foreground">Reporting</Link>
      </li>
      <li>
        <Link href="/stories/press" className="hover:text-muted-foreground">Press & Communication</Link>
      </li>
      <li>
        <Link href="/profile" className="hover:text-muted-foreground">Profile</Link>
      </li>
    </ul>
  </nav>;
}

export default Nav;
