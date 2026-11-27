"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import BottomNav from "@/components/BottomNav";
import MusicPlayer from "@/components/MusicPlayer";

interface SubpageLayoutProps {
  title: string;
  hindiTitle?: string;
  icon?: string;
  children: React.ReactNode;
}

export default function SubpageLayout({
  title,
  hindiTitle,
  icon = "✨",
  children,
}: SubpageLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative min-h-full flex flex-col justify-between overflow-x-hidden selection:bg-rose-deep selection:text-white"
    >
      <FloatingHearts count={10} interactive={false} />

      <div className="flex-1 p-5 pb-24 relative z-20">
        {/* Top bar with back button & music player */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card border border-pink-soft/20 text-xs font-poppins text-pink-soft hover:text-white transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </Link>
          <MusicPlayer />
        </div>

        {/* Header Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-2xl">{icon}</span>
            <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {title}
            </h1>
          </div>
          {hindiTitle && (
            <p className="font-hindi text-base text-gold-accent">{hindiTitle}</p>
          )}
        </div>

        {/* Content body */}
        <div className="w-full">{children}</div>
      </div>

      <BottomNav />
    </motion.div>
  );
}
