"use client";

import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import UserAvatar, { UserAvatarSkeleton } from "../user-avatar";
import VerifiedMark from "../verified-mark";
import { UserIcon } from "lucide-react";
import Actions, { ActionsSkeleton } from "./actions";
import { Skeleton } from "../ui/skeleton";

interface HeaderProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  isFollowing: boolean;
  name: string;
  imageUrl: string;
}

const Header = ({
  hostName,
  hostIdentity,
  viewerIdentity,
  isFollowing,
  name,
  imageUrl,
}: HeaderProps) => {
  const participant = useRemoteParticipant(hostIdentity);
  const participants = useParticipants();
  const isLive = !!participant;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`;
  console.log({ viewerIdentity, hostAsViewer });
  const isHost = viewerIdentity === hostAsViewer;

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          username={hostName}
          imageUrl={imageUrl}
          size="lg"
          isLive={isLive}
          showBadge={isLive}
        />
        <div className="space-y-1 ">
          <div className="flex items-center gap-x-2">
            <h2 className="font-semibold text-lg">{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">{name}</p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
              <UserIcon className="size-4" />
              <p>
                {participantCount}{" "}
                {participantCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground">
              offline
            </p>
          )}
        </div>
      </div>
      <Actions
        isFollowing={isFollowing}
        hostIdentity={hostIdentity}
        isHost={isHost}
      />
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <ActionsSkeleton />
    </div>
  );
};

export default Header;
