"use client";

import { cn, stringToColor } from "@/lib/utils";
import { Button } from "../ui/button";
import Hint from "../hint";
import { MinusCircle } from "lucide-react";
import { useTransition } from "react";
import { onBlock } from "@/actions/block";
import { useToast } from "@/hooks/use-toast";

interface CommunityItemProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

const CommunityItem = ({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityItemProps) => {
  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;
    startTransition(() => {
      onBlock(participantIdentity).then(() => {
        toast({
          title: "Blocked",
          description: `${participantName} has been blocked`,
        });
      });
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none",
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint
          label="Block"
          asChild
        >
          <Button
            className="h-auto p-1 w-auto opacity-0 group-hover:opacity-100 transition"
            variant="ghost"
            onClick={handleBlock}
            disabled={isPending}
          >
            <MinusCircle className="size-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};

export default CommunityItem;
