"use client";
import { useState } from "react";
export function ContentManager({ initial }: { initial: any }) {
  const [data, setData] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  function set(path: string, value: string) {
    setData((d: any) => {
      const n = structuredClone(d);
      const parts = path.split(".");
      let cur = n;
      for (let i = 0; i < parts.length - 1; i++)
        cur = cur[parts[i]] ?? (cur[parts[i]] = {});
      cur[parts.at(-1)!] = value;
      return n;
    });
  }
  async function save() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/site-content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setMessage(
      res.ok ? "Cambios guardados." : "No se pudieron guardar los cambios.",
    );
    setSaving(false);
  }
  return (
    <div className="space-y-6">
      <Card title="Hero Section">
        <Field
          label="Eyebrow"
          value={data.hero?.eyebrow ?? ""}
          onChange={(v) => set("hero.eyebrow", v)}
        />
        <Field
          label="Main Headline"
          value={data.hero?.title ?? ""}
          onChange={(v) => set("hero.title", v)}
        />
        <Area
          label="Subheadline / Supporting Text"
          value={data.hero?.description ?? ""}
          onChange={(v) => set("hero.description", v)}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Primary CTA Text"
            value={data.hero?.primaryCta ?? ""}
            onChange={(v) => set("hero.primaryCta", v)}
          />
          <Field
            label="Primary CTA Link"
            value={data.hero?.primaryLink ?? ""}
            onChange={(v) => set("hero.primaryLink", v)}
          />
          <Field
            label="Secondary CTA Text"
            value={data.hero?.secondaryCta ?? ""}
            onChange={(v) => set("hero.secondaryCta", v)}
          />
          <Field
            label="Secondary CTA Link"
            value={data.hero?.secondaryLink ?? ""}
            onChange={(v) => set("hero.secondaryLink", v)}
          />
          <Field
            label="Hero Image URL"
            value={data.hero?.image ?? ""}
            onChange={(v) => set("hero.image", v)}
          />
        </div>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Contact Details">
          <Field
            label="Phone Number"
            value={data.contact?.phone ?? ""}
            onChange={(v) => set("contact.phone", v)}
          />
          <Field
            label="Primary Email"
            value={data.contact?.email ?? ""}
            onChange={(v) => set("contact.email", v)}
          />
          <Area
            label="Office Address"
            value={data.contact?.office ?? ""}
            onChange={(v) => set("contact.office", v)}
          />
          <Field
            label="WhatsApp Number"
            value={data.contact?.whatsapp ?? ""}
            onChange={(v) => set("contact.whatsapp", v)}
          />
        </Card>
        <Card title="Social Profiles">
          <Field
            label="LinkedIn URL"
            value={data.social?.linkedin ?? ""}
            onChange={(v) => set("social.linkedin", v)}
          />
          <Field
            label="Facebook URL"
            value={data.social?.facebook ?? ""}
            onChange={(v) => set("social.facebook", v)}
          />
          <Field
            label="Instagram URL"
            value={data.social?.instagram ?? ""}
            onChange={(v) => set("social.instagram", v)}
          />
          <Field
            label="X / Twitter URL"
            value={data.social?.twitter ?? ""}
            onChange={(v) => set("social.twitter", v)}
          />
        </Card>
      </div>
      <Card title="Sobre Nosotros">
        <Field
          label="Título"
          value={data.about?.title ?? ""}
          onChange={(v) => set("about.title", v)}
        />
        <Area
          label="Párrafo 1"
          value={data.about?.paragraphs?.[0] ?? ""}
          onChange={(v) => {
            const a = [...(data.about?.paragraphs ?? [])];
            a[0] = v;
            setData((d: any) => ({
              ...d,
              about: { ...d.about, paragraphs: a },
            }));
          }}
        />
        <Area
          label="Párrafo 2"
          value={data.about?.paragraphs?.[1] ?? ""}
          onChange={(v) => {
            const a = [...(data.about?.paragraphs ?? [])];
            a[1] = v;
            setData((d: any) => ({
              ...d,
              about: { ...d.about, paragraphs: a },
            }));
          }}
        />
      </Card>
      <div className="sticky bottom-4 flex items-center justify-end gap-4 rounded-xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur">
        <span className="text-sm text-muted">{message}</span>
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-primary px-6 py-3 font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Publicar cambios"}
        </button>
      </div>
    </div>
  );
}
function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 border-t-4 border-t-secondary bg-white p-6 shadow-soft">
      <h2 className="mb-6 border-b border-slate-100 pb-4 font-display text-2xl font-bold text-primary">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
      />
    </label>
  );
}
function Area({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full resize-y rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
      />
    </label>
  );
}
