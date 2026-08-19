import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/shared/lib/whatsapp";
export function WhatsAppFab() {
  return <a href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp" className="fixed bottom-6 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-secondary text-white shadow-xl transition hover:scale-110 md:right-7"><MessageCircle size={27}/></a>;
}
