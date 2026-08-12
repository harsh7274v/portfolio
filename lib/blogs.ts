import { BlogPost } from "./types/blog";

export const SAMPLE_BLOGS: BlogPost[] = [
    {
        id: "building-scalable-ai-agent-workflows",
        slug: "building-scalable-ai-agent-workflows",
        title: "Building Scalable AI Agent Workflows with Next.js & LLM APIs",
        summary: "An in-depth guide on designing multi-step agentic LLM pipelines with streaming responses, tool use, and fallbacks in modern web applications.",
        content: `
### Introduction

AI agents are rapidly reshaping modern application development. By combining Large Language Models (LLMs) with structured tools and state management, we can build agents that analyze, reason, and act autonomously.

### Core Architectural Components

1. **State Management**: Using persistent memory (like Redis or PostgreSQL vector storage) to maintain conversation turn context.
2. **Tool Execution**: Function calling interfaces that allow the model to call local utilities or external APIs safely.
3. **Structured Outputs**: Leveraging JSON schemas to get guaranteed typed returns from models like Gemini and OpenAI.

\`\`\`typescript
interface AgentAction {
    toolName: string;
    arguments: Record<string, unknown>;
}
\`\`\`

### Best Practices for Production

- Always implement retry logic with exponential backoff for API rate limits.
- Keep system prompts modular and testable.
- Log token usage and model execution latency.
        `,
        category: "Tech & AI",
        tags: ["AI", "LLM", "Next.js", "TypeScript"],
        readTime: "5 min read",
        publishedAt: "Aug 10, 2026",
        coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        author: {
            name: "Harsh Vardhan Prasad",
            avatar: "https://github.com/harsh7274v.png",
            role: "Fullstack & AI Engineer",
            bio: "Building intelligent web apps, RAG pipelines, and high-performance React systems.",
            github: "https://github.com/harsh7274v",
            twitter: "https://twitter.com"
        },
        likesCount: 42
    },
    {
        id: "mastering-tailwind-v4-and-design-tokens",
        slug: "mastering-tailwind-v4-and-design-tokens",
        title: "Mastering Tailwind CSS v4 Theme Engine & CSS Variables",
        summary: "Explore how Tailwind v4 uses CSS native cascade layers, modern @theme directives, and HSL variables for dark mode and dynamic theme switching.",
        content: `
Tailwind CSS v4 introduces a streamlined approach to styling web applications without configuration overhead.

### Key Features

- **Native CSS Directives**: Simple \`@import "tailwindcss";\` without large config files.
- **Theme Variables**: Easily customize theme tokens directly inside \`@theme\` declarations.
- **Automatic Dark Mode**: Pair with \`next-themes\` for zero-flicker theme switching.

\`\`\`css
@import "tailwindcss";

@theme {
    --color-sidebar: var(--sidebar);
    --color-main: var(--main);
}
\`\`\`
        `,
        category: "Web Dev",
        tags: ["TailwindCSS", "CSS", "Frontend", "UI/UX"],
        readTime: "4 min read",
        publishedAt: "Aug 05, 2026",
        coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
        author: {
            name: "Harsh Vardhan Prasad",
            avatar: "https://github.com/harsh7274v.png",
            role: "Fullstack & AI Engineer",
            bio: "Building intelligent web apps, RAG pipelines, and high-performance React systems.",
            github: "https://github.com/harsh7274v"
        },
        likesCount: 28
    },
    {
        id: "system-design-micro-frontends-and-caching",
        slug: "system-design-micro-frontends-and-caching",
        title: "System Design: Micro-Frontends & Global Edge Caching",
        summary: "Understanding edge networks, CDN revalidation strategies, and micro-frontend architecture for high-traffic web platforms.",
        content: `
High-availability web applications rely on edge caching strategies (stale-while-revalidate, ISR) to deliver near-zero latency globally.

### Key Takeaways

1. **CDN Edge Caching**: Cache rendered pages near the user.
2. **On-Demand Revalidation**: Purge cache tags instantly when CMS content changes.
3. **Decoupled API Contracts**: Maintain strict schemas between frontend services and backend microservices.
        `,
        category: "System Design",
        tags: ["System Design", "Architecture", "CDN", "Performance"],
        readTime: "7 min read",
        publishedAt: "Jul 28, 2026",
        coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        author: {
            name: "Harsh Vardhan Prasad",
            avatar: "https://github.com/harsh7274v.png",
            role: "Fullstack & AI Engineer",
            bio: "Building intelligent web apps, RAG pipelines, and high-performance React systems.",
            github: "https://github.com/harsh7274v"
        },
        likesCount: 35
    }
];

