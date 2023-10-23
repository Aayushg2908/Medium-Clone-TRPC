import Image from "next/image";
import Link from "next/link";

const MembershipFooter = () => {
  return (
    <div className="w-full flex items-center justify-between h-[60px] sm:h-[80px]">
      <Link href="/" className="flex justify-center items-center gap-1 ml-2">
        <Image src="/MediumLogo.png" alt="mediumLogo" width={50} height={50} />

        <div className="font-bold text-2xl sm:text-3xl tracking-tighter">
          Medium
        </div>
      </Link>
      <div className="flex items-center justify-end gap-4 mr-4">
        <div>About</div>
        <div>Terms</div>
        <div>Privacy</div>
        <div>Help</div>
      </div>
    </div>
  );
};

export default MembershipFooter;
