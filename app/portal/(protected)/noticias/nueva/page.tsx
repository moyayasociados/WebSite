import { getAdminData } from '@/features/admin/lib/data'; import { NewsManager } from '@/features/admin/components/news-manager';
export default async function NewNewsPage(){const d=await getAdminData();return <NewsManager initial={d.posts} startNew/>}
