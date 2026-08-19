import { requireAdmin } from "@/features/auth/lib/server";
import { getAdminData } from "@/features/admin/lib/data";
import { ContentManager } from "@/features/admin/components/content-manager";
import { ProcessValuesManager } from "@/features/admin/components/process-values-manager";
export default async function ContentPage() {
  await requireAdmin();
  debugger;
  const d = await getAdminData();
  return (
    <main className="p-4 md:p-8">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-8">
          <h1 className="font-display text-4xl font-bold text-primary">
            Content Management
          </h1>
          <p className="mt-2 text-muted">
            Actualiza la información central del sitio y el contenido de la
            landing.
          </p>
        </header>
        <ContentManager initial={d.content} />
        <ProcessValuesManager process={d.process} values={d.values} />
      </div>
    </main>
  );
}
