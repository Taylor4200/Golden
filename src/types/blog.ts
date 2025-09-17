export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  readTime: number;
  published: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}
