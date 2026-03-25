"use client";

import useSWR from "swr";
import { useUserId } from "@/lib/useUserId";
import { Feature } from "@/lib/types";
import FeatureCard from "./FeatureCard";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function SkeletonCard() {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-5">
      <div className="w-4 h-3 rounded bg-gray-100 animate-pulse mt-1 shrink-0" />
      <div className="w-12 h-14 rounded-xl bg-gray-100 animate-pulse shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-4 w-2/5 rounded-md bg-gray-100 animate-pulse" />
        <div className="h-3 w-full rounded-md bg-gray-100 animate-pulse" />
        <div className="h-3 w-3/4 rounded-md bg-gray-100 animate-pulse" />
      </div>
    </div>
  );
}

export default function FeatureList() {
  const userId = useUserId();

  const { data: features, error, isLoading, mutate } = useSWR<Feature[]>(
    userId ? `/api/features?userId=${userId}` : "/api/features",
    fetcher
  );

  async function handleVote(id: number) {
    if (!userId) return;

    mutate(
      (prev) => {
        const updated = prev?.map((f) =>
          f.id === id
            ? {
                ...f,
                userVoted: !f.userVoted,
                _count: { votes: f._count.votes + (f.userVoted ? -1 : 1) },
              }
            : f
        );
        return updated?.slice().sort((a, b) => b._count.votes - a._count.votes);
      },
      false
    );

    await fetch(`/api/features/${id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    mutate();
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-500">
        Failed to load features. Please refresh.
      </div>
    );
  }

  if (!features?.length) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-200 bg-white/50 py-16 text-center">
        <div className="text-3xl">💡</div>
        <div>
          <p className="text-sm font-medium text-gray-700">No features yet</p>
          <p className="text-xs text-gray-400 mt-1">Be the first to submit one above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {features.map((feature, i) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          rank={i + 1}
          onVote={handleVote}
          disabled={!userId}
        />
      ))}
    </div>
  );
}
