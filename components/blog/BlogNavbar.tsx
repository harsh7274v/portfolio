"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeftIcon, CircleHalfTiltIcon, MagnifyingGlassIcon, XCircleIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

interface BlogNavbarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    debounceMs?: number;
}

export function BlogNavbar({ searchQuery, onSearchChange, debounceMs = 300 }: BlogNavbarProps) {
    const { setTheme, resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    // Local input state for instantaneous visual feedback while typing
    const [inputValue, setInputValue] = useState(searchQuery);

    // Sync input value if parent searchQuery changes externally
    useEffect(() => {
        setInputValue(searchQuery);
    }, [searchQuery]);

    // Debounce logic: emit search change only after user stops typing for debounceMs
    useEffect(() => {
        const handler = setTimeout(() => {
            onSearchChange(inputValue);
        }, debounceMs);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, debounceMs, onSearchChange]);

    const handleClear = () => {
        setInputValue("");
        onSearchChange("");
    };

    return (
        <header className="sticky top-4 z-40 w-full mb-8">
            <div className="bg-surface/90 backdrop-blur-md border border-dashed border-border rounded-3xl px-5 py-3.5 flex items-center justify-between gap-4 transition-colors duration-200">
                {/* Back to Portfolio Link */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors duration-100 group shrink-0"
                >
                    <ArrowLeftIcon size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
                    <span>Portfolio</span>
                </Link>

                {/* Debounced Search Bar */}
                <div className="relative flex-1 max-w-md mx-2">
                    <MagnifyingGlassIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search articles by title, tag, or topic..."
                        className="w-full bg-main/60 text-foreground placeholder:text-muted/70 text-sm rounded-xl pl-10 pr-9 py-2 border border-dashed border-border/70 focus:outline-none focus:border-accent transition-all duration-200"
                    />
                    {inputValue.length > 0 && (
                        <button
                            onClick={handleClear}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors cursor-pointer"
                        >
                            <XCircleIcon size={18} />
                        </button>
                    )}
                </div>

                {/* Actions: Theme Switcher */}
                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        aria-label="Toggle Theme"
                        className="h-9 w-9 rounded-full bg-main/70 border border-dashed border-border flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200 text-foreground"
                    >
                        <CircleHalfTiltIcon size={20} className="rotate-[-45deg]" />
                    </button>
                </div>
            </div>
        </header>
    );
}
