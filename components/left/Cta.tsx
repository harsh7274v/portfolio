"use client";
import React from "react";
import { PaperPlaneTiltIcon, ReadCvLogoIcon } from "@phosphor-icons/react";

function Cta() {
    return (
        <div className="mx-4 lg:mx-8 mt-6 mb-2">
            <div className="flex flex-wrap items-center justify-center gap-6">
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
                        px-5 py-3
                        transition-all duration-300
                        hover:scale-[1.02]
                        active:translate-y-0
                        active:shadow-none
                        cursor-pointer
                        relative
                    "
                >
                    {/* Noise Overlay */}
                    <div
                        className="absolute inset-0 rounded-xl pointer-events-none opacity-10"
                        style={{
                            backgroundImage: "url('/Noise.jpg')",
                            backgroundRepeat: "repeat",
                        }}
                    />
                    <ReadCvLogoIcon
                        size={24}
                        className="
                            transition-transform
                            duration-300
                            rotate-[-11deg]
                            group-hover:rotate-3
                        "
                    />
                    <span>View Resume</span>
                </a>
                <a
                    href="mailto:harshvardhan7274@gmail.com"
                    className="
                        group
                        flex items-center gap-2
                        rounded-xl
                        border border-dashed
                        bg-cta
                        px-5 py-3
                        transition-all duration-300
                        hover:scale-[1.02]
                        active:translate-y-0
                        active:shadow-none
                        cursor-pointer
                        relative
                    "
                >
                    {/* Noise Overlay */}
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
