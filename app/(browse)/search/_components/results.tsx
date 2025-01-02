import { getSearch } from "@/lib/search-service";
import ResultCard, { ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsProps {
  term?: string;
}

const Results = async ({ term }: ResultsProps) => {
  const data = await getSearch(term);

  return (
    <div className="space-y-4">
      <h2>Results for &quot;{term}&quot;</h2>
      {data.length === 0 && (
        <p>No results found, Try searching for something else</p>
      )}
      <div className="flex flex-col gap-y-4">
        {data.map((result) => (
          <ResultCard
            data={result}
            key={result.id}
          />
        ))}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-72 mb-4" />
        <div className="flex flex-col gap-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <ResultCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
