"use client";

import { Context, useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/app/context/user";
import { Session, User } from "@supabase/supabase-js";
type UserContextProps = {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};


const UserDropdown: React.FC = () => {
  const {user, signOut} = useUser()
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    if (!user) return;
    if (!isOpen) setIsOpen(true);
    else if (isOpen) setIsOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return (
      <Link
        className="inline-flex items-center justify-center text-white hover:underline hover:text-blue-600"
        href="/auth"
      >
        Administrator
      </Link>
    );
  }

  return (
    <div className="relative inline-block text-left">
        <button
          type="button"
          className="inline-flex items-center justify-center text-white hover:underline hover:text-blue-600"
          onClick={() => handleToggleMenu()}
        >
          {"Hello, " + user.email}
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              href="/create-post"
            >
              Create Post
            </Link>
            {user && (
              <button
                onClick={handleSignOut}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
