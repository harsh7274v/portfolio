"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogNavbar } from "@/components/blog/BlogNavbar";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import { Toast } from "@/components/blog/Toast";
import {
    ArrowLeftIcon,
    PencilIcon,
    EyeIcon,
    PaperPlaneRightIcon,
    SparkleIcon,
    TagIcon,
    FolderIcon,
    ArticleIcon,
    UserIcon,
    ImageIcon,
    LockKeyIcon,
    KeyIcon,
    ShieldCheckIcon,
} from "@phosphor-icons/react";

export default function CreateBlogPostPage() {
    const router = useRouter();

    const [adminKey, setAdminKey] = useState("");
    const [passcodeInput, setPasscodeInput] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Tech & AI");
    const [tags, setTags] = useState("Next.js, React, Web Dev");
    const [summary, setSummary] = useState("");
    const [coverImage, setCoverImage] = useState(
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
    );
    const [authorName, setAuthorName] = useState("Harsh Vardhan Prasad");
    const [content, setContent] = useState(
        `### Introduction\n\nWrite your article content here in standard markdown...\n\n### Key Architectural Highlights\n\n1. First major point\n2. Second major point\n\n\`\`\`typescript\n// Example Code\nconsole.log("Hello, World!");\n\`\`\``
    );

    const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Check existing authentication token in sessionStorage on load
    useEffect(() => {
        const storedKey = sessionStorage.getItem("blog_admin_key");
        if (storedKey) {
            setAdminKey(storedKey);
            setIsAuthenticated(true);
        }
    }, []);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError(null);

        if (!passcodeInput.trim()) {
            setAuthError("Please enter your Admin Secret Key.");
            return;
        }

        sessionStorage.setItem("blog_admin_key", passcodeInput.trim());
        setAdminKey(passcodeInput.trim());
        setIsAuthenticated(true);
    };

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);

        if (!title.trim()) {
            setErrorMsg("Article title is required.");
            return;
        }

        if (!summary.trim()) {
            setErrorMsg("Summary excerpt is required.");
            return;
        }

        if (!content.trim()) {
            setErrorMsg("Article content cannot be empty.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-key": adminKey,
                },
                body: JSON.stringify({
                    title: title.trim(),
                    summary: summary.trim(),
                    category,
                    tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
                    content: content.trim(),
                    coverImage: coverImage.trim(),
                    authorName: authorName.trim(),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 401) {
                    sessionStorage.removeItem("blog_admin_key");
                    setIsAuthenticated(false);
                    setAuthError("Invalid Admin Secret Key. Access denied.");
                    throw new Error("Invalid Admin Secret Key.");
                }
                throw new Error(data.error || "Failed to publish article.");
            }

            showToast("🎉 Blog post published successfully!");
            setTimeout(() => {
                router.push(`/blog/${data.slug}`);
            }, 1200);
        } catch (err: any) {
            console.error(err);
            setErrorMsg(err.message || "Something went wrong while publishing.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-main text-foreground transition-colors duration-300 relative pb-24">
            {/* Background Ambient Noise */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `url("/Noise.jpg")`,
                    backgroundRepeat: "repeat",
                }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
                {/* Navbar */}
                <BlogNavbar searchQuery="" onSearchChange={() => {}} />

                {/* Back to Blog */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent transition-colors duration-200 mb-6 group cursor-pointer"
                >
                    <ArrowLeftIcon size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
                    <span>Back to all articles</span>
                </Link>

                {/* Lock Screen Modal if Not Authenticated */}
                {!isAuthenticated ? (
                    <div className="max-w-md mx-auto my-12 bg-surface border border-dashed border-border rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6">
                        <div className="w-16 h-16 rounded-full bg-accent/15 text-accent border border-dashed border-accent/40 flex items-center justify-center mx-auto shadow-sm">
                            <LockKeyIcon size={32} />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
                                Admin Access Lock
                            </h2>
                            <p className="text-xs sm:text-sm text-muted leading-relaxed">
                                Only the portfolio owner can publish new blog posts. Please enter your Admin Secret Key to continue.
                            </p>
                        </div>

                        {authError && (
                            <div className="p-3 rounded-2xl bg-rose-500/10 border border-dashed border-rose-500/40 text-rose-500 text-xs font-medium">
                                ⚠️ {authError}
                            </div>
                        )}

                        <form onSubmit={handleUnlock} className="space-y-4">
                            <div className="relative">
                                <KeyIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                                <input
                                    type="password"
                                    value={passcodeInput}
                                    onChange={(e) => setPasscodeInput(e.target.value)}
                                    placeholder="Enter Admin Secret Key..."
                                    className="w-full bg-main/80 text-foreground placeholder:text-muted/60 text-sm rounded-2xl pl-10 pr-4 py-3 border border-dashed border-border focus:outline-none focus:border-accent transition-colors duration-200"
                                    autoFocus
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 rounded-2xl bg-accent text-white text-sm font-semibold hover:scale-[1.02] active:scale-100 transition-all duration-200 shadow-md cursor-pointer border border-dashed border-white/20 flex items-center justify-center gap-2"
                            >
                                <ShieldCheckIcon size={18} />
                                <span>Unlock Publisher</span>
                            </button>
                        </form>
                    </div>
                ) : (
                    <>
                        {/* Page Header */}
                        <div className="mb-8 bg-surface/70 border border-dashed border-border rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold border border-dashed border-accent/40 mb-3">
                                    <SparkleIcon size={14} />
                                    <span>Interactive Blog Publisher</span>
                                </div>
                                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-1">
                                    Create & Publish Article
                                </h1>
                                <p className="text-muted text-xs sm:text-sm">
                                    Only authenticated admin can publish posts directly to the website.
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    sessionStorage.removeItem("blog_admin_key");
                                    setIsAuthenticated(false);
                                }}
                                className="text-xs font-semibold text-muted hover:text-rose-500 transition-colors self-start sm:self-center cursor-pointer border border-dashed border-border px-3 py-1.5 rounded-xl bg-main/50"
                            >
                                🔒 Lock Session
                            </button>
                        </div>

                        {/* Error Banner */}
                        {errorMsg && (
                            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-dashed border-rose-500/40 text-rose-500 text-sm font-medium">
                                ⚠️ {errorMsg}
                            </div>
                        )}

                        {/* Main Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* 1. Article Title */}
                            <div className="bg-surface/70 border border-dashed border-border rounded-3xl p-5 sm:p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2 flex items-center gap-1.5">
                                        <ArticleIcon size={16} className="text-accent" />
                                        <span>Article Title *</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g., Mastering Next.js 16 Server Components & Edge Caching"
                                        className="w-full bg-main/70 border border-dashed border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent text-base sm:text-lg font-semibold transition-colors duration-200"
                                        required
                                    />
                                </div>

                                {/* Category & Tags Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2 flex items-center gap-1.5">
                                            <FolderIcon size={16} className="text-accent" />
                                            <span>Category</span>
                                        </label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full bg-main/70 border border-dashed border-border rounded-2xl px-4 py-3 text-foreground focus:outline-none focus:border-accent text-sm font-medium cursor-pointer transition-colors duration-200"
                                        >
                                            <option value="Tech & AI">Tech & AI</option>
                                            <option value="Web Dev">Web Dev</option>
                                            <option value="System Design">System Design</option>
                                            <option value="Tutorials">Tutorials</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2 flex items-center gap-1.5">
                                            <TagIcon size={16} className="text-accent" />
                                            <span>Tags (Comma separated)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={tags}
                                            onChange={(e) => setTags(e.target.value)}
                                            placeholder="Next.js, React, AI, TypeScript"
                                            className="w-full bg-main/70 border border-dashed border-border rounded-2xl px-4 py-3 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent text-sm font-medium transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Summary Excerpt */}
                                <div className="pt-2">
                                    <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2">
                                        Article Summary (Displayed on list page) *
                                    </label>
                                    <textarea
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                        rows={2}
                                        placeholder="A brief 1-2 sentence overview of your article..."
                                        className="w-full bg-main/70 border border-dashed border-border rounded-2xl p-4 text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent text-sm leading-relaxed transition-colors duration-200"
                                        required
                                    />
                                </div>

                                {/* Author & Cover Image URL Row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2 flex items-center gap-1.5">
                                            <UserIcon size={16} className="text-accent" />
                                            <span>Author Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={authorName}
                                            onChange={(e) => setAuthorName(e.target.value)}
                                            className="w-full bg-main/70 border border-dashed border-border rounded-2xl px-4 py-3 text-foreground text-sm font-medium focus:outline-none focus:border-accent transition-colors duration-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-muted mb-2 flex items-center gap-1.5">
                                            <ImageIcon size={16} className="text-accent" />
                                            <span>Cover Image URL (Optional)</span>
                                        </label>
                                        <input
                                            type="url"
                                            value={coverImage}
                                            onChange={(e) => setCoverImage(e.target.value)}
                                            placeholder="https://images.unsplash.com/..."
                                            className="w-full bg-main/70 border border-dashed border-border rounded-2xl px-4 py-3 text-foreground text-sm font-medium focus:outline-none focus:border-accent transition-colors duration-200"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 2. Content Editor with Write / Preview Tabs */}
                            <div className="bg-surface/70 border border-dashed border-border rounded-3xl p-5 sm:p-6 space-y-4">
                                <div className="flex items-center justify-between border-b border-dashed border-border pb-3">
                                    <label className="text-xs font-mono uppercase tracking-wider text-muted font-bold">
                                        Article Content (Markdown)
                                    </label>

                                    {/* Write vs Preview Tabs */}
                                    <div className="flex items-center gap-1 bg-main/80 p-1 rounded-xl border border-dashed border-border">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("write")}
                                            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                                activeTab === "write"
                                                    ? "bg-accent text-white shadow-sm"
                                                    : "text-muted hover:text-foreground"
                                            }`}
                                        >
                                            <PencilIcon size={14} />
                                            <span>Write</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("preview")}
                                            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                                activeTab === "preview"
                                                    ? "bg-accent text-white shadow-sm"
                                                    : "text-muted hover:text-foreground"
                                            }`}
                                        >
                                            <EyeIcon size={14} />
                                            <span>Live Preview</span>
                                        </button>
                                    </div>
                                </div>

                                {activeTab === "write" ? (
                                    <div>
                                        <textarea
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            rows={14}
                                            placeholder="Write your article in Markdown syntax..."
                                            className="w-full bg-main/80 border border-dashed border-border rounded-2xl p-4 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors duration-200"
                                            required
                                        />
                                        <p className="text-xs text-muted font-mono mt-2">
                                            💡 Supports Markdown formatting: `# Heading 1`, `## Heading 2`, `### Heading 3`, `**bold**`, `- list item`, `\`\`\`typescript code blocks\`\`\``.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="bg-main/60 border border-dashed border-border rounded-2xl p-6 min-h-[350px]">
                                        <MarkdownRenderer content={content} />
                                    </div>
                                )}
                            </div>

                            {/* 3. Submit Action Bar */}
                            <div className="flex items-center justify-end gap-4 pt-2">
                                <Link
                                    href="/blog"
                                    className="px-5 py-3 rounded-2xl border border-dashed border-border text-muted hover:text-foreground text-sm font-semibold transition-colors duration-200 cursor-pointer"
                                >
                                    Cancel
                                </Link>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-accent text-white font-semibold hover:scale-[1.02] active:scale-100 transition-all duration-200 cursor-pointer disabled:opacity-50 shadow-md border border-dashed border-white/20"
                                >
                                    <PaperPlaneRightIcon size={18} />
                                    <span>{isSubmitting ? "Publishing Article..." : "Publish Article"}</span>
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>

            <Toast message={toastMessage} />
        </div>
    );
}
