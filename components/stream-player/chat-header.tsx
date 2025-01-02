"use client";

import { Skeleton } from "../ui/skeleton";
import ChatToggle from "./chat-toggle";
import VariantToggle from "./variant-toggle";

const ChatHeader = () => {
  return (
    <div className="relative p-3 border-b">
      <div className="hidden lg:block absolute left-2 top-2">
        <ChatToggle />
      </div>
      <p className="font-semibold text-primary text-center">Stream Chat</p>

      <div className="absolute right-2 top-2">
        <VariantToggle />
      </div>
    </div>
  );
};

export const ChatHeaderSkeleton = () => {
  return (
    <div className="hidden md:block relative p-3 border-b">
      <Skeleton className="absolute size-6 left-3 top-3" />
      <Skeleton className="h-6 w-28 mx-auto" />
    </div>
  );
};

export default ChatHeader;
