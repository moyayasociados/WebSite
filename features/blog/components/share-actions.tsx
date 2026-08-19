"use client";

import { Link as LinkIcon, Linkedin } from "lucide-react";

export function ShareActions({ url }: { url: string }) {
  const encoded = encodeURIComponent(url);
  return <div className="flex items-center gap-2"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">Compartir:</span><a aria-label="Compartir en LinkedIn" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-primary transition-colors hover:border-secondary hover:text-secondary"><Linkedin size={18} /></a><button aria-label="Copiar enlace" type="button" onClick={() => navigator.clipboard?.writeText(url)} className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-primary transition-colors hover:border-secondary hover:text-secondary"><LinkIcon size={18} /></button></div>;
}
