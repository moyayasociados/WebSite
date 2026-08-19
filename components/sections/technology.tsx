import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { technologyGroups } from "@/shared/constants/site";

export function Technology() {
  return <section className="bg-primary py-20 text-white">
    <div className="mx-auto max-w-container px-4 md:px-10">
      <SectionHeading dark title="Especialización y Herramientas" description="Conocimiento técnico y criterio de negocio para construir soluciones útiles."/>
      <div className="grid gap-12 md:grid-cols-2">
        <div><h3 className="mb-6 border-b border-white/10 pb-3 font-display text-xl font-bold text-secondary">Tecnologías de desarrollo</h3><div className="flex flex-wrap gap-3">{technologyGroups.development.map(t=><span key={t} className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/15">{t}</span>)}</div></div>
        <div><h3 className="mb-6 border-b border-white/10 pb-3 font-display text-xl font-bold text-secondary">Contabilidad y gestión</h3><div className="grid gap-4 sm:grid-cols-2">{technologyGroups.accounting.map(t=><div key={t} className="flex items-center gap-3 text-sm font-medium"><CheckCircle2 size={18} className="shrink-0 text-secondary"/>{t}</div>)}</div></div>
      </div>
    </div>
  </section>;
}
