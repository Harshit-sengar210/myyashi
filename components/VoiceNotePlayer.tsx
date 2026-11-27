"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Mic, Sparkles, Volume2, Upload, Check, Music, Heart } from "lucide-react";
import { APP_CONFIG } from "@/data/config";
import { VOICE_LYRICS } from "@/data/voice";

export default function VoiceNotePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSec, setCurrentSec] = useState(0);
  const [activeLyricId, setActiveLyricId] = useState(1);
  const [hasCustomAudio, setHasCustomAudio] = useState(false);
  const [duration, setDuration] = useState("0:45");
  const [formattedTime, setFormattedTime] = useState("0:00");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if voice.mp3 is valid
    const audio = new Audio(APP_CONFIG.voiceAudioPath);
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        const m = Math.floor(audio.duration / 60);
        const s = Math.floor(audio.duration % 60);
        setDuration(`${m}:${s < 10 ? "0" : ""}${s}`);
      }
    };

    const handleEnded = () => {
      stopPlayback();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      stopPlayback();
    };
  }, []);

  // Auto-scroll active lyric smoothly into view so it never gets cut off by bottom navbar
  useEffect(() => {
    if (activeLineRef.current && isPlaying) {
      activeLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeLyricId, isPlaying]);

  const stopPlayback = () => {
    setIsPlaying(false);
    setCurrentSec(0);
    setFormattedTime("0:00");
    setActiveLyricId(1);
    if (timerRef.current) clearInterval(timerRef.current);
    if (audioRef.current) audioRef.current.pause();
  };

  const togglePlay = async () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      setIsPlaying(true);

      // Play real audio if present/uploaded
      if (audioRef.current && hasCustomAudio) {
        try {
          await audioRef.current.play();
        } catch {
          // ignore error
        }
      }

      // Smooth lyrics progress timer
      let sec = 0;
      timerRef.current = setInterval(() => {
        sec += 0.5;
        setCurrentSec(sec);

        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        setFormattedTime(`${m}:${s < 10 ? "0" : ""}${s}`);

        const match = [...VOICE_LYRICS].reverse().find((l) => sec >= l.timeSec);
        if (match) {
          setActiveLyricId(match.id);
        }

        if (sec >= 45) {
          stopPlayback();
        }
      }, 500);
    }
  };

  const handleUploadVoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    if (audioRef.current) {
      audioRef.current.src = url;
    }
    setHasCustomAudio(true);
  };

  // 24 waveform bars
  const waveformBars = [
    25, 45, 70, 35, 85, 60, 40, 95, 80, 50, 75, 90, 65, 45, 80, 90, 55, 35, 70, 85, 45, 60, 30, 20
  ];

  const currentLyricObj = VOICE_LYRICS.find((l) => l.id === activeLyricId) || VOICE_LYRICS[0];

  return (
    <div className="w-full flex flex-col items-center my-2 pb-24">
      {/* Voice Note Player Card */}
      <div className="w-full rounded-3xl glass-card-rose p-5 sm:p-6 border border-pink-soft/30 backdrop-blur-2xl shadow-glow text-center relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-white/10 text-rose-400">
              <Mic className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-poppins uppercase tracking-wider text-pink-soft block">
                Poetry & Voice Note
              </span>
              <span className="font-playfair text-sm font-semibold text-white">
                Ham Tere Pyaar Main 🎙️
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {hasCustomAudio ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-poppins border border-emerald-500/30 flex items-center gap-1">
                <Check className="w-3 h-3" /> Voice Loaded
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-white/5 text-pink-soft/80 text-[10px] font-poppins border border-white/10">
                Poetry Mode ✨
              </span>
            )}
          </div>
        </div>

        {/* Animated Waveform Visualizer */}
        <div className="flex items-center justify-center gap-1.5 h-16 my-2 px-2">
          {waveformBars.map((baseHeight, idx) => {
            const isPassed = (idx / waveformBars.length) * 100 <= (currentSec / 45) * 100;

            return (
              <motion.div
                key={idx}
                animate={
                  isPlaying
                    ? {
                        height: [
                          `${Math.max(14, baseHeight * 0.35)}%`,
                          `${baseHeight}%`,
                          `${Math.max(14, baseHeight * 0.55)}%`,
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
        <div className="flex items-center justify-between text-[11px] font-poppins text-pink-soft/70 px-1 mb-3">
          <span>{formattedTime}</span>
          <span>{duration}</span>
        </div>

        {/* Big Circular Play / Pause Button */}
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-gradient-to-tr from-rose-deep to-pink-500 text-white flex items-center justify-center shadow-glow border border-pink-200/50 min-h-[44px]"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
          ) : (
            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-0.5" />
          )}
        </motion.button>

        <p className="font-poppins text-xs text-blush/90 font-medium mt-3">
          {isPlaying
            ? "Reading heartfelt lines for Sweetie... 💖"
            : "Tap play to experience the poetry ✨"}
        </p>

        {/* Spotlight Active Lyric (Floating animation on screen) */}
        <AnimatePresence mode="wait">
          {isPlaying && (
            <motion.div
              key={activeLyricId}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-rose-950/80 via-purple-950/70 to-pink-950/80 border-2 border-rose-400/60 shadow-[0_0_25px_rgba(225,29,72,0.45)] text-center relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 text-rose-400/30">
                <Heart className="w-6 h-6 fill-rose-500/20" />
              </div>

              <span className="text-[10px] font-poppins uppercase tracking-wider text-rose-300 font-semibold mb-1 block">
                Now Singing ✨
              </span>

              <p className="font-playfair text-base sm:text-lg font-bold text-white drop-shadow-md">
                "{currentLyricObj.hinglish}"
              </p>
              <p className="font-hindi text-sm text-gold-accent mt-1 drop-shadow">
                {currentLyricObj.hindi}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Harshit's Real Voice Recording */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUploadVoice}
            accept="audio/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] font-poppins text-pink-soft/80 hover:text-white px-3.5 py-1.5 rounded-full glass-card border border-pink-soft/30 flex items-center gap-1.5 transition-all shadow-sm min-h-[44px]"
          >
            <Upload className="w-3.5 h-3.5 text-gold-accent" />
            <span>
              {hasCustomAudio
                ? "Recording Added! (Tap to change)"
                : "Add your voice recording (Optional) 🎙️"}
            </span>
          </button>
        </div>

        {/* All Romantic Lyrics - Fully Visible on Screen with Smooth Scroll */}
        <div className="mt-5 text-left space-y-2.5 max-h-[320px] overflow-y-auto px-1 pb-4 no-scrollbar">
          {VOICE_LYRICS.map((line) => {
            const isCurrent = activeLyricId === line.id && isPlaying;

            return (
              <motion.div
                key={line.id}
                ref={isCurrent ? activeLineRef : null}
                animate={{
                  scale: isCurrent ? 1.02 : 1,
                  opacity: isCurrent ? 1 : 0.6,
                }}
                transition={{ duration: 0.25 }}
                className={`p-3.5 rounded-2xl transition-all border ${
                  isCurrent
                    ? "bg-rose-900/60 border-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.5)]"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <p
                  className={`font-playfair text-sm sm:text-base leading-snug transition-colors ${
                    isCurrent ? "text-white font-bold" : "text-blush/80"
                  }`}
                >
                  "{line.hinglish}"
                </p>
                <p
                  className={`font-hindi text-xs sm:text-sm mt-1 transition-colors ${
                    isCurrent ? "text-amber-200 font-medium" : "text-amber-200/50"
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
  );
}
