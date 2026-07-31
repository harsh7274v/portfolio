"use client";
import React from "react";
import { CircleHalfTiltIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

function Initial() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    return (
        <>
            <div className="m-4 lg:m-8 flex justify-between items-center">
                <div className="h-15 w-15 p-2 text-2xl text-foreground border border-1 border-dashed rounded-full  flex justify-center items-center font-medium">
                    HVP
                </div>

                <button
                    className="lg:hidden h-10 w-10 rounded-full border border-dashed border-border bg-surface cursor-pointer hover:scale-110 flex justify-center items-center transition-transform duration-[200ms] ease-in"
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    aria-label="Toggle Theme"
                >
                    <CircleHalfTiltIcon
                        size={24}
                        className="rotate-[-45deg] text-foreground"
                    />
                </button>
            </div>
        </>
    );
}

export default Initial;
