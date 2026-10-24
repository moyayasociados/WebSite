"use client";

import { type ReactNode, useEffect } from "react";

export function AppProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.hydrated = "true";
  }, []);
  return <>{children}</>;
}
