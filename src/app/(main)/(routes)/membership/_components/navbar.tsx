import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

const MembershipNavbar = () => {
  return (
    <div className="sticky top-0 w-full flex items-center justify-between h-[60px] sm:h-[80px] border-b border-b-white transition duration-300 bg-[#4479ff] text-white">
      <Link href="/" className="flex justify-center items-center gap-1 ml-2">
        <Image src="/MediumLogo4.png" alt="mediumLogo" width={50} height={50} />
        <div className="font-bold text-2xl sm:text-3xl tracking-tighter">
          Medium
        </div>
      </Link>
      <div className="items-center justify-end flex gap-4 mr-4">
        <Link href="/about" className="text-sm hidden sm:inline-block">
          Our Story
        </Link>
        <Link
          href="/membership"
          className="text-sm hidden sm:inline-block border-b border-b-white"
        >
          Membership
        </Link>
        <SignInButton mode="modal">
          <Button
            variant="link"
            className="hidden sm:inline-block rounded-full text-white"
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

export default MembershipNavbar;
