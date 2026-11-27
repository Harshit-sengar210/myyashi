"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Disc3, Sparkles, Volume2, Heart } from "lucide-react";
import { songLyricsData } from "@/data/song";
import { APP_CONFIG } from "@/data/config";

export default function SongPlayerView() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeLineId, setActiveLineId] = useState(1);
  const [hasAudioFile, setHasAudioFile] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = new Audio(APP_CONFIG.audioPath);
    audio.loop = true;
    audioRef.current = audio;

    const errorHandler = () => {
      setHasAudioFile(false);
    };

    audio.addEventListener("error", errorHandler);

    return () => {
      audio.removeEventListener("error", errorHandler);
      audio.pause();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Sync active lyric highlight based on elapsed seconds
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const nextSec = (prev + 1) % 35; // cycle every 35s
          // Find matching lyric
          const matching = [...songLyricsData]
            .reverse()
            .find((l) => nextSec >= l.timeSec);
          if (matching) {
            setActiveLineId(matching.id);
          }
          return nextSec;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // Fallback simulated player if song.mp3 is not present
        setIsPlaying(true);
        setToastMsg("🎶 Simulating player (Add song.mp3 to /public/audio for real sound)");
        setTimeout(() => setToastMsg(null), 3500);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Toast notice */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-3 px-3 py-1.5 rounded-full glass-card border border-rose-deep/40 text-[11px] text-blush font-poppins text-center"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spinning Vinyl Record Container */}
      <div className="relative my-4 flex items-center justify-center">
        {/* Ambient glow behind vinyl */}
        <div
          className={`absolute w-56 h-56 rounded-full blur-2xl transition-all duration-700 ${
            isPlaying ? "bg-rose-deep/40 scale-105" : "bg-purple-900/20 scale-95"
          }`}
        />

        {/* Vinyl Record */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{
            repeat: isPlaying ? Infinity : 0,
            duration: 8,
            ease: "linear",
          }}
          className="relative w-52 h-52 rounded-full bg-gradient-to-tr from-[#121212] via-[#222222] to-[#0a0a0a] border-4 border-neutral-800 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex items-center justify-center select-none"
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-3 rounded-full border border-neutral-700/40" />
          <div className="absolute inset-7 rounded-full border border-neutral-700/30" />
          <div className="absolute inset-12 rounded-full border border-neutral-700/30" />
          <div className="absolute inset-16 rounded-full border border-neutral-700/40" />

          {/* Center Record Label */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-deep via-pink-soft to-rose-600 border-2 border-white/40 flex flex-col items-center justify-center shadow-inner">
            <span className="text-xs font-dancing font-bold text-white leading-none">
              Yashi
            </span>
            <span className="text-[8px] font-poppins text-pink-100 uppercase tracking-widest mt-0.5">
              Sweetie
            </span>
            {/* Center Spindle Hole */}
            <div className="w-3.5 h-3.5 rounded-full bg-night-dark border border-neutral-600 mt-1" />
          </div>
        </motion.div>

        {/* Stylus needle indicator on top right */}
        <div className="absolute -top-1 right-2 w-8 h-8 pointer-events-none">
          <Disc3 className="w-6 h-6 text-pink-soft/80" />
        </div>
      </div>

      {/* Play / Pause Controller */}
      <div className="flex items-center gap-4 my-3">
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-deep to-pink-500 text-white flex items-center justify-center shadow-glow border border-pink-200/50"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 fill-white" />
          ) : (
            <Play className="w-6 h-6 fill-white ml-0.5" />
          )}
        </motion.button>
      </div>

      <span className="text-[11px] font-poppins text-pink-soft/70 mb-5 flex items-center gap-1.5">
        <Volume2 className="w-3.5 h-3.5" />
        {isPlaying ? "Playing melody & synchronized thoughts..." : "Tap to start music"}
      </span>

      {/* Floating Synced Lyrics & Custom Thoughts Area */}
      <div className="w-full glass-card-rose rounded-3xl p-5 border border-pink-soft/25 backdrop-blur-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
            <span className="text-xs font-poppins uppercase tracking-wider text-pink-soft font-semibold">
              Thoughts for Sweetie
            </span>
          </div>
          <span className="text-[10px] font-poppins text-pink-soft/60">
            {currentTime}s
          </span>
        </div>

        {/* Scrollable list with current highlighted line */}
        <div className="space-y-3 py-1 max-h-56 overflow-y-auto pr-1">
          {songLyricsData.map((line) => {
            const isHighlight = activeLineId === line.id;
            return (
              <motion.div
                key={line.id}
                animate={{
                  scale: isHighlight ? 1.02 : 0.98,
                  opacity: isHighlight ? 1 : 0.45,
                }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-2xl transition-all border ${
                  isHighlight
                    ? "bg-rose-deep/30 border-pink-soft/40 shadow-glow"
                    : "bg-white/5 border-transparent"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-base">{line.emoji}</span>
                  <div>
                    <p
                      className={`text-sm leading-snug font-poppins ${
                        isHighlight ? "text-white font-medium" : "text-blush/70"
                      }`}
                    >
                      {line.text}
                    </p>
                    {line.hindi && (
                      <p
                        className={`text-xs mt-0.5 font-hindi ${
                          isHighlight ? "text-gold-accent" : "text-gold-accent/50"
                        }`}
                      >
                        {line.hindi}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
