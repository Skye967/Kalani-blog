"use client"

import Posts from "./components/Posts";
import Navbar from "./components/Navbar";
import Profile from './components/Profile';
import { useState, useEffect } from 'react';
import Loading from './components/Loading';
import { ToastContainer } from "react-toastify";

export default function Home() {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("storage", function () {
      let res = localStorage.getItem("isLoading");
      res === "false" ? setIsLoading(false) : setIsLoading(true);
    });
  });

  return (
    <main className="">
      <Navbar />
      <ToastContainer />
      {isLoading ? <Loading /> : <div></div>}
      <div className="flex items-center justify-center">
        <div>
          <Profile
            pictureUrl="/images/profile.jpg"
            biography="Passionate developer exploring the world of technology."
          />
        </div>
        <div>
          <Posts />
        </div>
      </div>
    </main>
  );
}
