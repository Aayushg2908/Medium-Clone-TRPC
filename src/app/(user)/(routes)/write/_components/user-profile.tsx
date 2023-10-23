"use client";

import { trpc } from "@/app/_trpc/client";
import { Spinner } from "@/components/loader";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

const UserProfile = () => {
  const { data, isLoading } = trpc.getUser.useQuery();
  const router = useRouter();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          className="rounded-full cursor-pointer"
          alt="userImage"
          src={data?.imageURL || ""}
          width={40}
          height={40}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            router.push("/profile");
          }}
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <SignOutButton signOutCallback={() => router.push("/")}>
            <LogOut className="mr-2 h-4 w-4" />
          </SignOutButton>
          <SignOutButton signOutCallback={() => router.push("/")}>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
