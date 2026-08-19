# Moya y Asociados · Next.js + Supabase

Landing corporativa, blog y portal administrativo. La arquitectura usa App Router, features, componentes reutilizables, Route Handlers y Supabase Auth/Postgres/Storage.

## 1. Instalar

```bash
npm install
npm run dev
```

## 2. Conectar Supabase

1. Crea un proyecto en Supabase.
2. Abre **SQL Editor** y ejecuta `supabase/schema.sql` completo.
3. En **Authentication > Users**, crea el primer usuario con email y contraseña.
4. Copia el UUID de ese usuario y ejecuta:

```sql
insert into public.admin_users(user_id, display_name)
values ('UUID_DEL_USUARIO', 'Administrador');
```

5. Copia `.env.example` a `.env.local` y configura:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=TU_PUBLISHABLE_KEY
```

El frontend usa el publishable key. No necesitas una service role key para el portal: las operaciones pasan por la sesión autenticada y RLS. Supabase Auth entrega el JWT de sesión y `@supabase/ssr` lo mantiene en cookies para SSR/Route Handlers.

## 3. Portal

El enlace **Ingreso a portal** aparece en el footer. La ruta es `/portal/login`.

- Login: Supabase Auth email/password.
- Autorización: la tabla `admin_users` determina quién puede entrar.
- Protección: middleware + `getUser()` en servidor + RLS.
- El JWT de Supabase acompaña la sesión y RLS valida `auth.uid()` mediante `is_admin()`.

## 4. Qué administra el portal

### Dashboard
Resumen de noticias, servicios, tecnologías y leads.

### Contenido
Basado en `admin2.html`: hero, CTA, contacto, WhatsApp, redes y Sobre Nosotros.

### Servicios
Basado en `admin3.html`: CRUD de servicios y tecnologías.

### Noticias
Basado en `admin4.html`: listado, borradores/publicación y editor enriquecido.

El editor guarda HTML sanitizable en `blog_posts.content_html`. Soporta negrita, cursiva, subrayado, H2, H3, citas, listas, enlaces, imágenes por URL y separadores. El frontend aplica sanitización antes de renderizar el artículo.

## 5. Datos iniciales

`supabase/schema.sql` crea y siembra:

- `site_content`
- `services`
- `technologies`
- `process_steps`
- `about_values`
- `blog_posts`
- `contact_leads`
- `admin_users`
- Storage bucket `site-media`

Por tanto, después de ejecutar el SQL, la landing funciona sin tener que volver a copiar los textos del código.

## 6. Arquitectura

```text
app/
  api/                 Route Handlers del backend integrado
  portal/              Login + portal protegido
  blog/                Rutas públicas
components/
  layout/              Header/Footer
  ui/                  Componentes reutilizables
features/
  auth/                Sesión y autorización
  admin/               Portal administrativo
  landing/             Hero/Servicios/Tecnología/About/Proceso
  blog/                Blog y adaptador Supabase
  contact/             Formulario de contacto
providers/
shared/
  constants/           Fallbacks y configuración mínima
  lib/supabase/        Clientes browser/server/admin
  types/               Tipos compartidos
supabase/
  schema.sql           Esquema + RLS + seed
```

## 7. Seguridad

- Nunca uses `SUPABASE_SERVICE_ROLE_KEY` en componentes cliente.
- No renombres el publishable key a `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY`.
- RLS está habilitado para todas las tablas expuestas.
- Los artículos publicados son públicos; los borradores requieren admin.
- Las operaciones CRUD del portal verifican sesión y pertenencia a `admin_users`.
