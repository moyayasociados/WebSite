"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CloudCog,
  ClipboardCheck,
  Globe2,
  ReceiptText,
  Smartphone,
  Users,
  WalletCards,
  Workflow,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
const icons: any = {
  globe: Globe2,
  smartphone: Smartphone,
  cloud: CloudCog,
  workflow: Workflow,
  wallet: WalletCards,
  receipt: ReceiptText,
  clipboard: ClipboardCheck,
  users: Users,
};
export function Services({ items }: { items: any[] }) {
  const groups = [
    { key: "accounting", title: "Servicios Contables" },
    { key: "development", title: "Desarrollo de Software" },
  ];
  return (
    <section id="services" className="bg-background py-24">
      <div className="mx-auto max-w-container px-4 md:px-10">
        <SectionHeading
          title="Nuestros Servicios"
          description="Soluciones especializadas para potenciar el crecimiento de su empresa."
        />
        <div className="space-y-16">
          {groups.map((g) => {
            const list = items.filter((x) => x.group_name === g.key);
            return (
              <div key={g.key}>
                <h3 className="mb-8 border-b border-gray-200 pb-4 font-display text-2xl font-bold text-primary">
                  {g.title}
                </h3>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                  {list.map((item, i) => {
                    const Icon = icons[item.icon] ?? Globe2;
                    return (
                      <motion.article
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft"
                      >
                        <div
                          className={`mb-5 grid h-12 w-12 place-items-center rounded-lg ${g.key === "development" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}
                        >
                          <Icon size={23} />
                        </div>
                        <h4 className="font-bold text-primary">{item.title}</h4>
                        <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                          {item.description}
                        </p>
                        <a
                          href="#contact"
                          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary"
                        >
                          Conocer más <ArrowRight size={15} />
                        </a>
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
