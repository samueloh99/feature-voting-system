"use client";

import { Feature } from "@/lib/types";

type Props = {
  feature: Feature;
  rank: number;
  onVote: (id: number) => void;
  disabled: boolean;
};

function timeAgo(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function FeatureCard({ feature, rank, onVote, disabled }: Props) {
  const voted = feature.userVoted;

  return (
    <div
      className={`group flex items-start gap-4 rounded-2xl border p-5 transition-all duration-200 ${
        voted
          ? "border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 shadow-sm shadow-violet-100"
          : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-md hover:shadow-gray-100"
      }`}
    >
      {/* Rank */}
      <span className="mt-1 text-xs font-bold text-gray-300 w-4 text-center shrink-0">
        #{rank}
      </span>

      {/* Vote button */}
      <button
        onClick={() => onVote(feature.id)}
        disabled={disabled}
        className={`flex flex-col items-center justify-center rounded-xl border-2 px-3 py-2.5 transition-all duration-200 min-w-[52px] shrink-0 ${
          voted
            ? "border-violet-500 bg-violet-500 text-white shadow-md shadow-violet-200 scale-105"
            : "border-gray-200 bg-white text-gray-400 hover:border-violet-400 hover:text-violet-500 hover:scale-105 hover:shadow-sm"
        } disabled:cursor-not-allowed disabled:opacity-40 active:scale-95`}
      >
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 4l8 8H4l8-8z" />
        </svg>
        <span className="mt-1 text-sm font-bold leading-none">{feature._count.votes}</span>
      </button>

      {/* Content */}
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-sm font-semibold text-gray-900 leading-snug">{feature.title}</h2>
          {voted && (
            <span className="shrink-0 text-[10px] font-semibold text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full">
              Voted
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
        <p className="text-xs text-gray-300 mt-1">{timeAgo(feature.createdAt)}</p>
      </div>
    </div>
  );
}
