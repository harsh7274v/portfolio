import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/ScrollSmooth";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Harsh Vardhan Prasad | Fullstack & AI Engineer",
    description:
        "Portfolio of Harsh Vardhan Prasad, Fullstack Engineer specializing in AI features, LLM APIs (OpenAI, Gemini), RAG pipelines, Next.js, and Node.js.",
    icons: {
        icon: "/Tabimage.png",
        apple: "/Tabimage.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body>
                <ReactQueryProvider>
                    <ThemeProvider>
                        <SmoothScroll>{children}</SmoothScroll>
                    </ThemeProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
