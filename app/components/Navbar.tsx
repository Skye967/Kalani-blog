"use client";

import Link from "next/link";
import SignInButton from "./navbarComponents/SignInButton";
import UserDropdown from "./navbarComponents/DropDownMenu";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">Kalani's Blog</div>

        <div className="flex space-x-4">
          <Link
            className="text-white hover:underline hover:text-blue-600"
            href="/"
          >
            Home
          </Link>

          <Link
            className="text-white hover:underline hover:text-blue-600"
            href="/contact"
          >
            Contact
          </Link>
          <Link href="">
            
            <UserDropdown />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
