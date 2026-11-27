"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Mic, Sparkles, Volume2, Upload, Check, Music, Heart } from "lucide-react";
import { APP_CONFIG } from "@/data/config";
import { VOICE_LYRICS, SONG_TITLE } from "@/data/voice";

export default function VoiceNotePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSec, setCurrentSec] = useState(0);
  const [activeLyricId, setActiveLyricId] = useState(1);
  const [hasCustomAudio, setHasCustomAudio] = useState(false);
  const [totalSec, setTotalSec] = useState(72);
  const [duration, setDuration] = useState("1:12");
  const [formattedTime, setFormattedTime] = useState("0:00");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if audio file is present at config path
    const audio = new Audio(APP_CONFIG.voiceAudioPath);
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        const total = Math.floor(audio.duration);
        setTotalSec(total);
        const m = Math.floor(total / 60);
        const s = total % 60;
        setDuration(`${m}:${s < 10 ? "0" : ""}${s}`);
        setHasCustomAudio(true);
      }
    };

    const handleTimeUpdate = () => {
      if (!audio.paused) {
        const sec = audio.currentTime;
        setCurrentSec(sec);
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        setFormattedTime(`${m}:${s < 10 ? "0" : ""}${s}`);

        const match = [...VOICE_LYRICS].reverse().find((l) => sec >= l.timeSec);
        if (match) {
          setActiveLyricId(match.id);
        }
      }
    };

    const handleEnded = () => {
      stopPlayback();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      stopPlayback();
    };
  }, []);

  // Auto-scroll active lyric smoothly into view
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
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const togglePlay = async () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      setIsPlaying(true);

      let audioStarted = false;
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          audioStarted = true;
        } catch {
          // If browser blocks audio or no audio file yet, timer handles lyrics preview
          audioStarted = false;
        }
      }

      // If audio didn't take over timeupdate, run timer
      if (!audioStarted) {
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

          if (sec >= totalSec) {
            stopPlayback();
          }
        }, 500);
      }
    }
  };

  const handleUploadVoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.load();
    }
    setHasCustomAudio(true);
  };

  // 24 waveform visualizer bars
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
              <Music className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-poppins uppercase tracking-wider text-pink-soft block">
                Harshit for Sweetie 🎵
              </span>
              <span className="font-playfair text-sm font-semibold text-white">
                {SONG_TITLE}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {hasCustomAudio ? (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-poppins border border-emerald-500/30 flex items-center gap-1">
                <Check className="w-3 h-3" /> Audio Active
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-pink-200 text-[10px] font-poppins border border-rose-400/30">
                Poetry Mode ✨
              </span>
            )}
          </div>
        </div>

        {/* Animated Waveform Visualizer */}
        <div className="flex items-center justify-center gap-1.5 h-16 my-2 px-2">
          {waveformBars.map((baseHeight, idx) => {
            const isPassed = (idx / waveformBars.length) * 100 <= (currentSec / totalSec) * 100;

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
          <div className="flex-1 mx-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (currentSec / totalSec) * 100)}%` }}
            />
          </div>
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
            ? "Singing heartfelt lines for Sweetie... 💖"
            : "Tap play to experience the song ✨"}
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
              className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-rose-950/85 via-purple-950/80 to-pink-950/85 border-2 border-rose-400/70 shadow-[0_0_25px_rgba(225,29,72,0.5)] text-center relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 text-rose-400/30">
                <Heart className="w-6 h-6 fill-rose-500/20" />
              </div>

              <span className="text-[10px] font-poppins uppercase tracking-wider text-rose-300 font-semibold mb-1 block">
                Now Singing ✨
              </span>

              <p className="font-hindi text-base sm:text-lg font-bold text-white drop-shadow-md">
                {currentLyricObj.hindi}
              </p>
              <p className="font-playfair text-xs sm:text-sm text-gold-accent mt-1 drop-shadow italic">
                "{currentLyricObj.hinglish}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Audio Button */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col items-center justify-center gap-1.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUploadVoice}
            accept="audio/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] font-poppins text-pink-soft/80 hover:text-white px-4 py-2 rounded-full glass-card border border-pink-soft/30 flex items-center gap-1.5 transition-all shadow-sm min-h-[44px]"
          >
            <Upload className="w-3.5 h-3.5 text-gold-accent" />
            <span>
              {hasCustomAudio
                ? "Custom Audio Loaded (Tap to change)"
                : "Attach Audio File 🎵 (or paste into /public/audio/voice.mp3)"}
            </span>
          </button>
          <span className="text-[10px] text-pink-200/50 font-poppins">
            Save any song file as public/audio/voice.mp3 or attach here!
          </span>
        </div>

        {/* All Romantic Song Lyrics - Highlighted & Scrollable */}
        <div className="mt-5 text-left space-y-2.5 max-h-[340px] overflow-y-auto px-1 pb-4 no-scrollbar">
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
                  className={`font-hindi text-sm sm:text-base leading-snug transition-colors ${
                    isCurrent ? "text-white font-bold" : "text-blush/80"
                  }`}
                >
                  {line.hindi}
                </p>
                <p
                  className={`font-playfair text-xs sm:text-sm mt-1 transition-colors ${
                    isCurrent ? "text-amber-200 font-medium" : "text-amber-200/50"
                  }`}
                >
                  "{line.hinglish}"
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
