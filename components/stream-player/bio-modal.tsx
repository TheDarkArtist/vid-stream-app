"use client";

import { ComponentRef, useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { updateUser } from "@/actions/user";
import { useToast } from "@/hooks/use-toast";

interface BioModalProps {
  initialValue: string | null;
}

const BioModal = ({ initialValue }: BioModalProps) => {
  const [value, setValue] = useState(initialValue || "");
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ComponentRef<typeof DialogClose>>(null);
  const { toast } = useToast();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({ bio: value })
        .then(() => {
          toast({
            title: "Bio Updated",
            description: "Your bio has been updated",
          });
          closeRef?.current?.click();
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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="ml-auto"
          variant="link"
          size="sm"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={onSubmit}
          className="space-y-4"
        >
          <Textarea
            className="resize-none"
            placeholder="User bio"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            disabled={isPending}
          />
          <div className="flex justify-between">
            <DialogClose
              ref={closeRef}
              asChild
            >
              <Button
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="primary"
              type="submit"
              disabled={isPending}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BioModal;
