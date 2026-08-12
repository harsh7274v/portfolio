"use client";
import React from "react";
import { PaperPlaneTiltIcon, ReadCvLogoIcon, BookBookmarkIcon } from "@phosphor-icons/react";

function Cta() {
    return (
        <div className="mx-4 lg:mx-8 mt-6 mb-2">
            <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                    href="/blog"
                    className="
                        group
                        flex items-center gap-2
                        rounded-xl
                        border border-dashed border-accent/50
                        bg-cta text-accent font-medium
                        px-4 py-2.5
                        transition-all duration-300
                        hover:scale-[1.02]
                        active:translate-y-0
                        cursor-pointer
                        relative
                    "
                >
                    <div
                        className="absolute inset-0 rounded-xl pointer-events-none opacity-10"
                        style={{
                            backgroundImage: "url('/Noise.jpg')",
                            backgroundRepeat: "repeat",
                        }}
                    />
                    <BookBookmarkIcon
                        size={20}
                        className="transition-transform duration-300 group-hover:rotate-12"
                    />
                    <span>Read Blog</span>
                </a>
                <a
                    href="/harsh.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        group
                        flex items-center gap-2
                        rounded-xl
                        border border-dashed
                        bg-cta
                        px-4 py-2.5
                        transition-all duration-300
                        hover:scale-[1.02]
                        active:translate-y-0
                        cursor-pointer
                        relative
                    "
                >
                    <div
                        className="absolute inset-0 rounded-xl pointer-events-none opacity-10"
                        style={{
                            backgroundImage: "url('/Noise.jpg')",
                            backgroundRepeat: "repeat",
                        }}
                    />
                    <ReadCvLogoIcon
                        size={20}
                        className="
                            transition-transform
                            duration-300
                            rotate-[-11deg]
                            group-hover:rotate-3
                        "
                    />
                    <span>Resume</span>
                </a>
                <a
                    href="mailto:harshvardhan7274@gmail.com"
                    className="
                        group
                        flex items-center gap-2
                        rounded-xl
                        border border-dashed
                        bg-cta
                        px-4 py-2.5
                        transition-all duration-300
                        hover:scale-[1.02]
                        active:translate-y-0
                        cursor-pointer
                        relative
                    "
                >
                    <div
                        className="absolute inset-0 rounded-xl pointer-events-none opacity-10"
                        style={{
                            backgroundImage: "url('/Noise.jpg')",
                            backgroundRepeat: "repeat",
                        }}
                    />

                    <PaperPlaneTiltIcon
                        size={20}
                        className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                        "
                    />
                    <span>Get in Touch</span>
                </a>
            </div>
        </div>
    );
}

export default Cta;
