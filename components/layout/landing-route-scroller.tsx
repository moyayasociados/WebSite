"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { landingSectionFromPath } from "@/shared/lib/landing-navigation";

export function LandingRouteScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const sectionId = landingSectionFromPath(pathname);
    const element = document.getElementById(sectionId);

    if (!element) return;

    requestAnimationFrame(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [pathname]);

  return null;
}
