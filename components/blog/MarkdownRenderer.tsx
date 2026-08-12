"use client";

import React from "react";

interface MarkdownRendererProps {
    content: string;
    bodyHtml?: string;
}

export function MarkdownRenderer({ content, bodyHtml }: MarkdownRendererProps) {
    // If Dev.to pre-rendered HTML is available, render it directly with styled classes
    if (bodyHtml && bodyHtml.trim().length > 0) {
        return (
            <div
                className="article-body-html prose prose-neutral dark:prose-invert max-w-full overflow-hidden break-words text-foreground leading-relaxed space-y-6 
                [&_img]:rounded-2xl [&_img]:border [&_img]:border-dashed [&_img]:border-border [&_img]:my-6 [&_img]:max-h-[550px]:object-cover [&_img]:w-full
                [&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h1]:mt-8 [&_h1]:mb-4
                [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-foreground
                [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-foreground
                [&_p]:text-sm sm:[&_p]:text-base [&_p]:leading-relaxed [&_p]:text-foreground/90 [&_p]:mb-4
                [&_a]:text-accent [&_a]:underline [&_a]:font-medium [&_a]:break-all
                [&_pre]:bg-surface [&_pre]:p-3 sm:[&_pre]:p-4 [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-dashed [&_pre]:border-border [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre]:max-w-full
                [&_code]:font-mono [&_code]:text-xs sm:[&_code]:text-sm [&_code]:bg-surface/80 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:my-4
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_ol]:my-4
                [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted [&_blockquote]:my-6"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
        );
    }

    // Helper parser for markdown string
    const renderMarkdownContent = (rawText: string) => {
        const lines = rawText.split("\n");
        const elements: React.ReactNode[] = [];
        let inCodeBlock = false;
        let codeBlockLines: string[] = [];
        let codeBlockLang = "";

        lines.forEach((line, index) => {
            // Code block start/end
            if (line.trim().startsWith("```")) {
                if (inCodeBlock) {
                    elements.push(
                        <div key={`code-${index}`} className="my-6">
                            {codeBlockLang && (
                                <div className="text-xs font-mono text-muted bg-surface/90 px-4 py-1.5 border border-b-0 border-dashed border-border rounded-t-2xl">
                                    {codeBlockLang}
                                </div>
                            )}
                            <pre className={`bg-surface p-4 border border-dashed border-border font-mono text-sm overflow-x-auto text-foreground/90 ${codeBlockLang ? "rounded-b-2xl" : "rounded-2xl"}`}>
                                <code>{codeBlockLines.join("\n")}</code>
                            </pre>
                        </div>
                    );
                    codeBlockLines = [];
                    codeBlockLang = "";
                    inCodeBlock = false;
                } else {
                    inCodeBlock = true;
                    codeBlockLang = line.trim().replace("```", "");
                }
                return;
            }

            if (inCodeBlock) {
                codeBlockLines.push(line);
                return;
            }

            const trimmed = line.trim();

            if (!trimmed) {
                return;
            }

            // Image markdown syntax ![alt](url)
            const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)/);
            if (imgMatch) {
                const altText = imgMatch[1] || "Article Image";
                const imgUrl = imgMatch[2];
                elements.push(
                    <div key={`img-${index}`} className="my-6">
                        <img
                            src={imgUrl}
                            alt={altText}
                            className="w-full max-h-[550px] object-cover rounded-3xl border border-dashed border-border shadow-sm"
                            loading="lazy"
                        />
                        {altText && altText !== "Article Image" && (
                            <p className="text-xs text-center text-muted mt-2 italic">{altText}</p>
                        )}
                    </div>
                );
                return;
            }

            // Headings
            if (trimmed.startsWith("### ")) {
                elements.push(
                    <h3 key={`h3-${index}`} className="text-xl font-bold text-foreground mt-8 mb-3 tracking-tight">
                        {trimmed.replace("### ", "")}
                    </h3>
                );
                return;
            }

            if (trimmed.startsWith("## ")) {
                elements.push(
                    <h2 key={`h2-${index}`} className="text-2xl font-extrabold text-foreground mt-10 mb-4 tracking-tight">
                        {trimmed.replace("## ", "")}
                    </h2>
                );
                return;
            }

            if (trimmed.startsWith("# ")) {
                elements.push(
                    <h1 key={`h1-${index}`} className="text-3xl font-extrabold text-foreground mt-12 mb-6 tracking-tight">
                        {trimmed.replace("# ", "")}
                    </h1>
                );
                return;
            }

            // Bullet points
            if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                elements.push(
                    <li key={`li-${index}`} className="ml-6 list-disc text-base text-foreground/90 my-1">
                        {parseInlineFormatting(trimmed.substring(2))}
                    </li>
                );
                return;
            }

            // Blockquote
            if (trimmed.startsWith("> ")) {
                elements.push(
                    <blockquote key={`bq-${index}`} className="border-l-4 border-accent pl-4 py-2 my-6 italic text-muted bg-surface/40 rounded-r-2xl border border-dashed border-border/40">
                        {parseInlineFormatting(trimmed.substring(2))}
                    </blockquote>
                );
                return;
            }

            // Regular paragraph
            elements.push(
                <p key={`p-${index}`} className="text-base text-foreground/90 leading-relaxed my-4">
                    {parseInlineFormatting(line)}
                </p>
            );
        });

        return elements;
    };

    // Helper for inline bold, links, code
    const parseInlineFormatting = (text: string): React.ReactNode => {
        // Convert markdown links [text](url) to anchor tags
        const linkRegex = /\[(.*?)\]\((.*?)\)/g;
        const parts: React.ReactNode[] = [];
        let lastIdx = 0;
        let match;

        while ((match = linkRegex.exec(text)) !== null) {
            if (match.index > lastIdx) {
                parts.push(text.substring(lastIdx, match.index));
            }
            parts.push(
                <a
                    key={match.index}
                    href={match[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline font-medium hover:text-foreground transition-colors"
                >
                    {match[1]}
                </a>
            );
            lastIdx = linkRegex.lastIndex;
        }

        if (lastIdx < text.length) {
            parts.push(text.substring(lastIdx));
        }

        return parts.length > 0 ? parts : text;
    };

    return <div className="space-y-4">{renderMarkdownContent(content)}</div>;
}
