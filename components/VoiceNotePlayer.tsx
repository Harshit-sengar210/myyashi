"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Mic, Sparkles, Volume2, Upload, Music, Check } from "lucide-react";
import { APP_CONFIG } from "@/data/config";
import { VOICE_LYRICS } from "@/data/voice";

export default function VoiceNotePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useSpeech, setUseSpeech] = useState(true);
  const [currentSec, setCurrentSec] = useState(0);
  const [activeLyricId, setActiveLyricId] = useState(1);
  const [customAudioUploaded, setCustomAudioUploaded] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSupported(true);
    }

    const audio = new Audio(APP_CONFIG.voiceAudioPath);
    audioRef.current = audio;

    const handleEnded = () => {
      stopPlayback();
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      stopPlayback();
    };
  }, []);

  const stopPlayback = () => {
    setIsPlaying(false);
    setCurrentSec(0);
    setActiveLyricId(1);
    if (timerRef.current) clearInterval(timerRef.current);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const speakLyrics = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    // Natural spoken poetry text
    const textToSpeak = `
      Ham tere pyaar main saara aalam kho baithe... kho baithe...
      Tum kehte ho ki aise pyaar ko bhool jaao... bhool jaao...
      Ham tere pyaar main saara aalam kho baithe...
      Tum kehte ho ki aise pyaar ko bhool jaao...
      Ham tere pyaar main saara aalam... sirf tum, Sweetie!
    `;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.85; // slightly slower romantic pacing
    utterance.pitch = 1.0;

    // Pick best voice available (Hindi or soft English)
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang.includes("hi") || v.lang.includes("IN"));
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    utterance.onend = () => {
      stopPlayback();
    };

    window.speechSynthesis.speak(utterance);
  };

  const togglePlay = async () => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      stopPlayback();
    } else {
      setIsPlaying(true);

      // If user uploaded their real voice/song or chooses audio
      if (!useSpeech && audioRef.current) {
        try {
          await audioRef.current.play();
        } catch {
          // ignore error
        }
      } else {
        // Play real spoken voice via browser speech engine
        speakLyrics();
        // Also play background melody softly
        if (audioRef.current) {
          audioRef.current.volume = 0.25;
          audioRef.current.play().catch(() => {});
        }
      }

      // Synchronize lyric cards
      let sec = 0;
      timerRef.current = setInterval(() => {
        sec += 0.5;
        setCurrentSec(sec);

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

  // Allow uploading Harshit's real voice recording right from phone or PC
  const handleUploadVoice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.volume = 1.0;
    }
    setCustomAudioUploaded(true);
    setUseSpeech(false);
  };

  // 24 waveform bars
  const waveformBars = [
    25, 45, 70, 35, 85, 60, 40, 95, 80, 50, 75, 90, 65, 45, 80, 90, 55, 35, 70, 85, 45, 60, 30, 20
  ];

  return (
    <div className="w-full flex flex-col items-center my-4">
      {/* Player Pod */}
      <div className="w-full rounded-3xl glass-card-rose p-6 border border-pink-soft/30 backdrop-blur-2xl shadow-glow text-center relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-white/10 text-rose-400">
              <Mic className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-poppins uppercase tracking-wider text-pink-soft block">
                Voice Note for Yashi
              </span>
              <span className="font-playfair text-sm font-semibold text-white">
                Ham Tere Pyaar Main 🎙️
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {customAudioUploaded ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-poppins border border-emerald-500/30 flex items-center gap-1">
                <Check className="w-3 h-3" /> Real Voice
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-rose-deep/30 text-pink-soft text-[10px] font-poppins border border-rose-deep/40">
                Spoken Voice 🗣️
              </span>
            )}
          </div>
        </div>

        {/* Waveform Visualizer */}
        <div className="flex items-center justify-center gap-1.5 h-20 my-3 px-2">
          {waveformBars.map((baseHeight, idx) => {
            const isPassed = (idx / waveformBars.length) * 100 <= (currentSec / 45) * 100;

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

        {/* Progress Time */}
        <div className="flex items-center justify-between text-[11px] font-poppins text-pink-soft/70 px-1 mb-4">
          <span>0:{Math.floor(currentSec) < 10 ? `0${Math.floor(currentSec)}` : Math.floor(currentSec)}</span>
          <span>0:45</span>
        </div>

        {/* Play Button */}
        <motion.button
          onClick={togglePlay}
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

        <p className="font-poppins text-xs text-blush/90 font-medium mt-4">
          {isPlaying ? "Speaking & singing for Sweetie..." : "Tap play to hear the spoken lyrics ✨"}
        </p>

        {/* Option to upload Harshit's original audio voice recording */}
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
            className="text-[11px] font-poppins text-pink-soft/70 hover:text-white px-3 py-1.5 rounded-full glass-card border border-pink-soft/20 flex items-center gap-1.5 transition-all"
          >
            <Upload className="w-3.5 h-3.5 text-gold-accent" />
            <span>{customAudioUploaded ? "Change Voice File" : "Upload your own audio recording (Optional)"}</span>
          </button>
        </div>

        {/* Lyrics synchronization display */}
        <div className="mt-5 text-left space-y-2 max-h-48 overflow-y-auto px-1">
          {VOICE_LYRICS.map((line) => {
            const isCurrent = activeLyricId === line.id && isPlaying;

            return (
              <motion.div
                key={line.id}
                animate={{
                  scale: isCurrent ? 1.03 : 0.98,
                  opacity: isCurrent ? 1 : 0.45,
                }}
                transition={{ duration: 0.2 }}
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
  );
}
