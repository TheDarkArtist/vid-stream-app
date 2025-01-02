import { Input } from "@/components/ui/input";
import React from "react";
import CopyButton from "./copy-button";

interface URLCardProps {
  value: string;
}

const URLCard = ({ value }: URLCardProps) => {
  return (
    <div className="rounded-xl bg-gray-900 p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Server URL</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex  items-center gap-x-2">
            <Input
              disabled
              value={value || ""}
              placeholder="Server URL"
            />
            <CopyButton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLCard;
