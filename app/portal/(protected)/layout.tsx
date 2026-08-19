import { requireAdmin } from '@/features/auth/lib/server'; import { AdminShell } from '@/features/admin/components/admin-shell';
export default async function ProtectedPortalLayout({children}:{children:React.ReactNode}){await requireAdmin();return <AdminShell>{children}</AdminShell>}
