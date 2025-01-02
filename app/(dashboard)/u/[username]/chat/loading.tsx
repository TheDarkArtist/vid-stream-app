import React from "react";
import { ToggleCardSkeleton } from "./_components/toggle-card";

const ChatLoading = () => {
  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Chat Settings
        </h1>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <ToggleCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ChatLoading;