export function parseFrontmatter(rawContent: string, defaultSlug: string): BlogPost {
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
    const match = rawContent.match(frontmatterRegex);

    const data: Record<string, any> = {};
    let content = rawContent;

    if (match) {
        const yamlBlock = match[1];
        content = rawContent.replace(frontmatterRegex, "").trim();

        yamlBlock.split("\n").forEach((line) => {
            const colonIndex = line.indexOf(":");
            if (colonIndex === -1) return;

            const key = line.slice(0, colonIndex).trim();
            let val = line.slice(colonIndex + 1).trim();

            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
            }

            if (val.startsWith("[") && val.endsWith("]")) {
                const items = val
                    .slice(1, -1)
                    .split(",")
                    .map((s) => s.trim().replace(/^["']|["']$/g, ""))
                    .filter(Boolean);
                data[key] = items;
            } else if (!isNaN(Number(val)) && val !== "") {
                data[key] = Number(val);
            } else {
                data[key] = val;
            }
        });
    }

    const slug = data.slug || defaultSlug;

    return {
        id: slug,
        slug,
        title: data.title || "Untitled Article",
        summary: data.summary || "No summary provided.",
        content,
        category: data.category || "Tech",
        tags: Array.isArray(data.tags) ? data.tags : ["Tech"],
        readTime: data.readTime || "4 min read",
        publishedAt: data.publishedAt || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        coverImage: data.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        author: {
            name: data.authorName || "Harsh Vardhan Prasad",
            avatar: data.authorAvatar || "https://github.com/harsh7274v.png",
            role: data.authorRole || "Fullstack & AI Engineer",
            bio: data.authorBio || "Building intelligent web apps, RAG pipelines, and high-performance React systems.",
            github: data.authorGithub || "https://github.com/harsh7274v",
            twitter: data.authorTwitter || "https://twitter.com"
        },
        likesCount: typeof data.likesCount === "number" ? data.likesCount : 25
    };
}

/**
 * Fetches blog posts directly from GitHub Repository (Option 1: GitHub Remote CMS)
 */
export async function fetchBlogsFromGitHub(): Promise<BlogPost[] | null> {
    const repo = process.env.NEXT_PUBLIC_GITHUB_REPO || "harsh7274v/portfolio";
    const branch = process.env.NEXT_PUBLIC_GITHUB_BRANCH || "main";
    const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    const headers: Record<string, string> = {
        Accept: "application/vnd.github.v3+json",
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        const listUrl = `https://api.github.com/repos/${repo}/contents/content/blogs?ref=${branch}`;
        const res = await fetch(listUrl, {
            headers,
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            return null;
        }

        const files = await res.json();
        if (!Array.isArray(files)) return null;

        const mdFiles = files.filter((file: any) => file.name.endsWith(".md"));

        const posts: BlogPost[] = await Promise.all(
            mdFiles.map(async (file: any) => {
                const rawUrl = file.download_url || `https://raw.githubusercontent.com/${repo}/${branch}/${file.path}`;
                const rawRes = await fetch(rawUrl, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                    next: { revalidate: 60 }
                });
                const rawText = await rawRes.text();
                const defaultSlug = file.name.replace(/\.md$/, "");
                return parseFrontmatter(rawText, defaultSlug);
            })
        );

        return posts.length > 0 ? posts : null;
    } catch (e) {
        console.error("Failed to fetch blogs from GitHub API:", e);
        return null;
    }
}

export async function getAllBlogs(): Promise<BlogPost[]> {
    // 1. Try fetching from /api/blogs route (reads local disk content/blogs/ AND GitHub API)
    try {
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const apiRes = await fetch(`${origin}/api/blogs`, { cache: "no-store" });
        if (apiRes.ok) {
            const data = await apiRes.json();
            if (Array.isArray(data) && data.length > 0) {
                return data;
            }
        }
    } catch (e) {
        // Fall back to direct GitHub fetcher
    }

    // 2. Try fetching live from GitHub API directly (content/blogs/ directory)
    const githubPosts = await fetchBlogsFromGitHub();
    if (githubPosts && githubPosts.length > 0) {
        return githubPosts;
    }

    // 3. Dev.to fallback API if configured
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
                    category: item.tag_list?.[0] ? item.tag_list[0].toUpperCase() : "Tech",
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
                    likesCount: item.public_reactions_count || 10
                }));
                return remotePosts;
            }
        } catch (e) {
            console.error("Failed to fetch Dev.to blogs:", e);
        }
    }

    // 4. Fallback to sample static blogs
    return SAMPLE_BLOGS;
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
    const blogs = await getAllBlogs();
    return blogs.find((b) => b.slug === slug) || null;
}

