"use client";
import {
    ArrowSquareOutIcon,
    GithubLogoIcon,
} from "@phosphor-icons/react";
import React from "react";

function Projects() {
    const projects = [
        {
            name: "DocuThinker – AI Document Intelligence & Analytics Platform",
            date: "Jan 2026 – Present",
            tech: ["Next.js", "TypeScript", "LLM APIs", "RAG", "Redis", "Docker", "Firebase", "Tailwind CSS"],
            description:
                "An intelligent document analysis platform offering AI summarization, context-aware & voice chat, sentiment analysis, and interactive document analytics.",
            highlights: [
                {
                    id: 1,
                    value: "Built an end-to-end AI document intelligence platform featuring RAG-powered document summarization, voice-enabled AI chat, sentiment analysis, and interactive document analytics.",
                },
                {
                    id: 2,
                    value: "Architected scalable backend infrastructure with JWT/Firebase authentication, Redis caching, NGINX load balancing, Docker containerization, and automated CI/CD pipelines.",
                },
            ],
            live: "https://docuthinker.vercel.app",
            repo: "https://github.com/harsh7274v/DocuThinker-AI-App",
        },
        {
            name: "WealthWise – Agentic AI Personal Finance Platform",
            date: "Feb 2026 – Present",
            tech: ["Turborepo", "Next.js 14", "Express", "MCP Server", "Agentic AI", "TypeScript", "Docker", "Zod"],
            description:
                "A full-stack monorepo personal finance platform featuring an MCP server with 43 financial tools, 4 specialized Claude-powered AI advisors, and end-to-end Zod type safety.",
            highlights: [
                {
                    id: 1,
                    value: "Architected a full-stack personal finance monorepo (Turborepo, Next.js 14, Express) with shared Zod schemas, real-time analytics, CSV import, and budget/goal tracking workflows.",
                },
                {
                    id: 2,
                    value: "Engineered an MCP Server exposing 43 financial tools alongside an Agentic AI engine with 4 specialized Claude-powered advisors for context assembly and automated financial planning.",
                },
            ],
            live: "https://wealthwisefinancial.vercel.app",
            repo: "https://github.com/harsh7274v/WealthWise-Finance-Tracker",
        },
        {
            name: "Vivid AI – AI-Powered Presentation Generator",
            date: "Jan 2026 – Present",
            tech: ["Next.js", "TypeScript", "LLM APIs", "PostgreSQL", "Prisma", "Electron", "Cypress"],
            description:
                "An end-to-end AI presentation platform that generates full presentation slide decks and contextual images from natural language prompts, reducing slide creation time by 70%.",
            highlights: [
                {
                    id: 1,
                    value: "Designed and shipped an end-to-end AI feature that generates presentation content and images from LLM prompts, cutting slide-creation time by 70% for users.",
                },
                {
                    id: 2,
                    value: "Built a full-stack architecture (PostgreSQL + Prisma) with subscription billing (LemonSqueezy), a cross-platform Electron client, and Cypress test coverage to keep the AI feature reliable in production.",
                },
            ],
            live: "https://vivid-ai-phi.vercel.app",
            repo: "https://github.com/harsh7274v/vivid_ai",
        },
        {
            name: "Confiido – Full-Stack Consultation Platform",
            date: "Aug 2025 – Oct 2025",
            tech: ["Next.js", "Node.js", "Express.js", "Firebase", "Redis", "Razorpay"],
            description:
                "A full-stack online consultation platform delivering high-concurrency booking, real-time slot scheduling, and seamless Razorpay payment integrations.",
            highlights: [
                {
                    id: 1,
                    value: "Built scalable REST APIs supporting 1,000+ concurrent users, covering authentication, scheduling, and booking management.",
                },
                {
                    id: 2,
                    value: "Introduced Redis caching and Razorpay payment integration, cutting DB load by 35% and improving API latency and system reliability.",
                },
            ],
            live: "https://confiido.in",
            repo: "https://github.com/harsh7274v/confiido",
        },
        {
            name: "Journey Jolt – AI-Powered Travel Planning Application",
            date: "Apr 2025 – May 2025",
            tech: ["Node.js", "Express.js", "MongoDB", "Google Gemini AI", "Firebase", "Auth0"],
            description:
                "An AI travel assistant that curates customized, real-time travel itineraries based on user preferences and constraints using Google Gemini LLM API.",
            highlights: [
                {
                    id: 1,
                    value: "Integrated the Google Gemini LLM into a full-stack travel app to generate real-time, personalized itinerary recommendations for 500+ active user sessions.",
                },
                {
                    id: 2,
                    value: "Built secure, Auth0-authenticated REST APIs (Node.js/Express, MongoDB) for travel search and itinerary management, with design consideration for AI response latency and failure handling.",
                },
            ],
            live: "https://journeyjolt.vercel.app",
            repo: "https://github.com/harsh7274v/Journey-Jolt",
        },
        {
            name: "MoneyTrail – AI-Powered Expense & Financial Tracker",
            date: "Jun 2025 – Present",
            tech: ["React", "Node.js", "Express.js", "LLM APIs", "Bank Statement Parser", "Tailwind CSS"],
            description:
                "An intelligent financial management web application that parses bank statements to automate expense tracking, budget management, and spending analytics using AI.",
            highlights: [
                {
                    id: 1,
                    value: "Engineered an AI-driven financial tracking engine that ingests and parses PDF/CSV bank statements to automatically categorize transactions and track personal expenses in real-time.",
                },
                {
                    id: 2,
                    value: "Integrated LLM-powered financial analytics and smart budget forecasting to deliver automated spending insights, manage recurring bills, and optimize savings strategies.",
                },
            ],
            live: "https://bank-analyzer-web.vercel.app/mobile.html",
            repo: "https://github.com/harsh7274v/expanse_tracker",
        },
        {
            name: "Fortify – OAuth2 & OpenID Connect Authorization Server",
            date: "Jul 2025 – Sep 2025",
            tech: ["Express.js", "OAuth2 / OIDC", "PostgreSQL", "Drizzle ORM", "JWT / JWKS", "TypeScript"],
            description:
                "A production-ready OAuth2 and OpenID Connect authorization server for secure authentication and third-party integrations.",
            highlights: [
                {
                    id: 1,
                    value: "Implemented the complete OAuth2 Authorization Code Flow with OpenID Connect support.",
                },
                {
                    id: 2,
                    value: "Designed secure authentication using RSA-signed JWTs, JWKS, email verification, and password reset flows.",
                },
                {
                    id: 3,
                    value: "Built a modular backend with Express, Drizzle ORM, PostgreSQL, and reusable validation middleware.",
                },
            ],
            live: "https://fortify-3.onrender.com",
            repo: "https://github.com/harsh7274v/fortify",
        },
    ];

    return (
        <div id="projects" className="mx-4 lg:mx-8 m-auto p-3">
            <h1 className="mb-6 text-3xl font-light text-foreground">
                Projects
            </h1>

            {projects.map((project) => (
                <div
                    key={project.name}
                    className="bg-surface border border-border border-dashed px-5 py-6 rounded-2xl text-light mb-6 transition-all duration-200 hover:border-foreground/30"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-normal text-foreground">
                                {project.name}
                            </h2>

                            <div className="flex justify-between items-center gap-1.5 px-2 py-1">
                                {project.repo && (
                                    <a href={project.repo} target="_blank" rel="noopener noreferrer">
                                        <GithubLogoIcon
                                            size={19}
                                            className="text-muted cursor-pointer hover:text-foreground transition-colors duration-150 ease-in"
                                        />
                                    </a>
                                )}

                                {project.live && (
                                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                                        <ArrowSquareOutIcon
                                            size={19}
                                            className="text-muted cursor-pointer hover:text-foreground transition-colors duration-150 ease-in"
                                        />
                                    </a>
                                )}
                            </div>
                        </div>

                        {project.live && (
                            <div className="w-fit rounded-3xl border border-dashed border-emerald-500/80 bg-emerald-500/10 px-3 py-0.5">
                                <span className="text-xs font-medium tracking-wide text-emerald-500">
                                    LIVE
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="text-xs text-muted font-light mb-3">
                        {project.date}
                    </div>

                    <p className="text-base lg:text-lg tracking-tight leading-7 text-foreground/90 mb-4">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.map((t) => (
                            <span
                                key={t}
                                className="text-xs font-light text-muted bg-main px-2.5 py-1 rounded-md border border-border/60"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="space-y-1.5">
                        {project.highlights.map((highlight) => (
                            <p
                                key={highlight.id}
                                className="text-sm lg:text-base font-light tracking-normal leading-6 text-muted"
                            >
                                <span className="text-emerald-500 mr-2">•</span>
                                {highlight.value}
                            </p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Projects;
