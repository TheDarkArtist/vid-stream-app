"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import {
  ArrowLeftToLine,
  ArrowRightFromLine,
} from "lucide-react";
import React from "react";

const Toggle = () => {
  const { collapsed, onExpand, onCollapse } =
    useCreatorSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex justify-center items-center w-full py-4">
          <Hint
            label={label}
            side="right"
            asChild
          >
            <Button
              className="size-4 h-auto"
              onClick={onExpand}
              variant="ghost"
            >
              <ArrowRightFromLine className="size-4" />
            </Button>
          </Hint>
        </div>
      )}

      {!collapsed && (
        <div className="hidden lg:flex justify-between items-center w-full p-3 pl-6 mb-2">
          <p className="font-semibold text-primary">
            Dashboard
          </p>
          <Hint
            label={label}
            side="right"
            asChild
          >
            <Button
              className="size-4 h-auto"
              onClick={onCollapse}
              variant="ghost"
            >
              <ArrowLeftToLine className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export default Toggle;
