"use client";
import { type MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/shared/lib/whatsapp";
import {
  navigation as fallbackNavigation,
  siteConfig,
} from "@/shared/constants/site";
import {
  landingPath,
  landingRoutes,
  landingSectionFromPath,
} from "@/shared/lib/landing-navigation";
export function Header({ config }: { config?: any }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>("home");
  const nav = config?.navigation?.items ?? fallbackNavigation;
  const logoSrc =
    typeof config?.site?.logo === "string"
      ? config.site.logo
      : (config?.site?.logo?.src ?? siteConfig.logo.src);
  const logoAlt = config?.site?.name ?? siteConfig.name;
  useEffect(() => {
    if (!isLandingPath(window.location.pathname)) {
      setActive(null);
      return;
    }
    const sections = nav
      .map((x: any) =>
        document.getElementById(landingSectionFromPath(landingPath(x.href))),
      )
      .filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (es) => {
        const v = es
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5, 0.8] },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [nav]);
  const go = (href: string) => {
    setActive(landingSectionFromPath(landingPath(href)));
    setOpen(false);
  };

  const isLandingPath = (pathname: string) =>
    pathname === "/" || Object.values(landingRoutes).includes(pathname);

  const navigateLanding = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const targetPath = landingPath(href);
    go(targetPath);

    if (isLandingPath(window.location.pathname)) {
      event.preventDefault();

      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, "", targetPath);
      }

      const sectionId = landingSectionFromPath(targetPath);
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200/60 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-container items-center justify-between px-4 md:px-10">
        <Link
          href="/inicio"
          onClick={() => go("/inicio")}
          className="group shrink-0"
        >
          <img
            src={logoSrc}
            alt={logoAlt}
            className="h-12 w-auto object-contain transition-transform group-hover:scale-[1.03]"
          />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item: any) => {
            const is =
              active === landingSectionFromPath(landingPath(item.href));
            return (
              <Link
                key={item.href}
                href={landingPath(item.href)}
                onClick={(event) => navigateLanding(event, item.href)}
                className={`relative px-2 py-2 text-sm font-medium transition-colors ${is ? "font-bold text-secondary" : "text-muted hover:text-primary"}`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 bg-secondary transition-transform ${is ? "scale-x-100" : "scale-x-0"}`}
                />
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <a
            href={whatsappUrl(config?.contact?.whatsapp)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-medium text-primary hover:text-secondary"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
          <Button href="/contacto" onClick={() => go("/contacto")}>
            Agendar Consulta
          </Button>
        </div>
        <button
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="p-2 text-primary md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t bg-white px-4 py-4 md:hidden">
          {nav.map((item: any) => (
            <Link
              key={item.href}
              href={landingPath(item.href)}
              onClick={(event) => navigateLanding(event, item.href)}
              className={`block border-b border-gray-100 py-3 font-medium ${active === landingSectionFromPath(landingPath(item.href)) ? "text-secondary" : "text-primary"}`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={whatsappUrl(config?.contact?.whatsapp)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center gap-2 font-semibold text-secondary"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}
