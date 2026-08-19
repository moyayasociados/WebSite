import Link from "next/link";
import { ArrowRight, FileText, Settings, Briefcase, Inbox } from "lucide-react";
import { getAdminData } from "@/features/admin/lib/data";
export default async function Dashboard() {
  const d = await getAdminData();
  const published = d.posts.filter((p: any) => p.status === "published").length;
  return (
    <main className="p-4 md:p-8">
      <div className="mx-auto max-w-container">
        <header className="mb-8">
          <h1 className="font-display text-4xl font-bold text-primary">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-muted">
            Bienvenido. Aquí tienes una vista rápida de lo que está pasando en
            tu sitio.
          </p>
        </header>
        <div className="grid gap-5 md:grid-cols-4">
          <Stat
            icon={FileText}
            label="Noticias"
            value={String(d.posts.length)}
            detail={`${published} publicadas`}
          />
          <Stat
            icon={Briefcase}
            label="Servicios"
            value={String(d.services.length)}
            detail="Entradas activas"
          />
          <Stat
            icon={Settings}
            label="Tecnologías"
            value={String(d.technologies.length)}
            detail="Herramientas"
          />
          <Stat
            icon={Inbox}
            label="Leads"
            value={String(d.leads.length)}
            detail="Últimos registros"
          />
        </div>
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="font-display text-2xl font-bold text-primary">
            Acciones rápidas
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Quick
              href="/portal/noticias/nueva"
              icon={FileText}
              label="Nueva noticia"
            />
            <Quick
              href="/portal/contenido"
              icon={Settings}
              label="Editar contenido"
            />
            <Quick
              href="/portal/servicios"
              icon={Briefcase}
              label="Gestionar servicios"
            />
            <Quick
              href="/portal/noticias"
              icon={ArrowRight}
              label="Ver noticias"
            />
          </div>
        </section>
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-primary">
              Actividad reciente
            </h2>
            <Link
              href="/portal/noticias"
              className="text-sm font-semibold text-secondary"
            >
              Ver todo
            </Link>
          </div>
          <div className="mt-5 divide-y divide-slate-100">
            {d.posts.slice(0, 5).map((p: any) => (
              <div
                key={p.id}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <p className="font-semibold text-primary">{p.title}</p>
                  <p className="text-xs text-slate-500">
                    {p.category} ·{" "}
                    {p.status === "published" ? "Publicado" : "Borrador"}
                  </p>
                </div>
                <Link
                  href={`/portal/noticias/${p.id}`}
                  className="text-secondary"
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
            ))}
            {!d.posts.length && (
              <p className="py-5 text-sm text-muted">
                Todavía no hay noticias.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
function Stat({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: any;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 border-t-4 border-t-secondary bg-white p-5 shadow-soft">
      <Icon className="text-primary" size={20} />
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-1 font-display text-3xl font-bold text-primary">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </div>
  );
}
function Quick({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-5 text-center transition hover:border-primary hover:bg-white"
    >
      <Icon size={28} className="text-primary" />
      <span className="mt-2 text-sm font-semibold text-primary">{label}</span>
    </Link>
  );
}
