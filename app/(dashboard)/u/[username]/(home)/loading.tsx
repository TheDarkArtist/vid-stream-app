import { StreamPlayerSkeleton } from "@/components/stream-player";
import React from "react";

export const CreatorLoading = () => {
  return (
    <div className="h-full">
      <StreamPlayerSkeleton />
    </div>
  );
};

export default CreatorLoading;
