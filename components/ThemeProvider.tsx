"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider 
            attribute="class" 
            defaultTheme="dark" // or "system" if you want it to match their OS
            enableSystem 
        >
            {children}
        </NextThemesProvider>
    );
}