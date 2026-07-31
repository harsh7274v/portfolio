"use client";
import React from "react";

const workHistory = [
    {
        company: "Cipher Schools",
        role: "Full Stack Intern",
        date: "Oct 2025 – Jan 2026",
        details: [
            "Built backend services with Node.js and Express.js using MVC architecture, improving codebase modularity and maintainability.",
            "Partnered with frontend engineers in Agile sprints, managing version control and leading code reviews via Git and GitHub to enforce consistent engineering patterns."
        ]
    },
    {
        company: "Outlier AI",
        role: "LLM Trainer",
        date: "Jan 2025 – Apr 2026",
        details: [
            "Evaluated and ranked AI model outputs against safety and quality guardrails as part of an RLHF pipeline, improving model response quality by 20%.",
            "Reviewed and validated AI-generated code against pixel-perfect UI mockups using React and TypeScript, surfacing failure modes and edge cases to improve model reliability."
        ]
    },
];

export default function Experience() {
    return (
        <div id="experience" className="mx-4 lg:mx-8 my-8 p-3">
            <h1 className="mb-6 text-3xl font-light text-foreground">
                Experience
            </h1>

            <div className="space-y-6">
                {workHistory.map((job, index) => (
                    <div
                        key={index}
                        className="bg-surface border border-border border-dashed p-6 rounded-2xl transition-all duration-200 hover:border-foreground/30"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                            <div>
                                <h2 className="text-xl font-normal text-foreground">
                                    {job.role} <span className="text-emerald-500 font-light">@ {job.company}</span>
                                </h2>
                            </div>
                            <span className="text-sm font-light text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full border border-dashed border-emerald-500/40 w-fit">
                                {job.date}
                            </span>
                        </div>

                        <ul className="mt-4 space-y-2">
                            {job.details.map((bullet, i) => (
                                <li key={i} className="text-sm lg:text-base font-light text-muted leading-6 flex items-start gap-2">
                                    <span className="text-emerald-500 mt-1">•</span>
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
