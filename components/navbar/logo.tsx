import { cn } from "@/lib/utils";
import { poppins } from "@/utils/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-x-2 hover:opacity-75 transition">
        <div className="bg-gray-700 p-0.5 rounded-full mr-2 size-8">
          <Image
            src={"/favicon.svg"}
            width={32}
            height={32}
            alt="TDA VID STREAM APP"
          />
        </div>
        <div className={(cn(poppins.className), "hidden lg:block")}>
          <p className="font-semibold text-sm">Vid Stream App</p>
          <p className="text-xs">Let&apos;s hack the box</p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
