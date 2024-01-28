"use client"

import Image from "next/image";
import React from "react";

type ProfileProps = {
  pictureUrl: string;
  biography: string;
};

const Profile: React.FC<ProfileProps> = ({ pictureUrl, biography }) => {
  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col items-center space-x-4">
        <Image
          src={pictureUrl}
          alt="Profile Picture"
          width={300}
          height={300}
          priority
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">Skye Grossman</h1>
          <p>{biography}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;