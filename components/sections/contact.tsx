import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactInfo, siteConfig } from "@/shared/constants/site";
import { DynamicForm } from "@/features/contact/components/dynamic-form";

const iconMap:any = {mail:Mail, phone:Phone, "map-pin":MapPin};

export function Contact() {
  return <section id="contact" className="bg-background py-24"><div className="mx-auto max-w-container px-4 md:px-10">
    <div className="grid gap-14 md:grid-cols-2">
      <div><SectionHeading title="Hablemos de su próximo proyecto" description="Cuéntanos qué necesitas y revisamos juntos la mejor forma de llevarlo a cabo."/>
        <div className="space-y-6">{contactInfo.map(item=>{const Icon=iconMap[item.icon]; return <a href={item.href} key={item.label} className="flex items-center gap-4 group"><div className="grid h-12 w-12 place-items-center rounded-full bg-white text-secondary shadow-sm"><Icon size={20}/></div><div><p className="font-semibold text-primary">{item.label}</p><p className="text-sm text-muted group-hover:text-secondary">{item.value}</p></div></a>})}</div>
      </div>
      <div className="rounded-xl border border-gray-100 bg-white p-7 shadow-sm md:p-8"><DynamicForm/></div>
    </div>
  </div></section>;
}
