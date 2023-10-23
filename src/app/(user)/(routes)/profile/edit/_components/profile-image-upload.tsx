"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

const ProfileImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return false;
  }

  return (
    <div className="space-y-4 w-full flex flex-col justify-center">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={(result: any) => onChange(result.info.secure_url)}
        uploadPreset="grwkis5v"
      >
        <div className="relative h-20 w-20">
          <Image
            fill
            alt="Upload"
            src={value || "/placeholder.svg"}
            className="rounded-full object-cover"
          />
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ProfileImageUpload;
