"use client";
import { useSidebar } from "@/store/use-sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import UserAvatar from "../user-avatar";
import LiveBadge from "../live-badge";
import { Skeleton } from "../ui/skeleton";

interface UserItemProps {
  username: string;
  imageUrl: string;
  isLive?: boolean;
}

const UserItem = ({ username, imageUrl, isLive }: UserItemProps) => {
  const pathname = usePathname();

  const { collapsed } = useSidebar();

  const href = `/${username}`;
  const isActive = pathname === href;

  return (
    <Button
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-slate-800",
      )}
      variant="ghost"
      asChild
    >
      <Link href={href}>
        <div
          className={cn(
            "flex items-center w-full gap-x-4",
            collapsed && "justify-center",
          )}
        >
          <UserAvatar
            imageUrl={imageUrl}
            username={username}
            isLive={isLive}
          />
          {!collapsed && <p>{username}</p>}
          {!collapsed && isLive && <LiveBadge className="ml-2" />}
        </div>
      </Link>
    </Button>
  );
};

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center w-full gap-x-4 px-2 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};

export default UserItem;
