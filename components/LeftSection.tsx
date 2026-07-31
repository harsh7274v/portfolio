import React from "react";
import Initial from "./left/Initial";
import Name from "./left/Name";
import Photo from "./left/Photo";
import Cta from "./left/Cta";
import Socials from "./left/Socials";

function LeftSection() {
    return (
        <>
            <section className="w-full lg:w-2/5 relative lg:sticky lg:top-0 h-auto lg:h-screen bg-sidebar text-muted overflow-hidden transition-colors duration-[700ms] border-b lg:border-b-0 lg:border-r border-dashed">
                {/* Noise overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        opacity: 0.2,
                        backgroundImage: `url("/Noise.jpg")`,
                        backgroundRepeat: "repeat",
                    }}
                />
                <div className="p-4 flex flex-col h-full">
                    <Initial />
                    <Name />
                    <Photo />
                    <Cta />
                    <Socials />
                </div>
            </section>
        </>
    );
}

export default LeftSection;
