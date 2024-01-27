"use client"

import {ToastContainer} from 'react-toastify'
import Posts from "./components/Posts";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <ToastContainer />
      <Posts />
    </main>
  );
}
