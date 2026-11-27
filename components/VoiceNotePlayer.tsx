"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Mic, Sparkles, Volume2 } from "lucide-react";
import { APP_CONFIG } from "@/data/config";

export default function VoiceNotePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState("0:45");
  const [currentTime, setCurrentTime] = useState("0:00");
  const [progress, setProgress] = useState(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = new Audio(APP_CONFIG.voiceAudioPath);
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime("0:00");
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const toggleVoice = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // Fallback simulation mode if voice.mp3 is not yet recorded/added
        setIsPlaying(true);
        setToastMsg("🎙️ Playing voice note simulation (Drop voice.mp3 in /public/audio)");
        setTimeout(() => setToastMsg(null), 3500);

        let sec = 0;
        timerRef.current = setInterval(() => {
          sec += 1;
          const mins = Math.floor(sec / 60);
          const secs = sec % 60;
          setCurrentTime(`${mins}:${secs < 10 ? "0" : ""}${secs}`);
          setProgress((sec / 45) * 100);

          if (sec >= 45) {
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime("0:00");
            if (timerRef.current) clearInterval(timerRef.current);
          }
        }, 1000);
      }
    }
  };

  // 24 waveform bar heights
  const waveformBars = [
    25, 45, 70, 35, 85, 60, 40, 95, 80, 50, 75, 90, 65, 45, 80, 90, 55, 35, 70, 85, 45, 60, 30, 20
  ];

  return (
    <div className="w-full flex flex-col items-center my-4">
      {/* Toast Notice */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 px-3 py-1.5 rounded-full glass-card border border-rose-deep/40 text-[11px] text-blush font-poppins text-center"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Player Pod */}
      <div className="w-full rounded-3xl glass-card-rose p-6 border border-pink-soft/30 backdrop-blur-2xl shadow-glow text-center relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-white/10 text-rose-400">
              <Mic className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-poppins uppercase tracking-wider text-pink-soft block">
                Recorded for you
              </span>
              <span className="font-playfair text-sm font-semibold text-white">
                Sweetie's Voice Note 🎙️
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-poppins text-gold-accent">
            <Volume2 className="w-3 h-3" /> 45s
          </div>
        </div>

        {/* Animated Waveform Visualizer */}
        <div className="flex items-center justify-center gap-1.5 h-24 my-4 px-2">
          {waveformBars.map((baseHeight, idx) => {
            const isPassed = (idx / waveformBars.length) * 100 <= progress;

            return (
              <motion.div
                key={idx}
                animate={
                  isPlaying
                    ? {
                        height: [
                          `${Math.max(12, baseHeight * 0.4)}%`,
                          `${baseHeight}%`,
                          `${Math.max(12, baseHeight * 0.6)}%`,
                        ],
                      }
                    : { height: `${baseHeight * 0.4}%` }
                }
                transition={{
                  repeat: isPlaying ? Infinity : 0,
                  duration: 0.8 + (idx % 4) * 0.15,
                  ease: "easeInOut",
                }}
                className={`w-1.5 rounded-full transition-colors ${
                  isPassed
                    ? "bg-gradient-to-t from-rose-deep to-pink-soft shadow-[0_0_8px_rgba(225,29,72,0.8)]"
                    : "bg-white/20"
                }`}
                style={{ height: `${baseHeight * 0.4}%` }}
              />
            );
          })}
        </div>

        {/* Progress Bar & Time */}
        <div className="flex items-center justify-between text-[11px] font-poppins text-pink-soft/70 px-1 mb-5">
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>

        {/* Big Circular Play / Pause Button */}
        <motion.button
          onClick={toggleVoice}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-rose-deep to-pink-500 text-white flex items-center justify-center shadow-glow border border-pink-200/50 min-h-[44px]"
        >
          {isPlaying ? (
            <Pause className="w-7 h-7 fill-white" />
          ) : (
            <Play className="w-7 h-7 fill-white ml-0.5" />
          )}
        </motion.button>

        {/* Dedicated Message Below */}
        <p className="font-poppins text-xs sm:text-sm text-blush/90 font-medium mt-6 leading-relaxed">
          "Sweetie, ek chhota sa message sirf tumhare liye 🎧"
        </p>
        <p className="font-hindi text-xs text-gold-accent mt-0.5">
          हेडफ़ोन लगा लो और सुनो ✨
        </p>
      </div>
    </div>
  );
}
