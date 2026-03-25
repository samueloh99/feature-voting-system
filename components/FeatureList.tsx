"use client";

import useSWR from "swr";
import { useUserId } from "@/lib/useUserId";
import { Feature } from "@/lib/types";
import FeatureCard from "./FeatureCard";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function FeatureList() {
  const userId = useUserId();

  const { data: features, error, isLoading, mutate } = useSWR<Feature[]>(
    userId ? `/api/features?userId=${userId}` : "/api/features",
    fetcher
  );

  async function handleVote(id: number) {
    if (!userId) return;

    mutate(
      (prev) =>
        prev?.map((f) =>
          f.id === id
            ? {
                ...f,
                userVoted: !f.userVoted,
                _count: { votes: f._count.votes + (f.userVoted ? -1 : 1) },
              }
            : f
        ),
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
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-gray-100" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-500">Failed to load features. Please refresh.</p>;
  }

  if (!features?.length) {
    return (
      <p className="text-center text-sm text-gray-400 py-10">
        No features yet — be the first to submit one!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          onVote={handleVote}
          disabled={!userId}
        />
      ))}
    </div>
  );
}
