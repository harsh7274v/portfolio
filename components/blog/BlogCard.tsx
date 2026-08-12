"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/types/blog";
import { HeartIcon, BookmarkIcon, ShareNetworkIcon, ClockIcon } from "@phosphor-icons/react";

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
        <article className="group relative bg-surface border border-dashed border-border rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 shadow-sm">
            {/* Background Noise Overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-15"
                style={{
                    backgroundImage: "url('/Noise.jpg')",
                    backgroundRepeat: "repeat",
                }}
            />

            {/* Cover Image Header */}
            <Link href={`/blog/${post.slug}`} className="relative h-48 w-full overflow-hidden block">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md border border-dashed border-border px-3 py-1 rounded-full text-xs font-semibold text-accent">
                    {post.category}
                </div>
            </Link>

            {/* Main Content Area */}
            <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
                <div>
                    {/* Read Time & Date */}
                    <div className="flex items-center gap-3 text-xs text-muted mb-3 font-mono">
                        <span>{post.publishedAt}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <ClockIcon size={14} />
                            {post.readTime}
                        </span>
                    </div>

                    {/* Title */}
                    <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-200 line-clamp-2 mb-2">
                            {post.title}
                        </h2>
                    </Link>

                    {/* Summary Excerpt */}
                    <p className="text-muted text-sm line-clamp-3 leading-relaxed mb-6">
                        {post.summary}
                    </p>
                </div>

                {/* Footer Section: Author Info & Interactive Actions */}
                <div className="pt-4 border-t border-dashed border-border/70 flex items-center justify-between gap-3">
                    {/* Author Details */}
                    <div className="flex items-center gap-3 min-w-0">
                        {post.author.avatar ? (
                            <Image
                                src={post.author.avatar}
                                alt={post.author.name}
                                width={36}
                                height={36}
                                className="rounded-full border border-dashed border-accent/50 object-cover shrink-0"
                            />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-xs shrink-0">
                                {post.author.name.charAt(0)}
                            </div>
                        )}
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate">
                                {post.author.name}
                            </p>
                            {post.author.role && (
                                <p className="text-[11px] text-muted truncate">
                                    {post.author.role}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Action Icons (Likes, Save, Share) */}
                    <div className="flex items-center gap-2 shrink-0">
                        {/* Like Button */}
                        <button
                            onClick={handleLikeToggle}
                            title={hasLiked ? "Unlike" : "Like"}
                            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-dashed transition-all duration-200 cursor-pointer ${
                                hasLiked
                                    ? "bg-rose-500/10 text-rose-500 border-rose-500/30"
                                    : "bg-main/50 text-muted hover:text-rose-500 border-border"
                            }`}
                        >
                            <HeartIcon size={16} weight={hasLiked ? "fill" : "regular"} />
                            <span>{likes}</span>
                        </button>

                        {/* Save / Bookmark Button */}
                        <button
                            onClick={handleSaveClick}
                            title={isSaved ? "Remove from Saved" : "Save Blog"}
                            className={`p-1.5 rounded-xl border border-dashed transition-all duration-200 cursor-pointer ${
                                isSaved
                                    ? "bg-accent/15 text-accent border-accent/40"
                                    : "bg-main/50 text-muted hover:text-accent border-border"
                            }`}
                        >
                            <BookmarkIcon size={16} weight={isSaved ? "fill" : "regular"} />
                        </button>

                        {/* Generate Link / Share Button */}
                        <button
                            onClick={handleShareClick}
                            title="Copy link to share"
                            className="p-1.5 rounded-xl bg-main/50 text-muted hover:text-foreground border border-dashed border-border transition-all duration-200 cursor-pointer"
                        >
                            <ShareNetworkIcon size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
