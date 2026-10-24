"use client";

import { type ReactNode, useEffect } from "react";
import { NavigationProgress } from "@/components/layout/navigation-progress";

export function AppProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.hydrated = "true";
  }, []);
  return (
    <>
      <NavigationProgress />
      {children}
    </>
  );
}
