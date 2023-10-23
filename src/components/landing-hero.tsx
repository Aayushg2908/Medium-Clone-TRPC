import { SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const LandingHero = () => {
  return (
    <div className="h-[520px] border border-b-black bg-[#ffc017] flex justify-center items-center">
      <div className="w-1/2 flex flex-col items-center">
        <div className="font-bold text-4xl sm:text-6xl lg:text-8xl mb-2 tracking-tight">
          Stay Curious.
        </div>
        <div className="font-semibold text-2xl sm:text-4xl tracking-tighter my-2">
          Discover stories, thinking, and expertise from writers on any topic.
        </div>
        <SignInButton mode="modal">
          <Button className="rounded-full" size="lg">
            Start Reading
          </Button>
        </SignInButton>
      </div>
    </div>
  );
};

export default LandingHero;
