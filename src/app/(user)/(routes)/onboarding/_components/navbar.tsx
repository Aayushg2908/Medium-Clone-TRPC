import Image from "next/image";
import Link from "next/link";

const OnboardingNavbar = () => {
  return (
    <div className="w-full flex items-center h-[60px] sm:h-[80px] border-b border-b-black bg-white">
      <Link
        href="/home"
        className="sm:w-2/6 flex justify-center items-center gap-1 ml-2"
      >
        <Image src="/MediumLogo.png" alt="mediumLogo" width={50} height={50} />
        <div className="font-bold text-2xl sm:text-3xl tracking-tighter">
          Medium
        </div>
      </Link>
    </div>
  );
};

export default OnboardingNavbar;
