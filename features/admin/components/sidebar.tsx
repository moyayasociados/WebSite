"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  PanelTop,
  Briefcase,
  Newspaper,
  LogOut,
  X,
} from "lucide-react";
import { createClient } from "@/shared/lib/supabase/client";
import { useRouter } from "next/navigation";
const items = [
  ["/portal", "Dashboard", LayoutDashboard],
  ["/portal/contenido", "Contenido", PanelTop],
  ["/portal/servicios", "Servicios", Briefcase],
  ["/portal/noticias", "Noticias", Newspaper],
] as const;
export function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  async function logout() {
    await createClient().auth.signOut();
    router.replace("/portal/login");
    router.refresh();
  }
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-primary text-white shadow-2xl transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
        <img
          src="/logtipoMoyayAsociados1.png"
          alt="Moya y Asociados"
          className="h-12 w-auto object-contain brightness-0 invert"
        />
        <button className="lg:hidden" onClick={onClose}>
          <X />
        </button>
      </div>
      <nav className="space-y-1 p-4">
        {items.map(([href, label, Icon]) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <Icon size={19} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full border-t border-white/10 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-white/60 hover:bg-white/10 hover:text-white"
        >
          <LogOut size={19} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
