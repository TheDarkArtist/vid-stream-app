import { cn } from "@/lib/utils";
import { poppins } from "@/utils/fonts";
import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-1">
        <Image
          src="/favicon.svg"
          alt="tda"
          height={80}
          width={80}
        />
      </div>
      <div className={cn(poppins.className, "text-center")}>
        <p className="text-2xl font-semibold">
          Vid Stream App
        </p>
        <p className="text-sm">Let&apos;s go</p>
      </div>
    </div>
  );
};

export default Logo;
