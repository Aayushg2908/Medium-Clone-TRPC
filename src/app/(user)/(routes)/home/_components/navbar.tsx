import Image from "next/image";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { SearchInput } from "./search-input";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserProfile from "./user-profile";

const HomeNavbar = () => {
  return (
    <div className="w-full flex items-center justify-between h-[60px] sm:h-[70px] border-b border-b-gray-200">
      <div className="w-2/6 flex items-center justify-center gap-2">
        <Link href="/home">
          <Image src="/MediumLogo.png" alt="logo" width={50} height={50} />
        </Link>
        <div className="flex items-center gap-2 bg-zinc-100 rounded-full">
          <SearchIcon className="ml-2" />
          <SearchInput
            placeholder="search"
            className="hidden sm:inline-block bg-zinc-100 rounded-full border-none outline-none"
          />
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

export default HomeNavbar;
