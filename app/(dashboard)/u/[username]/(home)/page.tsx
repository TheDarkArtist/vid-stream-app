import { PageProps } from "@/.next/types/app/(browse)/[username]/page";
import StreamPlayer from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

// interface CreatorPageProps {
//   params: { username: string };
// }

const CreatorPage = async ({ params }: PageProps) => {
  const { username } = await params;
  const externalUser = await currentUser();
  const user = await getUserByUsername(username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer
        user={user}
        stream={user.stream}
        isFollowing={true}
      />
    </div>
  );
};

export default CreatorPage;
