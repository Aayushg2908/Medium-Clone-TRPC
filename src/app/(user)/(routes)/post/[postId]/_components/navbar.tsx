import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserProfile from "./user-profile";

const PostNavbar = () => {
  return (
    <div className="w-full flex items-center justify-between h-[60px] sm:h-[70px] border-b border-b-gray-200">
      <div className="w-2/6 flex items-center justify-center gap-2">
        <Link href="/home">
          <Image src="/MediumLogo.png" alt="logo" width={50} height={50} />
        </Link>
        <div className="font-bold hidden text-3xl sm:inline-block tracking-tighter">
          Medium
        </div>
      </div>
      <div className="w-4/6 flex items-center justify-end mr-4">
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

export default PostNavbar;
