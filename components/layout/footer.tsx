import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { siteConfig } from "@/shared/constants/site";
export function Footer({ config }: { config?: any }) {
  const site = config?.site ?? siteConfig;
  const logoSrc =
    typeof site.logo === "string"
      ? site.logo
      : (site.logo?.src ?? siteConfig.logo.src);
  const social = config?.social ?? siteConfig.social;
  const footer = config?.footer ?? {};
  return (
    <footer className="bg-primary py-14 text-white">
      <div className="mx-auto grid max-w-container gap-10 px-4 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <a href="#home" className="inline-block">
            <img
              src={logoSrc}
              alt={site.name ?? siteConfig.name}
              className="h-20 w-auto object-contain"
            />
          </a>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/55">
            {footer.description ?? site.description}
          </p>
          <div className="mt-6 flex gap-3">
            {[
              ["Instagram", social.instagram, Instagram],
              ["Facebook", social.facebook, Facebook],
              ["LinkedIn", social.linkedin, Linkedin],
            ].map(([label, href, Icon]: any) => (
              <a
                key={label}
                aria-label={label}
                href={href || "#"}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 p-2 text-secondary transition hover:bg-white/10 hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold">Legal</h4>
          <div className="mt-4 space-y-3 text-sm text-white/55">
            <a className="block hover:text-secondary" href="#">
              Política de Privacidad
            </a>
            <a className="block hover:text-secondary" href="#">
              Términos de Servicio
            </a>
            <a className="block hover:text-secondary" href="#">
              Política de Cookies
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-bold">Empresa</h4>
          <div className="mt-4 space-y-3 text-sm text-white/55">
            <a className="block hover:text-secondary" href="#services">
              Servicios
            </a>
            <a className="block hover:text-secondary" href="#about">
              Sobre Nosotros
            </a>
            <a className="block hover:text-secondary" href="#blog">
              Blog
            </a>
            <a className="block hover:text-secondary" href="#contact">
              Contacto
            </a>
            <Link
              className="block pt-3 text-white/40 transition hover:text-secondary"
              href="/portal/login"
            >
              {footer.portalLabel ?? "Ingreso a portal"}
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-container border-t border-white/10 px-4 pt-6 text-xs text-white/40 md:px-10">
        © {new Date().getFullYear()} {site.legalName ?? siteConfig.legalName}.
        Todos los derechos reservados.
      </div>
    </footer>
  );
}
