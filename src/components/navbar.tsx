"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { SignInButton } from "@clerk/nextjs";

const Navbar = () => {
  const [isScrolledEnough, setIsScrolledEnough] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) {
        setIsScrolledEnough(true);
      } else {
        setIsScrolledEnough(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 w-full flex items-center h-[60px] sm:h-[80px] border-b border-b-black transition duration-300",
        isScrolledEnough ? "bg-white" : "bg-[#ffc017]"
      )}
    >
      <Link
        href="/"
        className="sm:w-2/6 flex justify-center items-center gap-1 ml-2"
      >
        {isScrolledEnough ? (
          <Image
            src="/MediumLogo.png"
            alt="mediumLogo"
            width={50}
            height={50}
          />
        ) : (
          <Image
            src="/MediumLogo2.png"
            alt="mediumLogo"
            width={50}
            height={50}
          />
        )}

        <div className="font-bold text-2xl sm:text-3xl tracking-tighter">
          Medium
        </div>
      </Link>
      <div className="w-3/6 items-center justify-end flex gap-4 mr-4">
        <Link href="/about" className="text-sm hidden sm:inline-block">
          Our Story
        </Link>
        <Link href="/membership" className="text-sm hidden sm:inline-block">
          Membership
        </Link>
        <SignInButton mode="modal">
          <Button
            variant="link"
            className="rounded-full hidden sm:inline-block"
          >
            Sign in
          </Button>
        </SignInButton>
        <SignInButton mode="modal">
          <Button className="rounded-full">Get Started</Button>
        </SignInButton>
      </div>
    </div>
  );
};

export default Navbar;
