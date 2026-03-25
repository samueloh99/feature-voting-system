"use client";

import { useState } from "react";

export function useUserId(): string | null {
  const [userId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    let id = localStorage.getItem("userId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("userId", id);
    }
    return id;
  });

  return userId;
}
