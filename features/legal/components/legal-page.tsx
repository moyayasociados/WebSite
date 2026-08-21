"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Section = { id: string; title: string; content: React.ReactNode };
export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sectionElements.length) return;

    const visibleSections = new Map<string, number>();

    const updateActiveSection = () => {
      const visible = Array.from(visibleSections.entries()).sort(
        ([, firstRatio], [, secondRatio]) => secondRatio - firstRatio,
      )[0];

      if (visible) {
        setActive(visible[0]);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;

          if (entry.isIntersecting) {
            visibleSections.set(id, entry.intersectionRatio);
          } else {
            visibleSections.delete(id);
          }
        });

        updateActiveSection();
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sections]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-container px-4 pb-24 pt-32 md:px-10">
      <div className="mb-12 border-b border-slate-200 pb-8">
        <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-secondary">
          Moya y Asociados
        </p>
        <h1 className="font-display text-4xl font-bold text-primary md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
          {updated}. {intro}
        </p>
      </div>
      <div className="grid gap-10 md:grid-cols-12">
        <aside className="hidden md:col-span-3 md:block">
          <div className="sticky top-28 border-l border-slate-200 pl-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-secondary">
              En esta página
            </p>
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setActive(s.id);
                  document
                    .getElementById(s.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`block w-full border-b border-slate-100 py-3 text-left text-sm transition ${active === s.id ? "font-bold text-secondary" : "text-muted hover:text-primary"}`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </aside>
        <div className="space-y-6 md:col-span-9">
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-28 rounded-xl border border-slate-200 bg-white p-6 shadow-soft md:p-8"
            >
              <h2 className="font-display text-2xl font-bold text-primary">
                {s.title}
              </h2>
              <div className="mt-4 space-y-4 leading-7 text-slate-600">
                {s.content}
              </div>
            </section>
          ))}
          <section className="relative overflow-hidden rounded-xl bg-primary p-8 text-white">
            <h2 className="font-display text-2xl font-bold">
              ¿Tiene alguna consulta?
            </h2>
            <p className="mt-3 max-w-xl text-white/70">
              Si necesita información adicional sobre estas políticas, puede
              comunicarse con nosotros.
            </p>
            <Link
              href="/contacto"
              className="mt-6 inline-flex rounded-lg bg-secondary px-5 py-3 font-semibold text-white transition hover:brightness-110"
            >
              Contactar
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
