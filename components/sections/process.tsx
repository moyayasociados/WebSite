"use client";
import { motion } from "framer-motion";
import { processSteps } from "@/shared/constants/site";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  return <section id="process" className="bg-background py-24"><div className="mx-auto max-w-container px-4 md:px-10"><SectionHeading title="Cómo Trabajamos" description="Un enfoque metodológico para convertir necesidades en resultados."/>
    <div className="grid gap-8 md:grid-cols-4">{processSteps.map((step,i)=><motion.div key={step.number} initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.1}} className="relative text-center">
      <div className={`relative z-10 mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border-2 text-2xl font-bold ${i===3?"border-secondary bg-secondary text-white":"border-secondary bg-white text-secondary"}`}>{step.number}</div>
      <h3 className="font-display text-lg font-bold text-primary">{step.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
      {i<3 && <div className="absolute left-[calc(50%+32px)] right-[calc(-50%+32px)] top-8 hidden border-t border-dashed border-secondary/30 md:block"/>}
    </motion.div>)}</div>
  </div></section>;
}
