"use client";

import { Volume1, Volume2, VolumeX } from "lucide-react";
import Hint from "../hint";
import { Slider } from "../ui/slider";

interface VolumeControlProps {
  onToggle: () => void;
  onChnage: (value: number) => void;
  value: number;
}

const VolumeControl = ({
  onToggle,
  onChnage,
  value,
}: VolumeControlProps) => {
  let Icon = Volume1;

  const isMuted = value === 0;
  const isAboveHalf = value > 50;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  const label = isMuted
    ? "Muted"
    : isAboveHalf
      ? "High"
      : "Low";

  const handleChange = (value: number[]) => {
    onChnage(value[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <Hint label={label}>
        <div
          className="text-white hover:bg-white/10 p-1.5 rounded-lg"
          onClick={onToggle}
        >
          <Icon className="size-6" />
        </div>
      </Hint>
      <Slider
        className="w-32 cursor-pointer"
        onValueChange={handleChange}
        value={[value]}
        max={100}
        step={1}
      />
    </div>
  );
};

export default VolumeControl;
