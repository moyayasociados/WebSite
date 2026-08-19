"use client";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/shared/lib/whatsapp";
import {
  navigation as fallbackNavigation,
  siteConfig,
} from "@/shared/constants/site";
export function Header({ config }: { config?: any }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const nav = config?.navigation?.items ?? fallbackNavigation;
  const logoSrc =
    typeof config?.site?.logo === "string"
      ? config.site.logo
      : (config?.site?.logo?.src ?? siteConfig.logo.src);
  const logoAlt = config?.site?.name ?? siteConfig.name;
  useEffect(() => {
    const sections = nav
      .map((x: any) => document.getElementById(x.href.slice(1)))
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
    setActive(href.slice(1));
    setOpen(false);
  };
  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200/60 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-container items-center justify-between px-4 md:px-10">
        <a href="#home" onClick={() => go("#home")} className="group shrink-0">
          <img
            src={logoSrc}
            alt={logoAlt}
            className="h-12 w-auto object-contain transition-transform group-hover:scale-[1.03]"
          />
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item: any) => {
            const is = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => go(item.href)}
                className={`relative px-2 py-2 text-sm font-medium transition-colors ${is ? "font-bold text-secondary" : "text-muted hover:text-primary"}`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 bg-secondary transition-transform ${is ? "scale-x-100" : "scale-x-0"}`}
                />
              </a>
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
          <Button href="#contact" onClick={() => go("#contact")}>
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
            <a
              key={item.href}
              href={item.href}
              onClick={() => go(item.href)}
              className={`block border-b border-gray-100 py-3 font-medium ${active === item.href.slice(1) ? "text-secondary" : "text-primary"}`}
            >
              {item.label}
            </a>
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
