"use client";
import { Loader2 } from "lucide-react";
import { Card, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function PendingCustomerCard() {
  return (
    <div className="flex flex-col items-center">
      <Card className="flex w-fit">
        <CardHeader className="grid grid-flow-row">
          <div className="flex gap-1 text-xs items-center">
            <Skeleton className="w-40 h-6 bg-gray-200" />
          </div>
          <div className="flex gap-2 text-xs items-center">
            <div className="text-5xl font-semibold">
              <Skeleton className="w-40 h-12 bg-gray-200" />
            </div>
            <div className="text-md">
              <Skeleton className="w-20 h-12 bg-gray-200" />
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <div className="flex gap-1">
              <Skeleton className="w-full h-6 bg-gray-200" />
            </div>
          </div>
          <div className="flex gap-1 items-center relative w-full">
            <div className="text-xs p-1 flex gap-1">
              <Skeleton className="w-20 h-6 bg-gray-200" />
            </div>
            <div className="flex gap-1 absolute right-0 text-gray-400">
              <Loader2 className="animate-spin" /> <div>PENDING</div>
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className="text-gray-400 mt-4">Your account is being generated</div>
      <div className="text-gray-400">Reload the page in a few minutes</div>
    </div>
  );
}
