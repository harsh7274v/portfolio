"use client";
import React from "react";
import { GraduationCapIcon, TrophyIcon, CertificateIcon, ArrowSquareOutIcon } from "@phosphor-icons/react";

export default function EducationAchievements() {
    const achievements = [
        "Secured top 4% rank among 28,000+ contributors in GirlScript Summer of Code (GSSoC) 2025",
        "Contributed to 20+ open-source projects and built end-to-end solutions through hackathons",
        "Dean's List – Top 10% of students at Lovely Professional University",
    ];

    const certifications = [
        {
            title: "Project Planning and Execution",
            issuer: "University of Colorado Boulder",
            date: "May 2026",
            link: "https://coursera.org/share/874b55f585a7fd01487f690dd33cc7eb",
        },
        {
            title: "Agile Project Management",
            issuer: "University of Colorado Boulder",
            date: "May 2026",
            link: "https://coursera.org/share/24554d742ee7b6dff653639db69ca3c7",
        },
        {
            title: "Project Management: Foundations and Initiation",
            issuer: "University of Colorado Boulder",
            date: "Feb 2026",
            link: "https://coursera.org/share/deaf1abd8c0fbf9c2b12de240318760e",
        },
        {
            title: "Trustworthy Generative AI",
            issuer: "Vanderbilt University",
            date: "Nov 2025",
            link: "https://coursera.org/share/dceb1fd2bd88833b8ea36f6f12561c54",
        },
        {
            title: "AI Agents and Agentic AI with Python & Generative AI",
            issuer: "Vanderbilt University",
            date: "Nov 2025",
            link: "https://coursera.org/share/626baa1ff46330bf01ce609f430aec28",
        },
        {
            title: "AI Agents and Agentic AI Architecture in Python",
            issuer: "Vanderbilt University",
            date: "Sep 2025",
            link: "https://coursera.org/share/d88c113d922f4a1aacb593a4d727a25e",
        },
        {
            title: "Generative AI with Large Language Models",
            issuer: "DeepLearning.AI • Amazon Web Services",
            date: "May 2024",
            link: "https://coursera.org/share/aa53f66f86c0ae9f80198f935c604f86",
        },
        {
            title: "Build AI Apps with ChatGPT, Dall-E, and GPT-4",
            issuer: "Scrimba",
            date: "Apr 2024",
            link: "https://coursera.org/share/da7da2fa9610c49f8c6abd05cc46ae9a",
        },
    ];

    return (
        <div id="education" className="mx-4 lg:mx-8 my-8 p-3">
            <h1 className="mb-6 text-3xl font-light text-foreground">
                Education & Achievements
            </h1>

            <div className="space-y-6">
                {/* Education Card */}
                <div className="bg-surface border border-border border-dashed p-6 rounded-2xl transition-all duration-200 hover:border-foreground/30">
                    <div className="flex items-center gap-3 mb-3">
                        <GraduationCapIcon size={28} className="text-emerald-500" />
                        <div>
                            <h2 className="text-xl font-normal text-foreground">
                                B.Tech in Computer Science and Engineering
                            </h2>
                            <p className="text-sm text-muted">
                                Lovely Professional University • Phagwara, Punjab
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40 text-xs lg:text-sm text-muted">
                        <span>Aug 2022 – May 2026</span>
                        <span className="text-emerald-500 font-light bg-emerald-500/10 px-2.5 py-1 rounded-md">
                            Dean&apos;s List – Top 10%
                        </span>
                    </div>
                </div>

                {/* Achievements Card */}
                <div className="bg-surface border border-border border-dashed p-6 rounded-2xl transition-all duration-200 hover:border-foreground/30">
                    <div className="flex items-center gap-3 mb-4">
                        <TrophyIcon size={26} className="text-emerald-500" />
                        <h2 className="text-xl font-normal text-foreground">
                            Key Achievements
                        </h2>
                    </div>
                    <ul className="space-y-2.5">
                        {achievements.map((item, idx) => (
                            <li key={idx} className="text-sm lg:text-base font-light text-muted leading-6 flex items-start gap-2">
                                <span className="text-emerald-500 mt-1">•</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Certifications Card */}
                <div className="bg-surface border border-border border-dashed p-6 rounded-2xl transition-all duration-200 hover:border-foreground/30">
                    <div className="flex items-center gap-3 mb-4">
                        <CertificateIcon size={26} className="text-emerald-500" />
                        <h2 className="text-xl font-normal text-foreground">
                            Certifications
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {certifications.map((cert, idx) => (
                            <a
                                key={idx}
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-main border border-border/60 p-4 rounded-xl flex flex-col justify-between transition-all duration-200 hover:border-emerald-500/50 hover:bg-surface"
                            >
                                <div className="flex justify-between items-start gap-2 mb-2">
                                    <span className="text-sm font-medium text-foreground group-hover:text-emerald-500 transition-colors leading-snug">
                                        {cert.title}
                                    </span>
                                    <ArrowSquareOutIcon
                                        size={18}
                                        className="text-muted group-hover:text-emerald-500 shrink-0 transition-colors"
                                    />
                                </div>
                                <div className="flex justify-between items-end text-xs text-muted font-light mt-2 pt-2 border-t border-border/20">
                                    <span>{cert.issuer}</span>
                                    <span className="text-emerald-500/90 font-normal">{cert.date}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
