import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import LiveBadge from "./live-badge";
import { Skeleton } from "./ui/skeleton";

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  imageUrl: string;
  username: string;
  isLive?: boolean;
  showBadge?: boolean;
}

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const UserAvatar = ({
  username,
  imageUrl,
  size,
  showBadge,
  isLive,
}: UserAvatarProps) => {
  return (
    <div className="relative">
      <Avatar
        className={cn(
          "ring-[3px] ring-slate-800",
          isLive && "ring-[3px] ring-rose-600 border-rose-800",
          avatarSizes({ size: size }),
        )}
      >
        <AvatarImage
          src={imageUrl}
          className="object-cover"
        />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {showBadge && (
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

export const UserAvatarSkeleton = ({
  size,
}: VariantProps<typeof avatarSizes>) => {
  return (
    <Skeleton className={cn("rounded-full", avatarSizes({ size: size }))} />
  );
};

export default UserAvatar;
