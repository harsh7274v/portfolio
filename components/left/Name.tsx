import React from "react";

function Name() {
    return (
        <>
            <div className="m-4 lg:m-8 p-3 flex flex-col items-start w-full">
                <div className="flex flex-col w-fit gap-1">
                    <h1 className="pl-4 lg:pl-8 text-3xl lg:text-4xl font-semibold tracking-tighter text-foreground transition-colors duration-[100ms]">
                        Harsh Vardhan Prasad
                    </h1>

                    {/* self-end now aligns this to the right side of the "w-fit" box (your name), instead of the whole screen */}
                    <h3 className="self-end pr-4 mt-1 text-lg lg:text-[20px] font-light tracking-normal text-muted">
                        ~ Fullstack & AI Engineer
                    </h3>
                </div>

                <div
                    className="inline-flex self-start items-center justify-center gap-2 
                    ml-4 lg:ml-8 mt-6 px-3 py-1.5 
                    rounded-full border border-dashed border-border bg-surface 
                    text-xs lg:text-sm font-light text-foreground 
                    transition-colors duration-100
    "
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5  bg-emerald-700"></span>
                    </span>
                    Jamshedpur, IN • Open to opportunities
                </div>
            </div>
        </>
    );
}

export default Name;
