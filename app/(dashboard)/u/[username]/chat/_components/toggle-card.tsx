"use client";

import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import React, { useTransition } from "react";

type FieldTypes =
  | "isChatEnabled"
  | "isChatDelayed"
  | "isChatFollowersOnly";

interface ToggleCardProps {
  label: string;
  field: FieldTypes;
  value: boolean;
}

const ToggleCard = ({
  label,
  field,
  value = false,
}: ToggleCardProps) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const onChange = async () => {
    startTransition(async () => {
      updateStream({
        [field]: !value,
      })
        .then(() => {
          toast({
            title: "Success",
            description: "Stream updated successfully",
          });
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
        });
    });
  };

  return (
    <div className="rounded-xl bg-gray-900 p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            checked={value}
            disabled={isPending}
            onCheckedChange={onChange}
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};

export default ToggleCard;
