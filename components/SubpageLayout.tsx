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
      className="relative min-h-full flex flex-col justify-between overflow-x-hidden selection:bg-rose-deep selection:text-white text-[#3B122D]"
    >
      <FloatingHearts count={10} interactive={false} />

      <div className="flex-1 p-5 pb-24 relative z-20">
        {/* Top bar with back button & music player */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-rose-200 text-xs font-poppins text-rose-800 hover:text-rose-deep transition-all shadow-sm"
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
            <span className="text-xs uppercase tracking-widest font-poppins text-rose-500 font-bold">
              Sweetie's Corner
            </span>
          </div>

          <h1 className="text-3xl font-bold font-playfair text-[#2B0E21]">
            {title}
          </h1>

          {hindiTitle && (
            <p className="font-hindi text-sm text-rose-800/80 mt-1">
              {hindiTitle}
            </p>
          )}

          <div className="w-16 h-1 bg-gradient-to-r from-rose-deep to-pink-soft rounded-full mt-3" />
        </div>

        {/* Main Content */}
        <div className="relative z-10">{children}</div>
      </div>

      {/* Floating Bottom Nav */}
      <BottomNav />
    </motion.div>
  );
}
