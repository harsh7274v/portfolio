"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BlogPost, Category } from "@/lib/types/blog";
import { getAllBlogs } from "@/lib/blogs";
import { BlogNavbar } from "@/components/blog/BlogNavbar";
import { CategoryTabs } from "@/components/blog/CategoryTabs";
import { BlogCard } from "@/components/blog/BlogCard";
import { Toast } from "@/components/blog/Toast";
import { BookBookmarkIcon } from "@phosphor-icons/react";

export default function BlogHubPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [savedBlogIds, setSavedBlogIds] = useState<string[]>([]);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // TanStack Query for caching and managing blog posts data state
    const { data: blogs = [], isLoading } = useQuery<BlogPost[]>({
        queryKey: ["blogs"],
        queryFn: () => getAllBlogs(),
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    // Load saved posts from localStorage
    useEffect(() => {
        const storedSaved = localStorage.getItem("saved_blogs");
        if (storedSaved) {
            try {
                setSavedBlogIds(JSON.parse(storedSaved));
            } catch (e) {
                console.error("Failed to parse saved_blogs from localStorage", e);
            }
        }
    }, []);

    // Construct Category interface objects dynamically with article counts
    const categories: Category[] = useMemo(() => {
        const tagCounts = new Map<string, number>();

        blogs.forEach((post) => {
            const tags = new Set<string>();
            if (post.category) tags.add(post.category.toLowerCase());
            if (Array.isArray(post.tags)) {
                post.tags.forEach((t) => {
                    if (t) tags.add(t.toLowerCase());
                });
            }

            tags.forEach((t) => {
                tagCounts.set(t, (tagCounts.get(t) || 0) + 1);
            });
        });

        const dynamicCats: Category[] = Array.from(tagCounts.entries()).map(([tag, count]) => ({
            id: tag,
            name: tag.startsWith("#") ? tag : `#${tag}`,
            count: count,
        }));

        return [
            { id: "all", name: "All", count: blogs.length },
            ...dynamicCats,
            { id: "saved", name: "Saved", count: savedBlogIds.length },
        ];
    }, [blogs, savedBlogIds]);

    // Toggle saved state
    const handleToggleSave = (postId: string) => {
        let updated: string[];
        if (savedBlogIds.includes(postId)) {
            updated = savedBlogIds.filter((id) => id !== postId);
            showToast("Article removed from Saved");
        } else {
            updated = [...savedBlogIds, postId];
            showToast("Article saved to Bookmarks!");
        }
        setSavedBlogIds(updated);
        localStorage.setItem("saved_blogs", JSON.stringify(updated));
    };

    // Share link generator
    const handleShareLink = (title: string, slug: string) => {
        const fullUrl = `${window.location.origin}/blog/${slug}`;
        navigator.clipboard.writeText(fullUrl);
        showToast(`Link for "${title.slice(0, 25)}..." copied!`);
    };

    // Helper toast display
    const showToast = (message: string) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Filter posts by search query & selected Category interface ID
    const filteredBlogs = useMemo(() => {
        return blogs.filter((post) => {
            // Category filter
            if (selectedCategory === "saved") {
                if (!savedBlogIds.includes(post.id)) return false;
            } else if (selectedCategory !== "all") {
                const targetTag = selectedCategory.toLowerCase();
                const matchesCategory = post.category.toLowerCase() === targetTag;
                const matchesTags = post.tags.some((t) => t.toLowerCase() === targetTag);
                if (!matchesCategory && !matchesTags) return false;
            }

            // Search query filter
            if (searchQuery.trim() !== "") {
                const q = searchQuery.toLowerCase();
                const matchesTitle = post.title.toLowerCase().includes(q);
                const matchesSummary = post.summary.toLowerCase().includes(q);
                const matchesCategory = post.category.toLowerCase().includes(q);
                const matchesTags = post.tags.some((t) => t.toLowerCase().includes(q));
                return matchesTitle || matchesSummary || matchesCategory || matchesTags;
            }

            return true;
        });
    }, [blogs, selectedCategory, searchQuery, savedBlogIds]);

    return (
        <div className="min-h-screen bg-main text-foreground transition-colors duration-300 relative pb-16">
            {/* Ambient noise overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `url("/Noise.jpg")`,
                    backgroundRepeat: "repeat",
                }}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
                {/* Header Navbar */}
                <BlogNavbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

                {/* Hero Header */}
                <section className="my-8 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold border border-dashed border-accent/30 mb-4">
                        <BookBookmarkIcon size={16} />
                        <span>Engineering Insights & Articles</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-3">
                        Thoughts, Architecture & Tutorials
                    </h1>
                    <p className="text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
                        Deep dives into Fullstack Web Development, AI Workflows, System Design, and Modern UI Engineering.
                    </p>
                </section>

                {/* Category Filtering Tabs */}
                <CategoryTabs
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                {/* Loading State or Blog Cards Grid */}
                {isLoading ? (
                    <div className="text-center py-20 bg-surface/40 rounded-3xl border border-dashed border-border mt-6 font-mono text-muted">
                        Can't you wait till i Load something interesting for you
                    </div>
                ) : filteredBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {filteredBlogs.map((post) => (
                            <BlogCard
                                key={post.id}
                                post={post}
                                isSaved={savedBlogIds.includes(post.id)}
                                onToggleSave={handleToggleSave}
                                onShare={handleShareLink}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-surface/50 rounded-3xl border border-dashed border-border mt-6">
                        <p className="text-lg font-semibold text-foreground mb-1">No articles found</p>
                        <p className="text-sm text-muted">
                            {selectedCategory === "saved"
                                ? "You haven't saved any articles yet. Click the bookmark icon on any post to save it!"
                                : "Try clearing your search or selecting a different category tab."}
                        </p>
                    </div>
                )}
            </div>

            {/* Notification Toast */}
            <Toast message={toastMessage} />
        </div>
    );
}
