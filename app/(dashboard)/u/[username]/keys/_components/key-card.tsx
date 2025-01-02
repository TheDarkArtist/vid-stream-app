"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import CopyButton from "./copy-button";
import { Button } from "@/components/ui/button";

interface KeyCardProps {
  value: string | null;
}

const KeyCard = ({ value }: KeyCardProps) => {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="rounded-xl bg-gray-900 p-6">
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              disabled
              value={value || ""}
              type={showKey ? "text" : "password"}
              placeholder="Stream Key"
            />
            <CopyButton value={value || ""} />
          </div>
          <Button
            size="sm"
            variant="link"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? "Hide Key" : "Show Key"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KeyCard;
