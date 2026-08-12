"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBlogBySlug } from "@/lib/blogs";
import { BlogPost } from "@/lib/types/blog";
import { BlogNavbar } from "@/components/blog/BlogNavbar";
import { Toast } from "@/components/blog/Toast";
import { MarkdownRenderer } from "@/components/blog/MarkdownRenderer";
import {
    ArrowLeftIcon,
    HeartIcon,
    BookmarkIcon,
    ShareNetworkIcon,
    ClockIcon,
    GithubLogoIcon,
    TwitterLogoIcon,
} from "@phosphor-icons/react";

export default function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);

    // TanStack Query for fetching and caching single article detail
    const { data: post, isLoading } = useQuery<BlogPost | null>({
        queryKey: ["blog", slug],
        queryFn: () => getBlogBySlug(slug),
        staleTime: 1000 * 60 * 5,
    });

    const [isSaved, setIsSaved] = useState(false);
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        if (post) {
            setLikes(post.likesCount);

            // Check saved status
            const storedSaved = localStorage.getItem("saved_blogs");
            if (storedSaved) {
                try {
                    const savedIds: string[] = JSON.parse(storedSaved);
                    if (savedIds.includes(post.id)) setIsSaved(true);
                } catch (e) {
                    console.error(e);
                }
            }

            // Check liked status
            const likedStatus = localStorage.getItem(`liked_post_${post.id}`);
            if (likedStatus === "true") setHasLiked(true);
        }
    }, [post]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-main flex items-center justify-center text-muted font-mono">
                Loading article with TanStack Query...
            </div>
        );
    }

    if (!post) {
        notFound();
    }

    const handleToggleSave = () => {
        const storedSaved = localStorage.getItem("saved_blogs");
        let savedIds: string[] = storedSaved ? JSON.parse(storedSaved) : [];

        if (isSaved) {
            savedIds = savedIds.filter((id) => id !== post.id);
            setIsSaved(false);
            showToast("Article removed from Saved");
        } else {
            savedIds.push(post.id);
            setIsSaved(true);
            showToast("Article saved to Bookmarks!");
        }
        localStorage.setItem("saved_blogs", JSON.stringify(savedIds));
    };

    const handleLikeToggle = () => {
        if (hasLiked) {
            setLikes((prev) => prev - 1);
            setHasLiked(false);
            localStorage.setItem(`liked_post_${post.id}`, "false");
        } else {
            setLikes((prev) => prev + 1);
            setHasLiked(true);
            localStorage.setItem(`liked_post_${post.id}`, "true");
        }
    };

    const handleShareLink = () => {
        navigator.clipboard.writeText(window.location.href);
        showToast("Direct article link copied to clipboard!");
    };

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    return (
        <div className="min-h-screen bg-main text-foreground transition-colors duration-300 relative pb-20">
            {/* Ambient Noise */}
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

                {/* Back to Blog Link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent transition-colors duration-200 mb-6 group"
                >
                    <ArrowLeftIcon size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
                    <span>Back to all articles</span>
                </Link>

                {/* Compact Compressed Header Section */}
                <header className="mb-6 bg-surface/70 border border-dashed border-border rounded-3xl p-5 sm:p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        {/* Left Column: Title, Category, Author */}
                        <div className="flex-1 min-w-0">
                            {/* Category & Meta */}
                            <div className="flex items-center gap-3 text-xs text-muted font-mono mb-2.5">
                                <span className="px-2.5 py-0.5 rounded-full bg-accent/15 text-accent font-semibold border border-dashed border-accent/40">
                                    {post.category}
                                </span>
                                <span>{post.publishedAt}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    <ClockIcon size={14} />
                                    {post.readTime}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-tight mb-3">
                                {post.title}
                            </h1>

                            {/* Inline Author Profile Row */}
                            <div className="flex items-center gap-3 pt-2 border-t border-dashed border-border/60">
                                {post.author.avatar ? (
                                    <Image
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full border border-dashed border-accent/50 object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-xs">
                                        {post.author.name.charAt(0)}
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-foreground truncate">{post.author.name}</p>
                                    {post.author.role && <p className="text-[11px] text-muted truncate">{post.author.role}</p>}
                                </div>
                                {/* Social Links */}
                                <div className="flex items-center gap-1">
                                    {post.author.github && (
                                        <a href={post.author.github} target="_blank" rel="noopener noreferrer" className="p-1 text-muted hover:text-foreground">
                                            <GithubLogoIcon size={18} />
                                        </a>
                                    )}
                                    {post.author.twitter && (
                                        <a href={post.author.twitter} target="_blank" rel="noopener noreferrer" className="p-1 text-muted hover:text-foreground">
                                            <TwitterLogoIcon size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Compact Cover Image Thumbnail */}
                        {post.coverImage && (
                            <div className="relative w-full md:w-52 h-36 md:h-32 rounded-2xl overflow-hidden border border-dashed border-border shrink-0 shadow-sm">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </header>

                {/* Main Article Body */}
                <article className="max-w-none text-foreground leading-relaxed space-y-6">
                    <div className="text-lg font-medium text-muted border-l-4 border-accent pl-4 py-1 italic mb-8">
                        {post.summary}
                    </div>

                    <MarkdownRenderer content={post.content} bodyHtml={post.bodyHtml} />
                </article>

                {/* Interactive Actions Footer Bar */}
                <div className="my-12 p-6 rounded-3xl bg-surface border border-dashed border-border flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleLikeToggle}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium border border-dashed transition-all duration-200 cursor-pointer ${
                                hasLiked
                                    ? "bg-rose-500/15 text-rose-500 border-rose-500/40"
                                    : "bg-main/60 text-muted hover:text-rose-500 border-border"
                            }`}
                        >
                            <HeartIcon size={20} weight={hasLiked ? "fill" : "regular"} />
                            <span>{likes} Likes</span>
                        </button>

                        <button
                            onClick={handleToggleSave}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium border border-dashed transition-all duration-200 cursor-pointer ${
                                isSaved
                                    ? "bg-accent/15 text-accent border-accent/40"
                                    : "bg-main/60 text-muted hover:text-accent border-border"
                            }`}
                        >
                            <BookmarkIcon size={20} weight={isSaved ? "fill" : "regular"} />
                            <span>{isSaved ? "Saved" : "Save Article"}</span>
                        </button>
                    </div>

                    <button
                        onClick={handleShareLink}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-medium hover:scale-[1.02] active:scale-100 transition-all duration-200 cursor-pointer border border-dashed border-white/20 shadow-sm"
                    >
                        <ShareNetworkIcon size={20} />
                        <span>Send / Copy Link</span>
                    </button>
                </div>
            </div>

            <Toast message={toastMessage} />
        </div>
    );
}
