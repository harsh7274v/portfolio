export interface Author {
    name: string;
    avatar: string;
    role?: string;
    bio?: string;
    github?: string;
    twitter?: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    summary: string;
    content: string;
    category: string;
    tags: string[];
    readTime: string;
    publishedAt: string;
    coverImage: string;
    author: Author;
    likesCount: number;
    bodyHtml?: string;
}

export interface Category {
    id: string;
    name: string;
    count: number;
}
