"use client";

import { useSidebar } from "@/store/use-sidebar";
import React from "react";
import { Button } from "../ui/button";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
} from "lucide-react";
import Hint from "../hint";
import { Skeleton } from "../ui/skeleton";

const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar(
    (state) => state
  );

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex items-center justify-center w-full pt-4 mb-4">
          <Hint
            label={label}
            side="right"
            asChild
          >
            <Button
              className="h-auto p-2"
              onClick={onExpand}
              variant="ghost"
            >
              <ArrowRightToLine />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-slate-300">
            For you
          </p>
          <Hint
            label={label}
            side="right"
            asChild
          >
            <Button
              className="h-auto p-2 ml-auto"
              onClick={onCollapse}
              variant="ghost"
            >
              <ArrowLeftToLine />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="size-6" />
    </div>
  );
};

export default Toggle;
