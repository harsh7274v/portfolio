import React from "react";

function About() {
    return (
        <div id="about" className="mx-8 mb-8 m-auto p-3">
            <h1 className="mb-3 text-3xl font-light text-foreground">
                About Me
            </h1>
            <p className="text-lg tracking-tight leading-7">
                Hello! I&apos;m <span className="text-foreground font-normal">Harsh Vardhan Prasad</span>. 👋
            </p>
            <br />
            <p className="text-lg tracking-tight leading-7">
                I am a <span className="text-foreground">Fullstack Engineer</span> with hands-on experience shipping AI-powered features to production, integrating <span className="text-foreground">LLM APIs (OpenAI, Google Gemini)</span>, <span className="text-foreground">Retrieval-Augmented Generation (RAG)</span>, and vector embeddings into scalable Next.js, React, and Node.js applications.
            </p>
            <br />
            <p className="text-lg tracking-tight leading-7">
                I have a strong foundation in <span className="text-foreground">PostgreSQL & Prisma</span>, <span className="text-foreground">Redis</span>, <span className="text-foreground">Docker</span>, <span className="text-foreground">REST APIs</span>, and cloud-native serverless architectures.
            </p>
            <br />
            <p className="text-lg tracking-tight leading-7">
                Currently pursuing my B.Tech in Computer Science and Engineering at Lovely Professional University (Dean&apos;s List – Top 10%), I enjoy solving complex systems problems, fine-tuning model outputs with RLHF pipelines, and building production-grade full-stack applications.
            </p>
        </div>
    );
}

export default About;
