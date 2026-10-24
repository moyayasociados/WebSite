"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { landingRoutes } from "@/shared/lib/landing-navigation";

const isLandingPath = (pathname: string) =>
  pathname === "/" || Object.values(landingRoutes).includes(pathname);

type Phase = "idle" | "loading" | "done";

// Thin gold bar at the top of the screen so every click gets instant feedback while the next page arrives.
export function NavigationProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      // Moving between landing sections only scrolls the page, there is nothing to load.
      if (isLandingPath(window.location.pathname) && isLandingPath(url.pathname)) return;
      clearTimeout(timeout.current);
      setPhase("loading");
      // Safety net in case the navigation never completes.
      timeout.current = setTimeout(() => setPhase("idle"), 10000);
    };
    // Capture phase: next/link calls preventDefault on its own clicks, so we must see them first.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    setPhase((current) => (current === "loading" ? "done" : current));
  }, [pathname]);

  useEffect(() => {
    if (phase !== "done") return;
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setPhase("idle"), 500);
    return () => clearTimeout(timeout.current);
  }, [phase]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[3px]">
      <div
        className="h-full origin-left bg-gradient-to-r from-[#C59B27] via-[#F7DF8A] to-[#C59B27] shadow-[0_0_8px_rgba(243,212,110,0.7)]"
        style={{
          transform: `scaleX(${phase === "idle" ? 0 : phase === "loading" ? 0.85 : 1})`,
          opacity: phase === "idle" ? 0 : phase === "done" ? 0 : 1,
          transition:
            phase === "loading"
              ? "transform 8s cubic-bezier(0.1, 0.8, 0.2, 1)"
              : phase === "done"
                ? "transform 0.2s ease-out, opacity 0.3s ease 0.2s"
                : "none",
        }}
      />
    </div>
  );
}
