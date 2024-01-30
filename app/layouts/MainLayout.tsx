"use client";

import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("storage", function () {
      let res = localStorage.getItem("isLoading");
      res === "false" ? setIsLoading(false) : setIsLoading(true);
    });
  });

  return (
    <>
      <div
        id="Mainlayout"
        className="border min-w-[1050] max-w-[1300px] mx-auto"
      >
        <div>
          {isLoading ? <Loading /> : null}
          <Navbar />
          {children}
        </div>
      </div>
    </>
  );
}

export default MainLayout;
