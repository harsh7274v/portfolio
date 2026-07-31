"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function SkillsTools() {
    const skills = [
        // AI & LLM
        { name: "LLM APIs (OpenAI, Gemini)", category: "AI" },
        { name: "RAG Pipelines", category: "AI" },
        { name: "Pinecone Vector DB", category: "AI" },
        { name: "Agentic AI Workflows", category: "AI" },
        { name: "Prompt Engineering", category: "AI" },
        
        // Core Languages & Frontend
        { name: "JavaScript", logo: "/Javascript.svg" },
        { name: "TypeScript", logo: "/Typescript.svg" },
        { name: "Next.js", logo: "/Next.js.svg" },
        { name: "React", logo: "/React.svg" },
        { name: "Tailwind CSS", logo: "/Tailwind.svg" },
        { name: "Java" },
        { name: "Python" },
        { name: "SQL" },

        // Backend & Databases
        { name: "Node.js", logo: "/Node.svg" },
        { name: "Express", logo: "/Express.svg" },
        { name: "REST APIs" },
        { name: "JWT Auth" },
        { name: "PostgreSQL", logo: "/Postgres.svg" },
        { name: "Prisma", logo: "/Prisma.svg" },
        { name: "Redis", logo: "/Redis.svg" },
        { name: "MongoDB", logo: "/Mongo.svg" },
        { name: "MySQL" },
        { name: "NeonDB" },
        { name: "Firebase" },

        // DevOps & Systems
        { name: "AWS", logo: "/Aws.svg" },
        { name: "Docker", logo: "/Docker.svg" },
        { name: "Git", logo: "/Git.svg" },
        { name: "Github", logo: "/Github.svg" },
        { name: "Postman", logo: "/Postman.svg" },
        { name: "CI/CD & Serverless" },
        { name: "System Design & DSA" }
    ];

    const dark = ["Next.js", "Express"];
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDarkMode = resolvedTheme === "dark";

    return (
        <div id="skills" className="mt-12 lg:mt-15 mx-3 lg:mx-8 m-auto p-2 lg:p-3">
            <div className="mb-8">
                <h1 className="text-3xl font-light text-foreground mb-4">
                    Skills & Tools
                </h1>
                <div className="flex flex-wrap gap-2 lg:gap-2.5">
                    {skills.map((item) => {
                        const hasCustomLogo = Boolean(item.logo);
                        const source = hasCustomLogo
                            ? dark.includes(item.name) && isDarkMode
                                ? `/${item.name}-Light.svg`
                                : item.logo
                            : null;

                        return (
                            <div
                                key={item.name}
                                className={`flex items-center gap-2 rounded-xl lg:rounded-2xl border border-dashed border-border bg-surface px-3 py-2 lg:px-4 lg:py-2.5 text-foreground transition-all duration-200 hover:scale-[1.02] ${
                                    item.category === "AI" ? "border-emerald-500/40 bg-emerald-500/5" : ""
                                }`}
                            >
                                {source ? (
                                    <img
                                        src={source}
                                        alt={`${item.name} logo`}
                                        className="w-5 h-5 lg:w-5 lg:h-5 object-contain"
                                    />
                                ) : (
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                )}
                                <span className="text-xs lg:text-sm font-light">
                                    {item.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default SkillsTools;
