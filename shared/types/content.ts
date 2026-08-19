export type ServiceGroup = { title: string; items: { icon: string; title: string; description: string }[] };
export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'quote'; text: string; caption?: string }
  | { type: 'bulleted'; items: string[] }
  | { type: 'numbered'; items: string[] }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'divider' };
export type BlogPost = {
  id: string; slug: string; title: string; excerpt: string; category: string; publishedAt: string;
  coverImage?: string; contentHtml?: string; content?: BlogBlock[];
  author?: { name: string; role?: string; avatar?: string }; readingTime?: number; tags?: string[]; status?: 'draft'|'published';
};
export type AboutValue = { id?: string; icon: string; title: string; description: string; sort_order?: number; active?: boolean };
