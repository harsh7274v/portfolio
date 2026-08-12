import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parseFrontmatter, fetchBlogsFromGitHub, SAMPLE_BLOGS } from "@/lib/blogs";

export async function GET() {
    try {
        // 1. Try reading local content/blogs folder from disk
        const blogsDir = path.join(process.cwd(), "content", "blogs");
        if (fs.existsSync(blogsDir)) {
            const fileNames = fs.readdirSync(blogsDir).filter((file) => file.endsWith(".md"));
            if (fileNames.length > 0) {
                const localPosts = fileNames.map((fileName) => {
                    const filePath = path.join(blogsDir, fileName);
                    const fileContent = fs.readFileSync(filePath, "utf-8");
                    const defaultSlug = fileName.replace(/\.md$/, "");
                    return parseFrontmatter(fileContent, defaultSlug);
                });
                return NextResponse.json(localPosts);
            }
        }

        // 2. Fallback to live fetching from GitHub REST API
        const githubPosts = await fetchBlogsFromGitHub();
        if (githubPosts && githubPosts.length > 0) {
            return NextResponse.json(githubPosts);
        }
    } catch (e) {
        console.error("Error in /api/blogs GET API route:", e);
    }

    return NextResponse.json(SAMPLE_BLOGS);
}

export async function POST(req: Request) {
    try {
        // Admin Security Lock Check
        const authKey = req.headers.get("x-admin-key");
        const expectedKey = process.env.BLOG_ADMIN_KEY || "harsh7274v";

        if (!authKey || authKey.trim() !== expectedKey.trim()) {
            return NextResponse.json(
                { error: "Unauthorized: Invalid or missing Admin Secret Key. Only the site owner can publish posts." },
                { status: 401 }
            );
        }

        const body = await req.json();
        const {
            title,
            summary,
            category = "Tech & AI",
            tags = ["Tech"],
            content = "",
            authorName = "Harsh Vardhan Prasad",
            authorRole = "Fullstack & AI Engineer",
            coverImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        } = body;

        if (!title || !summary || !content) {
            return NextResponse.json(
                { error: "Title, summary, and content are required fields." },
                { status: 400 }
            );
        }

        // Generate clean slug from title
        const baseSlug = title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        const slug = baseSlug || `post-${Date.now()}`;

        // Process tags array
        const tagList = Array.isArray(tags)
            ? tags
            : String(tags)
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean);

        // Estimate reading time based on word count
        const wordCount = content.trim().split(/\s+/).length;
        const minutes = Math.max(1, Math.ceil(wordCount / 200));
        const readTime = `${minutes} min read`;

        const publishedAt = new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

        // Format frontmatter content
        const fileData = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
summary: "${summary.replace(/"/g, '\\"')}"
category: "${category}"
tags: ${JSON.stringify(tagList)}
publishedAt: "${publishedAt}"
readTime: "${readTime}"
coverImage: "${coverImage}"
authorName: "${authorName}"
authorAvatar: "https://github.com/harsh7274v.png"
authorRole: "${authorRole}"
authorGithub: "https://github.com/harsh7274v"
likesCount: 15
---

${content.trim()}
`;

        const blogsDir = path.join(process.cwd(), "content", "blogs");
        if (!fs.existsSync(blogsDir)) {
            fs.mkdirSync(blogsDir, { recursive: true });
        }

        const filePath = path.join(blogsDir, `${slug}.md`);
        fs.writeFileSync(filePath, fileData, "utf-8");

        const newPost = parseFrontmatter(fileData, slug);

        return NextResponse.json({
            success: true,
            slug,
            post: newPost,
            message: "Blog post published successfully!",
        });
    } catch (e: any) {
        console.error("Error in /api/blogs POST API route:", e);
        return NextResponse.json(
            { error: e.message || "Failed to publish blog post." },
            { status: 500 }
        );
    }
}
