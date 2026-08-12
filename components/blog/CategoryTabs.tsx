"use client";

import React, { useState, useRef, useEffect } from "react";
import { Category } from "@/lib/types/blog";
import { BookmarkIcon, CaretDownIcon, TagIcon } from "@phosphor-icons/react";

interface CategoryTabsProps {
    categories: Category[];
    selectedCategory: string;
    onSelectCategory: (categoryId: string) => void;
}

export function CategoryTabs({
    categories,
    selectedCategory,
    onSelectCategory,
}: CategoryTabsProps) {
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowMoreMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Separate Pinned tabs ("all", "saved") and Tag tabs
    const allTab = categories.find((c) => c.id === "all");
    const savedTab = categories.find((c) => c.id === "saved");
    
    // Sort remaining tag categories by article count descending
    const tagCategories = categories
        .filter((c) => c.id !== "all" && c.id !== "saved")
        .sort((a, b) => b.count - a.count);

    // Show top 5 tags directly on the bar, remaining in the dropdown menu
    const visibleTags = tagCategories.slice(0, 5);
    const hiddenTags = tagCategories.slice(5);

    // Check if current selected category is one of the hidden dropdown tags
    const activeHiddenTag = hiddenTags.find((c) => c.id === selectedCategory);

    return (
        <div className="w-full my-4">
            <div className="flex items-center gap-2 flex-wrap">
                {/* 1. "All" Tab */}
                {allTab && (
                    <button
                        onClick={() => onSelectCategory(allTab.id)}
                        className={`
                            flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border border-dashed shrink-0
                            ${
                                selectedCategory === allTab.id
                                    ? "bg-accent text-white border-accent shadow-sm"
                                    : "bg-surface/80 text-muted hover:text-foreground hover:bg-surface border-border"
                            }
                        `}
                    >
                        <span>All</span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${selectedCategory === allTab.id ? "bg-white/20 text-white" : "bg-accent/10 text-accent"}`}>
                            {allTab.count}
                        </span>
                    </button>
                )}

                {/* 2. Top Visible Tags */}
                {visibleTags.map((cat) => {
                    const isSelected = selectedCategory === cat.id;

                    return (
                        <button
                            key={cat.id}
                            onClick={() => onSelectCategory(cat.id)}
                            className={`
                                flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border border-dashed shrink-0
                                ${
                                    isSelected
                                        ? "bg-accent text-white border-accent shadow-sm"
                                        : "bg-surface/80 text-muted hover:text-foreground hover:bg-surface border-border"
                                }
                            `}
                        >
                            <span>{cat.name}</span>
                            <span
                                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    isSelected ? "bg-white/20 text-white" : "bg-accent/10 text-accent"
                                }`}
                            >
                                {cat.count}
                            </span>
                        </button>
                    );
                })}

                {/* 3. "More Tags" Dropdown Menu (If > 5 tags) */}
                {hiddenTags.length > 0 && (
                    <div className="relative shrink-0" ref={dropdownRef}>
                        <button
                            onClick={() => setShowMoreMenu((prev) => !prev)}
                            className={`
                                flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border border-dashed
                                ${
                                    activeHiddenTag
                                        ? "bg-accent text-white border-accent shadow-sm"
                                        : "bg-surface/80 text-muted hover:text-foreground border-border"
                                }
                            `}
                        >
                            <TagIcon size={14} />
                            <span>{activeHiddenTag ? activeHiddenTag.name : `More Tags (${hiddenTags.length})`}</span>
                            <CaretDownIcon size={12} className={`transition-transform duration-200 ${showMoreMenu ? "rotate-180" : ""}`} />
                        </button>

                        {/* Dropdown Menu Items */}
                        {showMoreMenu && (
                            <div className="absolute left-0 mt-2 w-48 bg-surface border border-dashed border-border rounded-2xl p-1.5 shadow-xl z-50 max-h-60 overflow-y-auto no-scrollbar">
                                {hiddenTags.map((cat) => {
                                    const isSelected = selectedCategory === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => {
                                                onSelectCategory(cat.id);
                                                setShowMoreMenu(false);
                                            }}
                                            className={`
                                                w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors duration-150 cursor-pointer mb-0.5
                                                ${
                                                    isSelected
                                                        ? "bg-accent/15 text-accent font-bold"
                                                        : "text-muted hover:text-foreground hover:bg-main/60"
                                                }
                                            `}
                                        >
                                            <span className="truncate">{cat.name}</span>
                                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-semibold ml-2">
                                                {cat.count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {/* 4. "Saved" Tab */}
                {savedTab && (
                    <button
                        onClick={() => onSelectCategory(savedTab.id)}
                        className={`
                            flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border border-dashed shrink-0 ml-auto
                            ${
                                selectedCategory === savedTab.id
                                    ? "bg-accent text-white border-accent shadow-sm"
                                    : "bg-surface/80 text-muted hover:text-foreground hover:bg-surface border-border"
                            }
                        `}
                    >
                        <BookmarkIcon size={14} weight={selectedCategory === savedTab.id ? "fill" : "regular"} />
                        <span>Saved</span>
                        {savedTab.count > 0 && (
                            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${selectedCategory === savedTab.id ? "bg-white/20 text-white" : "bg-accent/10 text-accent"}`}>
                                {savedTab.count}
                            </span>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
