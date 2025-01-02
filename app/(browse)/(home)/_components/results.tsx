import { getStream } from "@/lib/feed-service";
import React from "react";
import ResultCard, { ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

const Results = async () => {
  const data = await getStream();

  return (
    <div>
      <div className="text-lg font-semibold mb-4">
        <h2>Streams we think you&apos;ll like</h2>
      </div>
      {data.length === 0 && (
        <div className="to-muted-foreground text-sm">No streams found</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((result) => (
          <ResultCard
            key={result.id}
            data={result}
          />
        ))}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div className="">
      <Skeleton className="h-8 w-72 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <ResultCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default Results;
