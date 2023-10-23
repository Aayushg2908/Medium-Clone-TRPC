import { Button } from "@/components/ui/button";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="hidden lg:flex w-1/3 border-l border-l-gray-200 justify-center">
      <div className="w-[250px] h-[250px] bg-blue-300 mt-6 flex flex-col gap-4 p-4">
        <div className="font-bold">Writing on Medium</div>
        <div>New writer FAQ</div>
        <div>Expert writing advice</div>
        <div>Grow your readership</div>
        <Link href="/write">
          <Button className="rounded-full w-fit">Start Writing</Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
