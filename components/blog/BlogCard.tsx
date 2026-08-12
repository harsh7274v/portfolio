"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/types/blog";
import { HeartIcon, BookmarkIcon, ShareNetworkIcon, ClockIcon, ArrowRightIcon } from "@phosphor-icons/react";

interface BlogCardProps {
    post: BlogPost;
    isSaved: boolean;
    onToggleSave: (postId: string) => void;
    onShare: (postTitle: string, slug: string) => void;
}

export function BlogCard({ post, isSaved, onToggleSave, onShare }: BlogCardProps) {
    const [likes, setLikes] = useState(post.likesCount);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        const likedStatus = localStorage.getItem(`liked_post_${post.id}`);
        if (likedStatus === "true") {
            setHasLiked(true);
        }
    }, [post.id]);

    const handleLikeToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

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

    const handleSaveClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleSave(post.id);
    };

    const handleShareClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onShare(post.title, post.slug);
    };

    return (
        <article className="group relative bg-surface/70 hover:bg-surface border border-dashed border-border rounded-3xl p-5 sm:p-7 flex flex-col justify-between gap-4 transition-all duration-300 hover:border-accent/50 shadow-sm overflow-hidden">
            {/* Background Noise Overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-15"
                style={{
                    backgroundImage: "url('/Noise.jpg')",
                    backgroundRepeat: "repeat",
                }}
            />

            {/* Header Meta: Category, Date, Read Time, and Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted font-mono relative z-10">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/15 text-accent font-semibold border border-dashed border-accent/30">
                        {post.category}
                    </span>
                    <span>{post.publishedAt}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <ClockIcon size={14} />
                        {post.readTime}
                    </span>
                </div>

                {/* Quick Action Icons */}
                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={handleLikeToggle}
                        title={hasLiked ? "Unlike" : "Like"}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium border border-dashed transition-all duration-200 cursor-pointer ${
                            hasLiked
                                ? "bg-rose-500/10 text-rose-500 border-rose-500/30"
                                : "bg-main/60 text-muted hover:text-rose-500 border-border"
                        }`}
                    >
                        <HeartIcon size={15} weight={hasLiked ? "fill" : "regular"} />
                        <span>{likes}</span>
                    </button>

                    <button
                        onClick={handleSaveClick}
                        title={isSaved ? "Remove from Saved" : "Save Blog"}
                        className={`p-1.5 rounded-xl border border-dashed transition-all duration-200 cursor-pointer ${
                            isSaved
                                ? "bg-accent/15 text-accent border-accent/40"
                                : "bg-main/60 text-muted hover:text-accent border-border"
                        }`}
                    >
                        <BookmarkIcon size={15} weight={isSaved ? "fill" : "regular"} />
                    </button>

                    <button
                        onClick={handleShareClick}
                        title="Copy article link"
                        className="p-1.5 rounded-xl bg-main/60 text-muted hover:text-foreground border border-dashed border-border transition-all duration-200 cursor-pointer"
                    >
                        <ShareNetworkIcon size={15} />
                    </button>
                </div>
            </div>

            {/* Main Title & Summary Excerpt */}
            <div className="space-y-2 relative z-10">
                <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-200 leading-snug">
                        {post.title}
                    </h2>
                </Link>

                <p className="text-muted text-sm sm:text-base leading-relaxed line-clamp-3">
                    {post.summary}
                </p>
            </div>

            {/* Read Article Action Link */}
            <div className="pt-2 flex items-center justify-between border-t border-dashed border-border/50 relative z-10">
                <div className="flex items-center gap-2">
                    {post.author.avatar ? (
                        <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-5 h-5 rounded-full border border-dashed border-accent/50 object-cover"
                        />
                    ) : null}
                    <span className="text-xs text-muted font-medium">{post.author.name}</span>
                </div>

                <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-accent hover:text-accent/80 transition-all duration-200 group/link cursor-pointer"
                >
                    <span>Read article</span>
                    <ArrowRightIcon size={15} className="transition-transform duration-200 group-hover/link:translate-x-1" />
                </Link>
            </div>
        </article>
    );
}
