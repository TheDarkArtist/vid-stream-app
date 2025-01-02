import { WifiOff } from "lucide-react";
import React from "react";

interface OfflineVideoProps {
  username: string;
}

const OfflineVideo = ({ username }: OfflineVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center">
      <WifiOff className="w-10 h-10 text-zinc-400" />
      <p className="text-zinc-400">{username} is offline</p>
    </div>
  );
};

export default OfflineVideo;
