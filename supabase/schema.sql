-- Moya y Asociados - Supabase schema
-- Run this file in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(select 1 from public.admin_users where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create table if not exists public.site_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  group_name text not null check (group_name in ('development','accounting')),
  icon text not null default 'globe',
  title text not null,
  description text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.technologies (
  id uuid primary key default gen_random_uuid(),
  group_name text not null check (group_name in ('development','accounting')),
  name text not null,
  icon text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.process_steps (
  id uuid primary key default gen_random_uuid(),
  step_number integer not null,
  title text not null,
  description text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.about_values (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'star',
  title text not null,
  description text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null default 'General',
  excerpt text not null default '',
  cover_image text,
  author_name text,
  author_role text,
  author_avatar text,
  reading_time integer,
  tags text[] not null default '{}',
  content_html text not null default '',
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists blog_posts_status_date_idx on public.blog_posts(status, published_at desc);
create index if not exists services_group_order_idx on public.services(group_name, sort_order);
create index if not exists technologies_group_order_idx on public.technologies(group_name, sort_order);
create index if not exists process_order_idx on public.process_steps(sort_order);
create index if not exists about_order_idx on public.about_values(sort_order);

alter table public.admin_users enable row level security;
alter table public.site_content enable row level security;
alter table public.services enable row level security;
alter table public.technologies enable row level security;
alter table public.process_steps enable row level security;
alter table public.about_values enable row level security;
alter table public.blog_posts enable row level security;
alter table public.contact_leads enable row level security;

create policy "users can read own admin membership" on public.admin_users for select to authenticated using (user_id = auth.uid());

-- Public reads
create policy "public read site content" on public.site_content for select to anon, authenticated using (true);
create policy "public read active services" on public.services for select to anon, authenticated using (active = true or public.is_admin());
create policy "public read active technologies" on public.technologies for select to anon, authenticated using (active = true or public.is_admin());
create policy "public read active process" on public.process_steps for select to anon, authenticated using (active = true or public.is_admin());
create policy "public read active values" on public.about_values for select to anon, authenticated using (active = true or public.is_admin());
create policy "public read published posts" on public.blog_posts for select to anon, authenticated using (status = 'published' or public.is_admin());

-- Admin access
create policy "admin manage site content" on public.site_content for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manage services" on public.services for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manage technologies" on public.technologies for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manage process" on public.process_steps for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manage values" on public.about_values for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin manage posts" on public.blog_posts for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin read leads" on public.contact_leads for select to authenticated using (public.is_admin());
create policy "public create leads" on public.contact_leads for insert to anon, authenticated with check (true);

-- Seed site content. Upserts are safe to run again after editing the values.
insert into public.site_content(key, value) values
('site', '{"name":"Moya y Asociados","legalName":"Moya y Asociados","description":"Tecnología y contabilidad para empresas que quieren crecer con orden.","logo":"/favicon.png","email":"contacto@moyayasociados.com","phone":"+593 999 999 999","office":"Quito, Ecuador"}'::jsonb),
('hero', '{"eyebrow":"Tecnología + Contabilidad","title":"Impulsamos su negocio con tecnología de vanguardia y gestión contable profesional","description":"Soluciones integrales a medida para emprendedores y empresas en crecimiento. Combinamos precisión financiera con innovación digital.","primaryCta":"Solicitar cotización","primaryLink":"#contact","secondaryCta":"Ver servicios","secondaryLink":"#services","image":""}'::jsonb),
('about', '{"title":"Sobre Nosotros","paragraphs":["Nuestra visión es unir la precisión financiera con la innovación digital. Creemos que las empresas del futuro necesitan un socio estratégico que comprenda tanto el lenguaje de los negocios y los números, como el poder transformador de la tecnología.","Con años de experiencia en ambos sectores, ofrecemos un enfoque integral y vanguardista que impulsa el crecimiento, mitiga riesgos y optimiza cada proceso operativo."]}'::jsonb),
('contact', '{"email":"contacto@moyayasociados.com","phone":"+593 999 999 999","office":"Quito, Ecuador","whatsapp":"593999999999"}'::jsonb),
('social', '{"instagram":"https://instagram.com/","facebook":"https://facebook.com/","linkedin":"https://linkedin.com/","twitter":""}'::jsonb),
('footer', '{"description":"Tecnología y contabilidad para empresas que quieren crecer con orden, información y mejores herramientas.","portalLabel":"Ingreso a portal"}'::jsonb),
('navigation', '{"items":[{"label":"Inicio","href":"#home"},{"label":"Servicios","href":"#services"},{"label":"Sobre Nosotros","href":"#about"},{"label":"Proceso","href":"#process"},{"label":"Blog","href":"#blog"},{"label":"Contacto","href":"#contact"}]}'::jsonb)
on conflict (key) do update set value = excluded.value, updated_at = now();

insert into public.services(group_name, icon, title, description, sort_order) values
('development','globe','Desarrollo Web a Medida','Creamos plataformas web escalables y optimizadas para su negocio.',1),
('development','smartphone','Aplicaciones Móviles','Apps diseñadas para ofrecer una experiencia clara, rápida y útil.',2),
('development','cloud','Arquitectura y DevOps','Infraestructura robusta y despliegue continuo para una operación confiable.',3),
('development','workflow','Integración de Sistemas','Conectamos sus herramientas para conseguir flujos de trabajo unificados.',4),
('accounting','wallet','Gestión Financiera','Control financiero para tomar decisiones con información clara.',1),
('accounting','receipt','Asesoría Tributaria','Acompañamiento para cumplir obligaciones y mantener sus procesos ordenados.',2),
('accounting','clipboard','Auditoría Externa','Verificación independiente para fortalecer la transparencia contable.',3),
('accounting','users','Planificación de Nómina','Gestión organizada de recursos humanos y obligaciones laborales.',4)
on conflict do nothing;

insert into public.technologies(group_name,name,sort_order) values
('development','React',1),('development','Angular',2),('development','Node.js',3),('development','Next.js',4),('development','NestJS',5),('development','Spring Boot',6),('development','SQL',7),('development','NoSQL',8),('development','DevOps',9),
('accounting','Cumplimiento NIIF',1),('accounting','Software Contable',2),('accounting','Gestión Tributaria',3),('accounting','Nómina y RRHH',4)
on conflict do nothing;

insert into public.process_steps(step_number,title,description,sort_order) values
(1,'Diagnóstico','Analizamos sus necesidades, contexto y objetivos.',1),
(2,'Propuesta','Diseñamos una solución a medida y un plan de acción.',2),
(3,'Ejecución','Desarrollamos e implementamos con un enfoque iterativo.',3),
(4,'Entrega y Soporte','Ponemos la solución en marcha y acompañamos su evolución.',4)
on conflict do nothing;

insert into public.about_values(icon,title,description,sort_order) values
('handshake','Compromiso','Dedicación total a los objetivos y el éxito a largo plazo de nuestros clientes.',1),
('lightbulb','Innovación','Búsqueda constante de soluciones tecnológicas que marquen la diferencia.',2),
('eye','Transparencia','Claridad y honestidad en cada proceso financiero y desarrollo de software.',3),
('star','Excelencia','Altos estándares de calidad en cada entregable y asesoría que brindamos.',4)
on conflict do nothing;

-- Optional storage bucket for article/landing media.
insert into storage.buckets(id, name, public) values ('site-media','site-media',true) on conflict (id) do nothing;
create policy "public read site media" on storage.objects for select to anon, authenticated using (bucket_id = 'site-media');
create policy "admin upload site media" on storage.objects for insert to authenticated with check (bucket_id = 'site-media' and public.is_admin());
create policy "admin update site media" on storage.objects for update to authenticated using (bucket_id = 'site-media' and public.is_admin()) with check (bucket_id = 'site-media' and public.is_admin());
create policy "admin delete site media" on storage.objects for delete to authenticated using (bucket_id = 'site-media' and public.is_admin());


insert into public.blog_posts(slug,title,category,excerpt,cover_image,author_name,author_role,reading_time,tags,content_html,status,published_at)
values
('el-futuro-del-desarrollo-cloud','El futuro del desarrollo Cloud en 2024: Tendencias y Estrategias','Tecnología','La evolución cloud, Serverless y FinOps está cambiando la forma en que las empresas diseñan y administran sus plataformas digitales.','https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85','Moya y Asociados','Perspectivas Tecnológicas',8,array['Cloud','Finanzas','Estrategia'],'<p>La adopción de tecnologías en la nube ha dejado de ser una ventaja competitiva para convertirse en un imperativo operacional. Las empresas buscan no solo migrar sus operaciones, sino optimizar la arquitectura subyacente para garantizar resiliencia, seguridad y eficiencia en costos.</p><h2>La Evolución hacia Arquitecturas Serverless</h2><p>Las arquitecturas Serverless están redefiniendo cómo las organizaciones despliegan aplicaciones. Al abstraer la gestión de la infraestructura, los equipos de desarrollo pueden centrarse en la lógica de negocio, reduciendo tiempos de lanzamiento y optimizando recursos de ingeniería.</p><blockquote>La verdadera optimización cloud no ocurre al apagar servidores, sino al rediseñar sistemas para que consuman recursos únicamente en el milisegundo exacto en que son requeridos.</blockquote><h3>Optimización de Costos en Entornos Híbridos</h3><p>Con la fluctuación de los mercados globales, la gestión financiera de la nube (FinOps) ha cobrado protagonismo. Implementar estrategias de right-sizing y reservar capacidad en instancias de uso constante puede reducir los gastos operativos. La visibilidad granular del gasto por departamento es esencial para una contabilidad tecnológica precisa.</p><ul><li>Auditorías automatizadas: identificar recursos huérfanos.</li><li>Estrategias Multi-Cloud: mitigar riesgos de dependencia de un solo proveedor.</li><li>Etiquetado riguroso: mantener un rastreo financiero exacto.</li></ul><p>En Moya y Asociados, integramos la excelencia contable con la consultoría tecnológica para asegurar que cada inversión en infraestructura digital genere un retorno medible y estratégico.</p>','published','2024-05-15T12:00:00Z'),
('impacto-ia-contabilidad-moderna','Impacto de la IA en la Contabilidad Moderna: Lo que toda PyME debe saber','Tecnología & Contabilidad','Una mirada práctica a cómo la inteligencia artificial está transformando procesos contables y decisiones empresariales.','https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85','Moya y Asociados','Perspectiva Empresarial',6,array['IA','Contabilidad','PyMEs'],'<p>La inteligencia artificial está dejando de ser una promesa futurista para convertirse en una herramienta concreta dentro de las áreas financieras. Para las PyMEs, el mayor valor no está en reemplazar personas, sino en automatizar tareas repetitivas y liberar tiempo para analizar el negocio.</p><h2>Dónde empieza el cambio</h2><p>Conciliaciones, clasificación documental, revisión de datos y generación de reportes son algunos de los procesos donde la automatización puede aportar velocidad y consistencia.</p><blockquote>La tecnología genera valor cuando resuelve un problema real y puede medirse su impacto.</blockquote><h3>Una adopción responsable</h3><ul><li>Definir procesos repetitivos antes de elegir una herramienta.</li><li>Mantener controles humanos sobre decisiones financieras relevantes.</li><li>Medir ahorro de tiempo, errores y calidad de información.</li></ul>','published','2024-10-15T12:00:00Z'),
('seguridad-nube-pymes','Seguridad en la Nube para PyMEs: Guía Definitiva','Seguridad','Descubra las mejores prácticas para proteger los datos financieros de su empresa en entornos cloud sin comprometer la accesibilidad.','https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1600&q=85','Moya y Asociados','Consultoría Tecnológica',7,array['Cloud','Seguridad','PyMEs'],'<p>Migrar a la nube no elimina la responsabilidad sobre la seguridad. La arquitectura, las identidades y las políticas de acceso deben diseñarse desde el inicio.</p><h2>Controles fundamentales</h2><ul><li>Autenticación multifactor.</li><li>Principio de mínimo privilegio.</li><li>Copias de seguridad y recuperación probada.</li></ul>','published','2024-10-12T12:00:00Z')
on conflict (slug) do nothing;

-- After creating the first user in Authentication > Users, grant portal access with:
-- insert into public.admin_users(user_id, display_name) values ('AUTH_USER_UUID', 'Administrador');
