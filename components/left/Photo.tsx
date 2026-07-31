import React from "react";
import Image from "next/image";

function Photo() {
    return (
        <div className="m-8 flex justify-center ">
            <div className="relative h-64 w-64 rounded-full bg-surface border border-dashed transition-colors duration-100">
                <div
                    className="absolute inset-0 rounded-full pointer-events-none opacity-10"
                    style={{
                        backgroundImage: "url('/Noise.jpg')",
                        backgroundRepeat: "repeat",
                    }}
                />
                <div className="absolute right-10 h-64 w-64 overflow-hidden rounded-full">
                    <Image
                        src="/harsh.jpeg"
                        alt="Harsh Vardhan Prasad"
                        width={176}
                        height={176}
                        className="h-full w-full object-cover"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}

export default Photo;
