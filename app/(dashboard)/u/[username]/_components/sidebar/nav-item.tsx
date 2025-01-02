import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
}

const NavItem = ({
  icon: Icon,
  label,
  href,
  isActive,
}: NavItemProps) => {
  const { collapsed } = useCreatorSidebar((state) => state);

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start",
        collapsed && "justify-center",
        isActive && "bg-slate-800"
      )}
      asChild
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon
            className={cn(
              "size-4",
              collapsed ? "mr-0" : "mr-2"
            )}
          />
          {!collapsed && (
            <span className="text-muted-foreground">
              {label}
            </span>
          )}
        </div>
      </Link>
    </Button>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="h-12 min-w-12" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};

export default NavItem;
