import { notFound } from 'next/navigation'; import { Header } from '@/components/layout/header'; import { Footer } from '@/components/layout/footer'; import { BlogArticle } from '@/features/blog/components/blog-article'; import { getPostBySlug,getPosts } from '@/features/blog/lib/posts';
// Cached and served statically; the admin API revalidates on every content change.
export const revalidate = 3600;
// Articles are rendered on first visit and then cached.
export async function generateStaticParams(){return []}
export default async function BlogPostPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const post=await getPostBySlug(decodeURIComponent(slug));if(!post)notFound();const all=await getPosts();const related=all.filter(x=>x.slug!==post.slug&&(x.category===post.category||x.category.split(' ')[0]===post.category.split(' ')[0]));return <><Header/><BlogArticle post={post} related={related.length?related:all.filter(x=>x.slug!==post.slug)}/><Footer/></>}
