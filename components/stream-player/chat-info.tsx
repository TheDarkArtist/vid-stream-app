"use client";

import { useMemo } from "react";
import Hint from "../hint";
import { Info } from "lucide-react";

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

const ChatInfo = ({ isDelayed, isFollowersOnly }: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Chat is Followers Only";
    }

    if (isDelayed && !isFollowersOnly) {
      return "Message are delayed by 3 seconds";
    }

    if (isDelayed && isFollowersOnly) {
      return "Followers Only and Message are delayed by 3 seconds";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Followers Only";
    }

    if (isDelayed && !isFollowersOnly) {
      return "Slow Mode";
    }

    if (isDelayed && isFollowersOnly) {
      return "Followers Only and Slow Mode";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) {
    return;
  }

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="size-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};

export default ChatInfo;
