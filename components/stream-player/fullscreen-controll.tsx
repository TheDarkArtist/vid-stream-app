"use client";

import { Maximize, Minimize } from "lucide-react";
import Hint from "../hint";

interface FullscreenControllProps {
  isFullScreen: boolean;
  onToggle: () => void;
}

const FullscreenControll = ({
  isFullScreen,
  onToggle,
}: FullscreenControllProps) => {
  const Icon = isFullScreen ? Minimize : Maximize;
  const label = isFullScreen
    ? "Exit fullscreen"
    : "Enter fullscreen";

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label}>
        <div
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
          onClick={onToggle}
        >
          <Icon />
        </div>
      </Hint>
    </div>
  );
};

export default FullscreenControll;
