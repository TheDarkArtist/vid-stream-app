import Spinner from "@/utils/spinner";
import React from "react";

interface LoadingVideoProps {
  label: string;
}

const LoadingVideo = ({ label }: LoadingVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center">
      <Spinner height="20" />
      <p className="text-zinc-400 capitalize">{label}</p>
    </div>
  );
};

export default LoadingVideo;
