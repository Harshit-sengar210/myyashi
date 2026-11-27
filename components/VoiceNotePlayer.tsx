"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Mic, Sparkles, Volume2, Heart } from "lucide-react";
import { APP_CONFIG } from "@/data/config";
import { VOICE_LYRICS } from "@/data/voice";

export default function VoiceNotePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [activeLyricId, setActiveLyricId] = useState(1);
  const [duration, setDuration] = useState("0:46");
  const [formattedTime, setFormattedTime] = useState("0:00");
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = new Audio(APP_CONFIG.voiceAudioPath);
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        const m = Math.floor(audio.duration / 60);
        const s = Math.floor(audio.duration % 60);
        setDuration(`${m}:${s < 10 ? "0" : ""}${s}`);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTimeSec(0);
      setFormattedTime("0:00");
      if (timerRef.current) clearInterval(timerRef.current);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
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

        timerRef.current = setInterval(() => {
          if (!audioRef.current) return;
          const current = audioRef.current.currentTime;
          setCurrentTimeSec(current);

          const m = Math.floor(current / 60);
          const s = Math.floor(current % 60);
          setFormattedTime(`${m}:${s < 10 ? "0" : ""}${s}`);

          const total = audioRef.current.duration || 46;
          setProgress((current / total) * 100);

          // Find synchronized lyric
          const match = [...VOICE_LYRICS].reverse().find((l) => current >= l.timeSec);
          if (match) {
            setActiveLyricId(match.id);
          }
        }, 250);
      } catch (err) {
        // Fallback simulation if autoplay blocked or audio issues
        setIsPlaying(true);
        let sec = currentTimeSec;
        timerRef.current = setInterval(() => {
          sec += 1;
          setCurrentTimeSec(sec);
          const m = Math.floor(sec / 60);
          const s = sec % 60;
          setFormattedTime(`${m}:${s < 10 ? "0" : ""}${s}`);
          setProgress((sec / 46) * 100);

          const match = [...VOICE_LYRICS].reverse().find((l) => sec >= l.timeSec);
          if (match) {
            setActiveLyricId(match.id);
          }

          if (sec >= 46) {
            setIsPlaying(false);
            setProgress(0);
            setCurrentTimeSec(0);
            setFormattedTime("0:00");
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
      {/* Voice Player Pod */}
      <div className="w-full rounded-3xl glass-card-rose p-6 border border-pink-soft/30 backdrop-blur-2xl shadow-glow text-center relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-white/10 text-rose-400">
              <Mic className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-poppins uppercase tracking-wider text-pink-soft block">
                Harmonized for Yashi
              </span>
              <span className="font-playfair text-sm font-semibold text-white">
                Ham Tere Pyaar Main 🎙️
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-poppins text-gold-accent">
            <Volume2 className="w-3 h-3" /> {duration}
          </div>
        </div>

        {/* Animated Waveform Visualizer */}
        <div className="flex items-center justify-center gap-1.5 h-20 my-3 px-2">
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
        <div className="flex items-center justify-between text-[11px] font-poppins text-pink-soft/70 px-1 mb-4">
          <span>{formattedTime}</span>
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

        {/* Synchronized Singing Lyrics Display */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-poppins text-pink-soft mb-3">
            <Sparkles className="w-3 h-3 text-gold-accent" />
            <span>Voice Note Lyrics • Harshit for Sweetie</span>
          </div>

          <div className="space-y-2.5 max-h-48 overflow-y-auto px-1 text-left">
            {VOICE_LYRICS.map((line) => {
              const isCurrent = activeLyricId === line.id && isPlaying;

              return (
                <motion.div
                  key={line.id}
                  animate={{
                    scale: isCurrent ? 1.03 : 0.98,
                    opacity: isCurrent ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.25 }}
                  className={`p-2.5 rounded-2xl transition-all border ${
                    isCurrent
                      ? "bg-rose-deep/30 border-pink-soft/50 shadow-glow"
                      : "bg-white/5 border-transparent"
                  }`}
                >
                  <p
                    className={`font-playfair text-sm leading-snug ${
                      isCurrent ? "text-white font-bold" : "text-blush/70"
                    }`}
                  >
                    "{line.hinglish}"
                  </p>
                  <p
                    className={`font-hindi text-xs mt-0.5 ${
                      isCurrent ? "text-gold-accent font-medium" : "text-gold-accent/40"
                    }`}
                  >
                    {line.hindi}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
