// app/utils/helper/SkeletonList.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ConversationSkeletonList() {
  return (
    <div className="space-y-4 p-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center space-x-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-3 w-[60px]" />
            </div>
            <Skeleton className="h-3 w-[180px]" />
          </div>
        </div>
      ))}
    </div>
  );
}
