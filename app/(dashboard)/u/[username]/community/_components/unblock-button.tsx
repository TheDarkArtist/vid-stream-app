"use client";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";

interface UnblockButtonProps {
  userId: string;
}

const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((result) => {
          toast({
            title: `Unblocked ${result.blocked.username}`,
            description: `You have successfully unblocked this ${result.blocked.username}`,
          });
        })
        .catch(() => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong",
          });
        });
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="secondary"
      size="sm"
    >
      Unblock
    </Button>
  );
};

export default UnblockButton;
