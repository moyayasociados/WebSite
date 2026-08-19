import { getPosts } from "@/features/blog/lib/posts";

export async function GET() {
  const posts = await getPosts();
  return Response.json({ data: posts });
}
