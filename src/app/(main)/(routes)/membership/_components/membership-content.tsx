import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

const MembershipContent = () => {
  return (
    <div className="bg-[#4479ff] text-white">
      <div className="h-[560px] flex flex-col gap-2 items-center justify-center border-b border-b-white">
        <div className="font-bold text-4xl sm:text-6xl lg:text-8xl tracking-tighter">
          Fuel great thinking.
        </div>
        <div className="w-1/2 my-2 text-xl">
          Become a Medium member to enjoy unlimited access and directly support
          the writers you read most.
        </div>
        <SignInButton mode="modal" redirectUrl="/settings">
          <Button
            variant="outline"
            className="rounded-full mt-4 text-black text-lg"
          >
            Get unlimited access
          </Button>
        </SignInButton>
      </div>
    </div>
  );
};

export default MembershipContent;
