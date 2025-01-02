"use client";

import { Pencil } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import InfoModal from "./info-modal";

interface InfoCrdProps {
  name: string;
  thumbnailUrl: string;
  hostIdentity: string;
  viewerIdentity: string;
}

const InfoCard = ({
  name,
  thumbnailUrl,
  hostIdentity,
  viewerIdentity,
}: InfoCrdProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-gray-900">
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="h-auto w-auto rounded-md bg-gray-800 p-3">
            <Pencil className="size-6" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit your stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximize your visibility
            </p>
          </div>
          <InfoModal
            initialName={name}
            initialThumbnailUrl={thumbnailUrl}
          />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <h3 className="text-sm text-muted-foreground mb-2">Name</h3>
          <p className="text-sm font-semibold">{name}</p>
        </div>
        <div className="p-4 lg:p-6 space-y-4">
          <h3 className="text-sm text-muted-foreground mb-2">Thumbnail</h3>
          {thumbnailUrl && (
            <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
              <Image
                className="object-cover"
                src={thumbnailUrl}
                alt={name}
                fill
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
