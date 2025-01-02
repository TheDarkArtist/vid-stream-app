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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { updateStream } from "@/actions/stream";
import { useToast } from "@/hooks/use-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import Hint from "../hint";
import { Trash } from "lucide-react";
import Image from "next/image";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string;
}

const InfoModal = ({ initialName, initialThumbnailUrl }: InfoModalProps) => {
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ComponentRef<typeof DialogClose>>(null);

  const router = useRouter();
  const { toast } = useToast();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast({
            title: "Updated",
            description: "Your stream has been updated",
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

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast({
            title: "Removed",
            description: "Your thumbnail has been removed",
          });
          setThumbnailUrl("");
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
          <DialogTitle>Edit Stream Info</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-14"
          onSubmit={onSubmit}
        >
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Stream Name"
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>

          {thumbnailUrl ? (
            <div className="relative aspect-video rounded-xl border border-white/10 overflow-hidden">
              <div className="absolute top-2 right-2 z-10">
                <Hint
                  label="Remove Thumbnail"
                  asChild
                  side="left"
                >
                  <Button
                    className="h-auto w-auto p-1.5"
                    type="button"
                    disabled={isPending}
                    onClick={onRemove}
                  >
                    <Trash />
                  </Button>
                </Hint>
              </div>
              <Image
                className="object-cover"
                src={thumbnailUrl}
                alt={name}
                fill
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Thumbnail</Label>
              <div className="rounded-xl border-black outline-dashed outline-gray-700">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "white",
                    },
                    allowedContent: {
                      color: "white",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url);
                    router.refresh();
                    closeRef?.current?.click();
                  }}
                />
              </div>
            </div>
          )}

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

export default InfoModal;
