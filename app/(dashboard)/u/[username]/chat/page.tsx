import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import React from "react";
import ToggleCard from "./_components/toggle-card";

const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Chat Settings
        </h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          label="Enable Chat"
          field="isChatEnabled"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          label="Delay Chat"
          field="isChatDelayed"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          label="Followers Only"
          field="isChatFollowersOnly"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
};

export default ChatPage;
