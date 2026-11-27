"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX, Sparkles } from "lucide-react";
import { APP_CONFIG } from "@/data/config";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(APP_CONFIG.audioPath);
    audio.loop = true;
    audioRef.current = audio;

    const errorHandler = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener("error", errorHandler);

    return () => {
      audio.removeEventListener("error", errorHandler);
      audio.pause();
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setHasError(false);
      } catch {
        // Fallback if song.mp3 is not yet added in /public/audio/song.mp3
        setHasError(true);
        setIsPlaying(false);
        setToastMessage("🎵 Add song.mp3 to /public/audio to play music!");
        setTimeout(() => setToastMessage(null), 3000);
      }
    }
  };

  return (
    <div className="relative z-50">
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={isPlaying ? "Pause music" : "Play music"}
        className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
          isPlaying
            ? "bg-rose-deep/40 border-pink-soft/60 shadow-glow text-white animate-pulse"
            : "glass-card border-pink-soft/20 text-pink-soft hover:border-pink-soft/40"
        }`}
      >
        {isPlaying ? (
          <Music className="w-4 h-4 text-pink-soft animate-spin" style={{ animationDuration: "5s" }} />
        ) : (
          <VolumeX className="w-4 h-4 text-pink-soft/70" />
        )}
      </motion.button>

      {/* Floating toast notification when audio file is missing or on error */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute right-0 top-12 w-48 p-2.5 rounded-2xl glass-card border border-rose-deep/30 text-[11px] text-blush font-poppins shadow-glow z-50 flex items-center gap-1.5 leading-snug"
          >
            <Sparkles className="w-4 h-4 text-gold-accent shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
