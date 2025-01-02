import { cn } from "@/lib/utils";
import React from "react";

interface LiveBadgeProps {
  className?: string;
}

const LiveBadge = ({ className }: LiveBadgeProps) => {
  return (
    <div
      className={cn(
        className,
        "bg-rose-600 text-center py-0 px-1.5 rounded-md uppercase text-[10px] border border-background font-semibold tracking-wide"
      )}
    >
      Live
    </div>
  );
};

export default LiveBadge;
