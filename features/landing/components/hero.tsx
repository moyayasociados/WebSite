"use client";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const fallbackImage =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=85";
export function Hero({ data }: { data: any }) {
  const h = data.hero;
  const title = String(h.title ?? "");
  const parts = title.split(/tecnología de vanguardia/i);
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-20"
    >
      <div className="absolute inset-0 bg-primary">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center opacity-30 blur-[1px]"
          style={{ backgroundImage: `url(${h.image || fallbackImage})` }}
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/85 to-primary" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <span className="mb-5 inline-flex rounded-full border border-secondary/40 bg-secondary/10 px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-secondary">
          {h.eyebrow}
        </span>
        <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          {parts[0]}
          {parts.length > 1 && (
            <>
              <span className="text-secondary">Tecnología de Vanguardia</span>
              {parts[1]}
            </>
          )}
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/70">
          {h.description}
        </p>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Button href={h.primaryLink ?? "/contacto"} variant="secondary">
            {h.primaryCta}
            <ArrowRight size={18} />
          </Button>
          <Button href={h.secondaryLink ?? "/servicios"} variant="outline">
            {h.secondaryCta}
          </Button>
        </div>
        <Link
          href="/servicios"
          className="mx-auto mt-16 block w-fit animate-float text-white/60 transition hover:text-secondary"
          aria-label="Bajar a servicios"
        >
          <ArrowDown />
        </Link>
      </motion.div>
    </section>
  );
}
