import Image from "next/image";
import Link from "next/link";
import React from "react";
import Draft from "./draft";
import UserProfile from "./user-profile";

const WriteNavbar = () => {
  return (
    <div className="w-full flex items-center justify-between h-[60px] sm:h-[80px] border-b border-b-black">
      <div className="w-2/6 flex items-center justify-center gap-2">
        <Link href="/home">
          <Image src="/MediumLogo.png" alt="logo" width={50} height={50} />
        </Link>
        <Draft />
      </div>
      <div className="w-4/6 flex justify-end items-center mr-6">
        <UserProfile />
      </div>
    </div>
  );
};

export default WriteNavbar;
