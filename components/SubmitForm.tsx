"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import { useUserId } from "@/lib/useUserId";

export default function SubmitForm() {
  const userId = useUserId();
  const { mutate } = useSWRConfig();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/features", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong.");
      return;
    }

    setTitle("");
    setDescription("");
    setSuccess(true);
    setOpen(false);
    mutate(userId ? `/api/features?userId=${userId}` : "/api/features");

    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <div>
      {/* Toggle button */}
      {!open && (
        <button
          onClick={() => { setOpen(true); setSuccess(false); }}
          className="w-full flex items-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-white/60 px-5 py-4 text-sm text-gray-400 transition hover:border-violet-300 hover:text-violet-500 hover:bg-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-400 text-base transition group-hover:bg-violet-100">
            +
          </span>
          {success
            ? <span className="text-green-500 font-medium">Feature submitted! 🎉</span>
            : "Suggest a feature..."}
        </button>
      )}

      {/* Expanded form */}
      {open && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-violet-100 bg-white shadow-lg shadow-violet-50 overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="text-sm font-semibold text-gray-900">Suggest a feature</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-gray-500 transition text-lg leading-none"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-3 p-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">Title</label>
              <input
                type="text"
                placeholder="e.g. Dark mode support"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
                className="rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100 placeholder:text-gray-300"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">Description</label>
              <textarea
                placeholder="What problem does this solve?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                className="rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-violet-400 focus:bg-white focus:ring-3 focus:ring-violet-100 resize-none placeholder:text-gray-300"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2 text-sm text-gray-400 hover:text-gray-600 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit feature"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
