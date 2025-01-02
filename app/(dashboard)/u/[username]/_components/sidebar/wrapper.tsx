"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const { collapsed } = useCreatorSidebar((state) => state);

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-16 lg:w-64 h-full bg-slate-900 border-r border-slate-800 transition-all duration-200 ease-in-out z-50 overflow-hidden",
        collapsed ? "lg:w-16" : "lg:w-64"
      )}
    >
      {children}
    </aside>
  );
};

export default Wrapper;
