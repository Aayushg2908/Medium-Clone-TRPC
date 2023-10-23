"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

const AboutNavbar = () => {
  return (
    <div className="w-full flex items-center justify-between h-[60px] sm:h-[80px] border-b border-b-white bg-[#242424]">
      <Link href="/" className="flex justify-center items-center gap-1 ml-2">
        <Image src="/MediumLogo3.png" alt="mediumLogo" width={50} height={50} />

        <div className="text-white font-bold text-2xl sm:text-3xl tracking-tighter">
          Medium
        </div>
      </Link>
      <div className="items-center justify-end flex gap-4 mr-4">
        <SignInButton mode="modal">
          <Button variant="outline" className="rounded-full">
            Sign in
          </Button>
        </SignInButton>
      </div>
    </div>
  );
};

export default AboutNavbar;
