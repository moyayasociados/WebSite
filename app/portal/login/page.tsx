"use client";
import { useState } from "react";
import { createClient } from "@/shared/lib/supabase/client";
import { LockKeyhole, Mail, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
export default function PortalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim())
      nextErrors.email = "El correo electrónico es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      nextErrors.email = "Ingresa un correo electrónico válido.";
    if (!password) nextErrors.password = "La contraseña es obligatoria.";
    else if (password.length < 6)
      nextErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
      return;
    }
    const { data: admin } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", (await supabase.auth.getUser()).data.user?.id ?? "")
      .maybeSingle();
    if (!admin) {
      await supabase.auth.signOut();
      setError("Este usuario no tiene acceso al portal.");
      setLoading(false);
      return;
    }
    router.replace("/portal");
    router.refresh();
  }
  return (
    <main className="min-h-screen bg-primary px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-2">
          <div className="hidden bg-primary p-12 text-white md:flex md:flex-col md:justify-between">
            <img
              src="/favicon.png"
              alt="Moya y Asociados"
              className="h-20 w-auto object-contain object-left brightness-0 invert"
            />
            <div>
              <span className="text-xs font-bold uppercase tracking-[.2em] text-secondary">
                Portal administrativo
              </span>
              <h1 className="mt-4 font-display text-4xl font-bold">
                Gestione el contenido de su sitio.
              </h1>
              <p className="mt-4 max-w-md text-white/65">
                Administre noticias, servicios y la información pública de Moya
                y Asociados desde un solo lugar.
              </p>
            </div>
            <p className="text-xs text-white/40">
              Acceso protegido por Supabase Auth + JWT.
            </p>
          </div>
          <div className="p-8 md:p-12">
            <div className="md:hidden">
              <img
                src="/favicon.png"
                alt="Moya y Asociados"
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="mt-8 md:mt-0">
              <span className="text-xs font-bold uppercase tracking-[.2em] text-secondary">
                Ingreso a portal
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-primary">
                Bienvenido
              </h2>
              <p className="mt-2 text-sm text-muted">
                Ingresa con tu usuario de Supabase.
              </p>
              <form onSubmit={submit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-3.5 text-slate-400"
                      size={18}
                    />
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setFieldErrors((v) => ({ ...v, email: undefined }));
                      }}
                      type="email"
                      required
                      className={`w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:ring-2 ${fieldErrors.email ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-secondary focus:ring-secondary/20"}`}
                      placeholder="admin@empresa.com"
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-primary">
                    Contraseña
                  </label>
                  <div className="relative">
                    <LockKeyhole
                      className="absolute left-3 top-3.5 text-slate-400"
                      size={18}
                    />
                    <input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setFieldErrors((v) => ({ ...v, password: undefined }));
                      }}
                      type="password"
                      required
                      className={`w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:ring-2 ${fieldErrors.password ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "border-slate-200 focus:border-secondary focus:ring-secondary/20"}`}
                      placeholder="••••••••"
                    />
                  </div>
                  {fieldErrors.password && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>
                {error && (
                  <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </p>
                )}
                <button
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
                >
                  {loading ? "Ingresando..." : "Ingresar"}
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
