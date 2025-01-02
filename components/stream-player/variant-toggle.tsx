"use client";

import React from "react";
import { Button } from "../ui/button";
import { MessageSquare, Users } from "lucide-react";
import Hint from "../hint";
import { Skeleton } from "../ui/skeleton";
import {
  ChatVariant,
  useChatSidebar,
} from "@/store/use-chat-sidebar";

const VariantToggle = () => {
  const { variant, onChangeVariant } = useChatSidebar(
    (state) => state
  );

  const isChat = variant === ChatVariant.CHAT;
  const Icon = isChat ? Users : MessageSquare;

  const label = isChat ? "Community" : "Go back to chat";

  const onToggle = () => {
    const newVariant = isChat
      ? ChatVariant.COMMUNITY
      : ChatVariant.CHAT;
    onChangeVariant(newVariant);
  };

  return (
    <Hint
      label={label}
      side="left"
      asChild
    >
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary"
      >
        <Icon className="size-4" />
      </Button>
    </Hint>
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

export default VariantToggle;
