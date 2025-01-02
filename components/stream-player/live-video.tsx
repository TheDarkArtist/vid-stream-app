"use client";

import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import FullscreenControll from "./fullscreen-controll";
import { useEventListener } from "usehooks-ts";
import VolumeControl from "./volume-control";

interface LiveVideoProps {
  participant: Participant;
}

const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolue] = useState(0);

  const onVolumeChange = (value: number) => {
    setVolue(+value);
    if (videoRef.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;
    setVolue(isMuted ? 100 : 0);

    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen();
    }
  };

  const handleFullScreenChange = () => {
    const isCurrentlyFullScreen =
      document.fullscreenElement !== null;

    setIsFullscreen(isCurrentlyFullScreen);
  };

  useEventListener(
    "fullscreenchange" as keyof WindowEventMap,
    handleFullScreenChange
  );

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter(
      (track) =>
        track.participant.identity === participant.identity
    )
    .forEach((track) => {
      if (videoRef.current)
        track.publication.track?.attach(videoRef.current);
    });

  return (
    <div
      ref={wrapperRef}
      className="relative h-full flex"
    >
      <video
        ref={videoRef}
        width="100%"
      />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 transition-all">
        <div className="absolute w-full bottom-0 flex h-14 items-center justify-between bg-gradient-to-r from-gray-900 px-4">
          <VolumeControl
            value={volume}
            onToggle={toggleMute}
            onChnage={onVolumeChange}
          />
          <FullscreenControll
            isFullScreen={isFullscreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveVideo;
