import Image from "next/image";
import UserAvatar from "./user-avatar";
import { Skeleton } from "./ui/skeleton";
import LiveBadge from "./live-badge";

interface ThumbnailProps {
  src: string;
  fallback: string;
  isLive: boolean;
  username: string;
}

const Thumbnail = ({ src, fallback, isLive, username }: ThumbnailProps) => {
  let content;

  if (!src) {
    content = (
      <div className="bg-gray-900 flex flex-col items-center justify-center gap-y-4 w-full h-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 rounded-md">
        <UserAvatar
          username={username}
          imageUrl={fallback}
          isLive={isLive}
          showBadge={isLive}
          size="lg"
        />
      </div>
    );
  } else {
    content = (
      <Image
        className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 rounded-md"
        src={src}
        alt={username}
        fill
      />
    );
  }

  return (
    <div className="group aspect-video relative rounded-md cursor-pointer transition-opacity flex items-center justify-center border border-gray-900">
      <div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100" />
      {content}

      {isLive && src && (
        <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

export const ThubnailSkeleton = () => {
  return (
    <div className="group aspect-video border border-gray-900 relative cursor-pointer rounded-xl">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default Thumbnail;
