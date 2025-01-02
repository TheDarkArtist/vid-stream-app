"use client";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import ChatInfo from "./chat-info";

interface ChatFormProps {
  isFollowing: boolean;
  isChatFollowersOnly: boolean;
  isChatDelayed: boolean;
  value: string;
  isHidden: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const ChatForm = ({
  value,
  onSubmit,
  onChange,
  isFollowing,
  isChatFollowersOnly,
  isChatDelayed,
  isHidden,
}: ChatFormProps) => {
  const [isDelayedBlocked, setIsDelayedBlocked] = useState(false);
  const isChatFollowersOnlyAndNotFollowing =
    isChatFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isDelayedBlocked || isChatFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isChatDelayed && !isDelayedBlocked) {
      setIsDelayedBlocked(true);
      setTimeout(() => {
        setIsDelayedBlocked(false);
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <form
      className="flex flex-col items-center gap-y-4 p-3"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <ChatInfo
          isDelayed={isChatDelayed}
          isFollowersOnly={isChatFollowersOnly}
        />
        <Input
          className={cn(
            "border-white/10",
            (isChatFollowersOnly || isChatDelayed) &&
              "rounded-t-none border-t-0 dark:border-blue-900",
          )}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Send a Message..."
        />
      </div>
      <div className="ml-auto">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={isDisabled}
        >
          Chat
        </Button>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};

export default ChatForm;
