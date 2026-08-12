import { BlogPost } from "./types/blog";

export async function getAllBlogs(): Promise<BlogPost[]> {
    const devToUsername = process.env.NEXT_PUBLIC_DEVTO_USERNAME;
    
    if (devToUsername) {
        try {
            const res = await fetch(`https://dev.to/api/articles?username=${devToUsername}`, {
                next: { revalidate: 60 }
            });
            if (res.ok) {
                const data = await res.json();
                const remotePosts: BlogPost[] = data.map((item: any) => ({
                    id: String(item.id),
                    slug: item.slug,
                    title: item.title,
                    summary: item.description || item.title,
                    content: item.body_markdown || item.description,
                    category: item.tag_list?.[0] ? item.tag_list[0] : "Tech",
                    tags: item.tag_list || ["Tech"],
                    readTime: `${item.reading_time_minutes} min read`,
                    publishedAt: new Date(item.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                    coverImage: item.cover_image || item.social_image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
                    author: {
                        name: item.user?.name || "Author",
                        avatar: item.user?.profile_image || "https://github.com/harsh7274v.png",
                        role: "Author",
                        twitter: item.user?.twitter_username ? `https://twitter.com/${item.user.twitter_username}` : undefined
                    },
                    likesCount: item.public_reactions_count || 0
                }));
                return remotePosts;
            }
        } catch (e) {
            console.error("Failed to fetch remote blogs:", e);
        }
    }

    return [];
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
    const blogs = await getAllBlogs();
    const found = blogs.find((b) => b.slug === slug);
    if (!found) return null;

    // Fetch full content from Dev.to article details API
    if (found.id && !isNaN(Number(found.id))) {
        try {
            const res = await fetch(`https://dev.to/api/articles/${found.id}`, {
                next: { revalidate: 60 }
            });
            if (res.ok) {
                const fullArticle = await res.json();
                return {
                    ...found,
                    content: fullArticle.body_markdown || fullArticle.body_html || found.content,
                    bodyHtml: fullArticle.body_html || undefined
                };
            }
        } catch (e) {
            console.error("Failed to fetch full Dev.to article body:", e);
        }
    }

    return found;
}
