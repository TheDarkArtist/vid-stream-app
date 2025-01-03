import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const Actions = () => {
  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      <Button
        size="sm"
        variant="ghost"
        className="text-muted-foreground hover:text-primary"
        asChild
      >
        <Link href={`/`}>
          <LogOut />
          <span className="hidden lg:block">Exit</span>
        </Link>
      </Button>
      <UserButton signInUrl="/" />
    </div>
  );
};

export default Actions;
