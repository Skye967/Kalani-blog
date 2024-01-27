
"use client"

import Link from "next/link";

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
            href="/create-post"
          >
            Create Post
          </Link>

          <Link
            className="text-white hover:underline hover:text-blue-600"
            href="/contact"
          >
            Contact
          </Link>

          <button className="bg-white text-blue-500 px-4 py-2 rounded-full">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
