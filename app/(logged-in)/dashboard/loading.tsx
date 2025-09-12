import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-2 py-12 sm:py-24">
          {/* Header section with title and description skeletons */}
          <div className="flex gap-4 mb-8 justify-between items-center">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-10 w-[250px] bg-gray-200" />
              <Skeleton className="h-5 w-[350px] bg-gray-200" />
            </div>
            {/* New Summary button skeleton */}
            <Skeleton className="self-start h-10 w-32 rounded-lg bg-gray-200" />
          </div>

          {/* Skeletons for the summary cards */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-white border border-gray-200 p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
                    <Skeleton className="h-6 w-32 bg-gray-200" />
                  </div>
                  <Skeleton className="h-10 w-10 bg-gray-200" />
                </div>
                <div className="flex-grow space-y-4">
                  <Skeleton className="h-6 w-full mb-2 bg-gray-200" />
                  <Skeleton className="h-5 w-[80%] mb-4 bg-gray-200" />
                </div>
                  <Skeleton className="h-10 w-28 rounded-full bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
