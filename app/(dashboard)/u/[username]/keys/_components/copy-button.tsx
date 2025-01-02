"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import React from "react";

interface CopyButtonProps {
  value: string;
}

const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = React.useState(false);

  const onCopy = () => {
    if (!value) {
      return;
    }

    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={!value}
      onClick={onCopy}
    >
      <Icon
        className="h-4 w-4"
        onClick={onCopy}
      />
    </Button>
  );
};

export default CopyButton;
