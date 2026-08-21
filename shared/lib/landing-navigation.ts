export const landingRoutes: Record<string, string> = {
  home: "/inicio",
  services: "/servicios",
  about: "/sobre-nosotros",
  process: "/proceso",
  blog: "/novedades",
  contact: "/contacto",
};

const aliases: Record<string, string> = {
  inicio: "home",
  servicios: "services",
  "sobre-nosotros": "about",
  proceso: "process",
  novedades: "blog",
  contacto: "contact",
};

export function landingPath(value?: string) {
  const raw = String(value ?? "home").trim();
  const id = raw.replace(/^\/?#?/, "").replace(/^\//, "");
  const normalized = aliases[id] ?? id;
  return landingRoutes[normalized] ?? landingRoutes.home;
}

export function landingSectionFromPath(pathname: string) {
  const key = pathname.replace(/^\//, "").split("/")[0] || "inicio";
  return aliases[key] ?? (key === "inicio" ? "home" : key);
}
