"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
  hostIdentity: string;
  isFollowing: boolean;
  isHost: boolean;
}

const Actions = ({ hostIdentity, isFollowing, isHost }: ActionsProps) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleFollow = async () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) => {
          toast({
            title: "Followed",
            description: `You are now following ${data.following.username}`,
          });
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Something went wrong",
          });
        });
    });
  };

  const handleUnfollow = async () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) => {
          toast({
            title: "Unfollowed",
            description: `You have unfollowed ${data.following.username}`,
          });
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Something went wrong",
          });
        });
    });
  };

  const toggleFollwow = () => {
    if (!userId) {
      return router.push(`/sign-in`);
    }

    if (isHost) {
      return;
    }

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      className="w-full lg:w-auto"
      variant="secondary"
      size="sm"
      disabled={isPending || isHost}
      onClick={toggleFollwow}
    >
      <Heart
        className={cn(
          "h-6 w-6",
          isFollowing ? "fill-rose-500 text-rose-500" : "fill-none",
        )}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};

export default Actions;
