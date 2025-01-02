"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { onBlock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Spinner from "@/utils/spinner";
import React, { useTransition } from "react";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isFollowPending, startFollowTransition] =
    useTransition();
  const [isBlockPending, startBlockTransition] =
    useTransition();
  const { toast } = useToast();

  const handleFollow = () => {
    startFollowTransition(() => {
      onFollow(userId)
        .then((data) => {
          toast({
            title: "Success",
            description: `You are now following ${data?.following.username}`,
          });
        })
        .catch(() => {
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
        });
    });
  };

  const handleUnfollow = () => {
    startFollowTransition(() => {
      onUnfollow(userId)
        .then((data) => {
          toast({
            title: "Success",
            description: `You are no longer following ${data?.following.username}`,
          });
        })
        .catch(() => {
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
        });
    });
  };

  const handleBlock = () => {
    startBlockTransition(() => {
      onBlock(userId)
        .then((data) => {
          toast({
            title: "Success",
            description: `You are now blocking ${data?.blocked.username}`,
          });
        })
        .catch(() => {
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
        });
    });
  };

  return (
    <div className="flex gap-4">
      <Button
        onClick={
          isFollowing ? handleUnfollow : handleFollow
        }
        disabled={isFollowPending}
        variant="primary"
      >
        {isFollowing ? "Unfollow" : "Follow"}
        {isFollowPending && <Spinner />}
      </Button>
      <Button
        onClick={handleBlock}
        disabled={isBlockPending}
        variant="destructive"
      >
        Block
        {isBlockPending && <Spinner />}
      </Button>
    </div>
  );
};

export default Actions;
