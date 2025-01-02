"use client";

import { useSidebar } from "@/store/use-sidebar";
import React from "react";
import UserItem, { UserItemSkeleton } from "./user-item";

interface FollowingProps {
  data: {
    id: string;
    following: {
      username: string;
      imageUrl: string;
      stream: {
        isLive: boolean;
      } | null;
    };
  }[];
}

const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);

  if (data.length === 0) {
    return null;
  }

  return (
    <>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            key={follow.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </>
  );
};

export const FollowingSkeleton = () => {
  return (
    <div>
      <ul className="space-y-2 px-2">
        {[...Array(3)].map((_, index) => (
          <UserItemSkeleton key={index} />
        ))}
      </ul>
    </div>
  );
};

export default Following;
