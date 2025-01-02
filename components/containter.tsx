"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useMediaQuery } from "usehooks-ts";
import React, { useEffect } from "react";

interface ContainterProps {
  children: React.ReactNode;
}

const Containter = ({ children }: ContainterProps) => {
  const { collapsed, onExpand, onCollapse } = useSidebar(
    (sate) => sate
  );
  const matches = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (!matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        collapsed ? "ml-16" : "ml-16 lg:ml-64"
      )}
    >
      {children}
    </div>
  );
};

export default Containter;
