import React from "react";
import Navbar from "./right/Navbar";
import SkillsTools from "./right/SkillsTools";
import About from "./right/About";
import Projects from "./right/Projects";
import Experience from "./right/Experience";
import EducationAchievements from "./right/EducationAchievements";
import Footer from "./Footer";

function RightSection() {
    return (
        <>
            <section className="min-h-screen w-full lg:w-3/5 bg-main transition-colors duration-[700ms] text-muted">
                <div className="p-4">
                    <Navbar />
                    <SkillsTools/>
                    <About />
                    <Projects />
                    <Experience />
                    <EducationAchievements />
                    <Footer />
                </div>
            </section>
        </>
    );
}

export default RightSection;
