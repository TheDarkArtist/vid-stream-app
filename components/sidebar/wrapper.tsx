"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useIsClient } from "usehooks-ts";
import { ToggleSkeleton } from "./toggle";
import { useSidebar } from "@/store/use-sidebar";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const { collapsed } = useSidebar((state) => state);
  const isClinet = useIsClient();

  if (!isClinet) {
    return (
      <aside
        className={cn(
          "fixed left-0 flex flex-col w-16 lg:w-64 h-full bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out z-50"
        )}
      >
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-16 h-full bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out z-50 overflow-hidden",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
