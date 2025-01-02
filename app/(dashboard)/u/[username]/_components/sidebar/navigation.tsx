"use client";

import React from "react";

import {
  Fullscreen,
  KeyRound,
  MessageSquare,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import NavItem, { NavItemSkeleton } from "./nav-item";

const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    {
      label: "Stream",
      icon: Fullscreen,
      href: `/u/${user?.username}`,
      active: pathname === `/u/${user?.username}`,
    },
    {
      label: "Keys",
      icon: KeyRound,
      href: `/u/${user?.username}/keys`,
      active: pathname === `/u/${user?.username}/keys`,
    },
    {
      label: "Chat",
      icon: MessageSquare,
      href: `/u/${user?.username}/chat`,
      active: pathname === `/u/${user?.username}/chat`,
    },
    {
      label: "Community",
      icon: Users,
      href: `/u/${user?.username}/community`,
      active: pathname === `/u/${user?.username}/community`,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(3)].map((_, index) => (
          <NavItemSkeleton key={index} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-4 flex flex-col items-center m-2">
      {routes.map(({ label, href, icon, active }) => (
        <NavItem
          key={label}
          label={label}
          href={href}
          icon={icon}
          isActive={active}
        />
      ))}
    </ul>
  );
};

export default Navigation;
