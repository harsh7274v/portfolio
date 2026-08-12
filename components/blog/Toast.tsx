"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircleIcon } from "@phosphor-icons/react";

interface ToastProps {
    message: string | null;
    onClose?: () => void;
}

export function Toast({ message }: ToastProps) {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-surface border border-dashed border-accent text-foreground shadow-xl backdrop-blur-md"
                >
                    <CheckCircleIcon size={24} className="text-accent shrink-0" />
                    <span className="text-sm font-medium tracking-tight">{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
