import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parseFrontmatter, fetchBlogsFromGitHub, SAMPLE_BLOGS } from "@/lib/blogs";

export async function GET() {
    try {
        const postsMap = new Map<string, any>();

        // 1. Try reading local content/blogs folder from disk
        try {
            const blogsDir = path.join(process.cwd(), "content", "blogs");
            if (fs.existsSync(blogsDir)) {
                const fileNames = fs.readdirSync(blogsDir).filter((file) => file.endsWith(".md"));
                fileNames.forEach((fileName) => {
                    const filePath = path.join(blogsDir, fileName);
                    const fileContent = fs.readFileSync(filePath, "utf-8");
                    const defaultSlug = fileName.replace(/\.md$/, "");
                    const post = parseFrontmatter(fileContent, defaultSlug);
                    postsMap.set(post.slug, post);
                });
            }
        } catch (fsErr) {
            console.warn("Could not read local filesystem blogs:", fsErr);
        }

        // 2. Fetch live from GitHub REST API
        const githubPosts = await fetchBlogsFromGitHub();
        if (githubPosts && githubPosts.length > 0) {
            githubPosts.forEach((post) => {
                postsMap.set(post.slug, post);
            });
        }

        const allPosts = Array.from(postsMap.values());
        if (allPosts.length > 0) {
            return NextResponse.json(allPosts);
        }
    } catch (e) {
        console.error("Error in /api/blogs GET API route:", e);
    }

    return NextResponse.json(SAMPLE_BLOGS);
}

/**
 * Commits a new or updated blog post markdown file directly to GitHub repo via REST API.
 * Solves read-only filesystem (EROFS) limitations in serverless environments like Vercel.
 */
async function commitBlogToGitHub(
    slug: string,
    fileData: string,
    title: string
): Promise<{ success: boolean; error?: string }> {
    const repo = process.env.NEXT_PUBLIC_GITHUB_REPO || "harsh7274v/portfolio";
    const branch = process.env.NEXT_PUBLIC_GITHUB_BRANCH || "main";
    const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

    if (!token) {
        return { success: false, error: "GITHUB_TOKEN environment variable is not configured." };
    }

    try {
        const fileUrl = `https://api.github.com/repos/${repo}/contents/content/blogs/${slug}.md`;
        const headers: Record<string, string> = {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
            "User-Agent": "Portfolio-App",
        };

        // Check if file already exists on GitHub to obtain blob sha for update
        let sha: string | undefined = undefined;
        try {
            const checkRes = await fetch(`${fileUrl}?ref=${branch}`, { headers, cache: "no-store" });
            if (checkRes.ok) {
                const existingFile = await checkRes.json();
                sha = existingFile.sha;
            }
        } catch {
            // New file creation
        }

        const commitBody: Record<string, any> = {
            message: `feat(blog): publish post "${title}"`,
            content: Buffer.from(fileData).toString("base64"),
            branch,
        };
        if (sha) {
            commitBody.sha = sha;
        }

        const putRes = await fetch(fileUrl, {
            method: "PUT",
            headers,
            body: JSON.stringify(commitBody),
        });

        if (putRes.ok) {
            return { success: true };
        }

        const errJson = await putRes.json();
        console.error("GitHub API commit error response:", errJson);
        return { success: false, error: errJson.message || "Failed to commit file to GitHub API." };
    } catch (e: any) {
        console.error("Error committing blog post to GitHub API:", e);
        return { success: false, error: e.message || "GitHub API network error." };
    }
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

        let publishedViaGithub = false;
        let githubError: string | undefined = undefined;

        const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        if (token) {
            const ghResult = await commitBlogToGitHub(slug, fileData, title);
            if (ghResult.success) {
                publishedViaGithub = true;
            } else {
                githubError = ghResult.error;
            }
        }

        // Try writing to local disk (works in local dev; fails gracefully on serverless EROFS)
        let fsWritten = false;
        try {
            const blogsDir = path.join(process.cwd(), "content", "blogs");
            if (!fs.existsSync(blogsDir)) {
                fs.mkdirSync(blogsDir, { recursive: true });
            }

            const filePath = path.join(blogsDir, `${slug}.md`);
            fs.writeFileSync(filePath, fileData, "utf-8");
            fsWritten = true;
        } catch (fsErr: any) {
            console.warn("Local filesystem write failed (expected in read-only serverless environment):", fsErr.message);
        }

        if (!publishedViaGithub && !fsWritten) {
            const errorMessage = !token
                ? "Serverless deployment filesystem is read-only (EROFS). Please add 'GITHUB_TOKEN' to your Vercel Project Environment Variables to enable automated blog publishing via GitHub API."
                : `Failed to save post: Read-only serverless filesystem (EROFS) and GitHub commit failed (${githubError || "Unknown error"}).`;

            return NextResponse.json(
                { error: errorMessage },
                { status: 500 }
            );
        }

        const newPost = parseFrontmatter(fileData, slug);

        return NextResponse.json({
            success: true,
            slug,
            post: newPost,
            message: publishedViaGithub
                ? "Blog post published and committed to GitHub repository successfully!"
                : "Blog post published successfully!",
        });
    } catch (e: any) {
        console.error("Error in /api/blogs POST API route:", e);
        return NextResponse.json(
            { error: e.message || "Failed to publish blog post." },
            { status: 500 }
        );
    }
}
