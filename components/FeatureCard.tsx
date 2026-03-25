"use client";

import { Feature } from "@/lib/types";

type Props = {
  feature: Feature;
  onVote: (id: number) => void;
  disabled: boolean;
};

export default function FeatureCard({ feature, onVote, disabled }: Props) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <button
        onClick={() => onVote(feature.id)}
        disabled={disabled}
        className={`flex flex-col items-center justify-center rounded-lg border px-3 py-2 text-sm font-semibold transition min-w-[52px] ${
          feature.userVoted
            ? "border-indigo-500 bg-indigo-500 text-white"
            : "border-gray-300 bg-white text-gray-600 hover:border-indigo-400 hover:text-indigo-500"
        } disabled:cursor-not-allowed disabled:opacity-50`}
      >
        <span className="text-base leading-none">▲</span>
        <span className="mt-1">{feature._count.votes}</span>
      </button>

      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold text-gray-900">{feature.title}</h2>
        <p className="text-sm text-gray-500">{feature.description}</p>
      </div>
    </div>
  );
}
