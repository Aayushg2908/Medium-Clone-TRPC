import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserProfile from "./user-profile";

const EditNavbar = () => {
  return (
    <div className="w-full flex items-center justify-between h-[60px] sm:h-[70px] border-b border-b-gray-200">
      <div className="flex items-center justify-center gap-2 ml-2">
        <Link href="/home" className="flex gap-2 items-center">
          <Image src="/MediumLogo.png" alt="logo" width={50} height={50} />
          <div className="font-bold hidden  sm:inline-block text-3xl tracking-tighter">
            Medium
          </div>
        </Link>
      </div>
      <div className="flex gap-1 mr-4 items-center">
        <Link href="/write">
          <Button
            variant="ghost"
            className="flex items-center justify-center gap-2 mr-2"
          >
            <Edit />
            <div>Write</div>
          </Button>
        </Link>
        <UserProfile />
      </div>
    </div>
  );
};

export default EditNavbar;
