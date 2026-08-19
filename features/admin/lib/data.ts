import { createClient } from "@/shared/lib/supabase/server";
export async function getAdminData() {
  const supabase = await createClient();
  const [services, tech, process, values, posts, leads, content] =
    await Promise.all([
      supabase
        .from("services")
        .select("*")
        .order("group_name")
        .order("sort_order"),
      supabase
        .from("technologies")
        .select("*")
        .order("group_name")
        .order("sort_order"),
      supabase.from("process_steps").select("*").order("sort_order"),
      supabase.from("about_values").select("*").order("sort_order"),
      supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("contact_leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(8),
      supabase.from("site_content").select("key,value"),
    ]);
  return {
    services: services.data ?? [],
    technologies: tech.data ?? [],
    process: process.data ?? [],
    values: values.data ?? [],
    posts: posts.data ?? [],
    leads: leads.data ?? [],
    content: Object.fromEntries(
      (content.data ?? []).map((x: any) => [x.key, x.value]),
    ),
  };
}
