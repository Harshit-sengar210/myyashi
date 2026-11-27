"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Frown, ArrowLeft, X, Play, Pause, ArrowRight, Volume2 } from "lucide-react";

interface LoveProposalProps {
  onAccept: () => void;
}

interface FallingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

const FUNNY_NO_MESSAGES = [
  "No dabane ki galti mat karna! 🥺💔",
  "Are you serious?! Aise thodi hota hai! 😭",
  "No you can not do this to me! 😤💔",
  "Mummy ko bata dunga tumne No dabaya! 😭🥺",
  "Dil ke tukde tukde kar diye tumne... 💔😭",
  "Ek baar aur socho Sweetie, please?! 🥺👉👈",
  "Ye button ab nahi dabne wala, bhool jao! 🏃💨",
  "Aise kaisse No?! Harshit ro dega abhi! 😿",
  "Fine, par main haar nahi maanunga! 💖",
];

const FUNNY_OPTION_NO_MESSAGES = [
  "Nahi dekhna?! Aise kaise nahi dekhna! 😤💔",
  "Dil ke andar sirf tum ho, ek baar dekh toh lo! 🥺👉👈",
  "Option 2 dabana strictly prohibited hai! 😂🙅‍♂️",
  "No dabane se kuch nahi hoga, dil me toh tum hi ho! 💖",
  "Pakad ke dikhao button ko! 🏃💨",
  "Please Option 1 daba do na Sweetie! 🥺🙏",
  "Harshit ki feelings ke sath mat khelo! 😭💔",
];

const FUNNY_BUTTON_TEXTS = [
  "No ❌",
  "Nahi matlab sach me? 🥺",
  "No you can't do this! 💔",
  "Soch lo ek baar aur! 😢",
  "Please Yes bol do na! 👉👈",
  "Pakad ke dikhao button! 🏃",
  "Galti se click ho gaya na? 😭",
  "Ab toh No button hi bhaag gaya! 😂",
];

const FUNNY_OPTION_NO_TEXTS = [
  "Option 2: Mujhe nahi dekhna 🙈",
  "Nahi matlab sach me nahi dekhna? 🥺",
  "Arey ruk jao, Option 1 daba do! 🏃",
  "Nahi dekhogi toh pachhtaogi! 😂",
  "Ye button toh bhaag gaya! 💨",
  "Please ek baar dekh lo na! 👉👈",
];

export default function LoveProposal({ onAccept }: LoveProposalProps) {
  // Steps in Onboarding:
  // 1: "question" -> Yes/No Question
  // 2: "choose_option" -> Choose One: Harshit ke dil ke andar jaana vs runaway No
  // 3: "inside_heart" -> Zoomed deep inside Harshit's heart (yashi.png)
  // 4: "ask_love_check" -> "Agar tumko pyar nahi hai toh batao..."
  // 5: "video_reaction" -> Animated video playback screen (vid1.mp4)
  // 6: "celebrate_yes" -> Celebrating she said "Nahi baba, I love you!" with cutu1.mp4, couple photo and aud2.mp3
  const [step, setStep] = useState<
    "question" | "choose_option" | "inside_heart" | "ask_love_check" | "video_reaction" | "celebrate_yes"
  >("question");

  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const [optionNoCount, setOptionNoCount] = useState(0);
  const [optionNoPos, setOptionNoPos] = useState({ x: 0, y: 0 });
  const [optionDrama, setOptionDrama] = useState<string | null>(null);

  const [loveCheckNoPos, setLoveCheckNoPos] = useState({ x: 0, y: 0 });
  const [loveCheckDrama, setLoveCheckDrama] = useState<string | null>(null);
  const [loveCheckNoCount, setLoveCheckNoCount] = useState(0);

  const [fallingHearts, setFallingHearts] = useState<FallingHeart[]>([]);
  const [emotionalDrama, setEmotionalDrama] = useState<string | null>(null);

  // Video state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Background Audio state for Dil Ke Andar phase (aud1.mp3)
  const dilAudioRef = useRef<HTMLAudioElement | null>(null);

  // Background Audio state for Celebrate Yes phase (aud2.mp3)
  const celebrateAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    dilAudioRef.current = new Audio("/audio/aud1.mp3");
    dilAudioRef.current.loop = true;

    celebrateAudioRef.current = new Audio("/audio/aud2.mp3");
    celebrateAudioRef.current.loop = true;

    return () => {
      if (dilAudioRef.current) {
        dilAudioRef.current.pause();
        dilAudioRef.current.currentTime = 0;
      }
      if (celebrateAudioRef.current) {
        celebrateAudioRef.current.pause();
        celebrateAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Generate falling hearts from upper screen
  useEffect(() => {
    const emojis = ["💖", "❤️", "💕", "🌸", "✨", "🥰", "💘"];
    const items: FallingHeart[] = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 92 + 4,
      size: Math.random() * 16 + 14,
      duration: Math.random() * 3 + 3.5,
      delay: Math.random() * 4,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setFallingHearts(items);
  }, []);

  // When "No" is clicked or hovered on Question screen
  const handleNoClick = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    const msg = FUNNY_NO_MESSAGES[Math.min(nextCount - 1, FUNNY_NO_MESSAGES.length - 1)];
    setEmotionalDrama(msg);

    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 180;
    setNoPos({ x: randomX, y: randomY });
  };

  // When "No / Option 2" is clicked or hovered on Choose Option screen
  const handleOptionNoClick = () => {
    const nextCount = optionNoCount + 1;
    setOptionNoCount(nextCount);

    const msg =
      FUNNY_OPTION_NO_MESSAGES[
        Math.min(nextCount - 1, FUNNY_OPTION_NO_MESSAGES.length - 1)
      ];
    setOptionDrama(msg);

    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 120;
    setOptionNoPos({ x: randomX, y: randomY });
  };

  // When "Yes" is clicked -> Transition to "Choose One" step
  const handleYesClick = () => {
    confetti({
      particleCount: 75,
      spread: 85,
      origin: { y: 0.6 },
      colors: ["#E11D48", "#FB7185", "#F472B6", "#FFF1F2", "#F5D0A9"],
    });

    setStep("choose_option");
  };

  // When she chooses option 1: "Harshit ke dil ke andar jaana"
  const handleGoInsideHeart = () => {
    setStep("inside_heart");

    // Play aud1.mp3 background song during this screen
    if (dilAudioRef.current) {
      dilAudioRef.current.currentTime = 0;
      dilAudioRef.current.play().catch(() => {
        // Handle browser autoplay policy gracefully
      });
    }

    confetti({
      particleCount: 85,
      spread: 90,
      origin: { y: 0.5 },
      colors: ["#E11D48", "#FB7185", "#F472B6", "#FFF1F2", "#F5D0A9"],
    });
  };

  // Transition from inside heart to "Agar tumko pyar nahi hai toh batao"
  const handleProceedToLoveCheck = () => {
    // Stop the song when clicking Aage Dekho (Next)
    if (dilAudioRef.current) {
      dilAudioRef.current.pause();
      dilAudioRef.current.currentTime = 0;
    }
    setStep("ask_love_check");
  };

  // When clicking "Yes, I don't love you" -> Open animated video screen
  const handleTriggerVideoReaction = () => {
    setStep("video_reaction");
  };

  // When she clicks "Nahi baba, I love you!" -> Open funny celebration screen with cutu1, couple photo and aud2 song
  const handleLoveCheckAlternativeClick = () => {
    setStep("celebrate_yes");

    if (celebrateAudioRef.current) {
      celebrateAudioRef.current.currentTime = 0;
      celebrateAudioRef.current.play().catch(() => {});
    }

    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#E11D48", "#FB7185", "#F472B6", "#FFF1F2", "#F5D0A9"],
    });
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  // Finish onboarding and open Home Dashboard
  const handleFinishAndGoHome = () => {
    if (dilAudioRef.current) {
      dilAudioRef.current.pause();
      dilAudioRef.current.currentTime = 0;
    }
    if (celebrateAudioRef.current) {
      celebrateAudioRef.current.pause();
      celebrateAudioRef.current.currentTime = 0;
    }
    onAccept();
  };

  const currentNoText =
    FUNNY_BUTTON_TEXTS[Math.min(noCount, FUNNY_BUTTON_TEXTS.length - 1)];

  const currentOptionNoText =
    FUNNY_OPTION_NO_TEXTS[
      Math.min(optionNoCount, FUNNY_OPTION_NO_TEXTS.length - 1)
    ];

  const yesScale = Math.min(1 + noCount * 0.12, 1.6);
  const optionYesScale = Math.min(1 + optionNoCount * 0.08, 1.3);

  return (
    <div className="relative w-full h-full min-h-[844px] flex flex-col items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-[#FFE8ED] to-[#FFDDE4] select-none text-[#3B122D]">
      {/* SVG ClipPath Definitions */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="proposal-heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5, 0.88 C 0.1, 0.58, 0, 0.28, 0.22, 0.1 C 0.38, -0.04, 0.48, 0.12, 0.5, 0.2 C 0.52, 0.12, 0.62, -0.04, 0.78, 0.1 C 1, 0.28, 0.9, 0.58, 0.5, 0.88 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Continuous Falling Love / Hearts From Upper Screen */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {fallingHearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ y: -50, x: `${h.x}%`, opacity: 0, rotate: -20 }}
            animate={{
              y: ["0vh", "105vh"],
              opacity: [0, 1, 1, 0],
              rotate: [0, 45, -45, 90],
              x: [`${h.x}%`, `${h.x + (h.id % 2 === 0 ? 5 : -5)}%`],
            }}
            transition={{
              duration: h.duration,
              repeat: Infinity,
              delay: h.delay,
              ease: "linear",
            }}
            style={{ fontSize: `${h.size}px` }}
            className="absolute top-0 filter drop-shadow-[0_2px_8px_rgba(225,29,72,0.3)]"
          >
            {h.emoji}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE 1: YES OR NO QUESTION */}
        {step === "question" && (
          <motion.div
            key="question-phase"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.45 }}
            className="w-full flex flex-col items-center justify-center z-10"
          >
            {/* Center Heart-Masked Couple Image */}
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center my-2">
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.55, 0.85, 0.55],
                }}
                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                className="absolute inset-1 rounded-full bg-gradient-to-tr from-rose-400 via-pink-300 to-amber-200 blur-2xl -z-10"
              />

              <motion.span
                animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
                className="absolute -top-2 -left-2 text-2xl text-amber-500"
              >
                ✨
              </motion.span>
              <motion.span
                animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2.2, delay: 0.8 }}
                className="absolute -bottom-1 -right-1 text-2xl text-rose-500"
              >
                💖
              </motion.span>

              <div
                className="w-full h-full relative shadow-[0_15px_35px_rgba(225,29,72,0.35)]"
                style={{
                  clipPath: "url(#proposal-heart-clip)",
                  WebkitClipPath: "url(#proposal-heart-clip)",
                }}
              >
                <Image
                  src="/images/couple.jpeg"
                  alt="Harshit and Yashi"
                  fill
                  priority
                  className="object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 via-transparent to-pink-500/15 mix-blend-overlay" />
              </div>
            </div>

            {/* Dancing Script Sweet Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-dancing text-2xl sm:text-3xl text-rose-600 font-bold mt-2 filter drop-shadow-sm"
            >
              Sweetie... ek sachha sawaal 🌸
            </motion.p>

            {/* Proposal Question */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center max-w-xs px-2 mb-3"
            >
              <h2 className="font-playfair text-xl sm:text-2xl font-bold text-rose-950 leading-snug">
                "Do you really like Harshit, Yashii??" 💖
              </h2>
              <p className="font-hindi text-sm text-rose-700/90 mt-1 font-medium">
                सच-सच बताना... क्या तुम हर्षित को पसंद करती हो? 🥺
              </p>
            </motion.div>

            {/* Emotional Funny Drama Toast */}
            <div className="h-14 w-full max-w-xs flex items-center justify-center mb-1 px-2">
              <AnimatePresence mode="wait">
                {emotionalDrama && (
                  <motion.div
                    key={noCount}
                    initial={{ scale: 0.7, opacity: 0, y: -10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 10 }}
                    className="p-2.5 px-4 rounded-2xl bg-white border border-rose-400 shadow-[0_8px_25px_rgba(225,29,72,0.2)] backdrop-blur-md flex items-center gap-2 text-center"
                  >
                    <Frown className="w-5 h-5 text-rose-500 shrink-0 animate-bounce" />
                    <p className="text-xs sm:text-sm font-poppins text-rose-900 font-bold leading-tight">
                      {emotionalDrama}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* YES & RUNAWAY NO BUTTONS */}
            <div className="flex items-center justify-center gap-4 w-full max-w-xs mt-1 min-h-[90px]">
              <motion.button
                onClick={handleYesClick}
                style={{ transform: `scale(${yesScale})` }}
                whileHover={{ scale: yesScale * 1.08 }}
                whileTap={{ scale: yesScale * 0.95 }}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-poppins text-sm sm:text-base font-bold shadow-[0_8px_25px_rgba(225,29,72,0.45)] border border-pink-200 flex items-center gap-2 z-30 transition-transform duration-200"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>YES, I DO! 💖</span>
              </motion.button>

              <motion.button
                onClick={handleNoClick}
                onMouseEnter={handleNoClick}
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                className="px-4 py-2.5 rounded-full bg-white/80 hover:bg-white text-rose-900 font-poppins text-xs sm:text-sm border border-rose-300 backdrop-blur-md shadow-sm flex items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <span>{currentNoText}</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: "CHOOSE ONE" OPTION CARD WITH RUNAWAY NO OPTION */}
        {step === "choose_option" && (
          <motion.div
            key="choose-option-phase"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-full max-w-xs flex flex-col items-center text-center z-10"
          >
            <div className="text-5xl mb-2 animate-bounce">🥰💍</div>

            <h3 className="font-dancing text-3xl font-bold text-rose-600 mb-1">
              Yayyy, I knew it Sweetie! 💖
            </h3>
            <p className="font-hindi text-xs text-rose-800 font-medium mb-3">
              अब तुम्हारे लिए एक ख़ास सरप्राइज है, choose one:
            </p>

            {/* Funny Drama Toast for Option screen */}
            <div className="h-12 w-full flex items-center justify-center mb-2 px-2">
              <AnimatePresence mode="wait">
                {optionDrama && (
                  <motion.div
                    key={optionNoCount}
                    initial={{ scale: 0.7, opacity: 0, y: -8 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 8 }}
                    className="p-2 px-3.5 rounded-2xl bg-white border border-rose-400 shadow-[0_8px_20px_rgba(225,29,72,0.2)] backdrop-blur-md flex items-center gap-2 text-center"
                  >
                    <Frown className="w-4 h-4 text-rose-500 shrink-0 animate-bounce" />
                    <p className="text-[11px] sm:text-xs font-poppins text-rose-900 font-bold leading-tight">
                      {optionDrama}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* The Option 1 Card: Harshit ke dil ke andar jaana */}
            <motion.div
              style={{ transform: `scale(${optionYesScale})` }}
              whileHover={{ scale: optionYesScale * 1.02 }}
              className="w-full p-5 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-[0_15px_35px_rgba(225,29,72,0.35)] border border-pink-200/80 text-left relative overflow-hidden transition-transform duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-poppins uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-white/20 border border-white/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-200" /> Option 1 ✨
                </span>
                <span className="text-xs text-white/90 font-dancing text-lg">Special</span>
              </div>

              <h4 className="font-playfair text-xl font-bold leading-snug drop-shadow-sm">
                Harshit ke dil ke andar jaana ❤️
              </h4>
              <p className="font-hindi text-xs text-rose-100 mt-1 leading-relaxed">
                देखना चाहती हो हर्षित के दिल के अंदर कौन रहता है? टैप करो!
              </p>

              <div className="mt-4 flex items-center justify-end">
                <motion.button
                  onClick={handleGoInsideHeart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-full bg-white text-rose-600 font-poppins text-xs font-bold shadow-md hover:bg-rose-50 transition-all flex items-center gap-1.5"
                >
                  <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
                  <span>Dil ke andar jao ➔</span>
                </motion.button>
              </div>

              <div className="absolute -bottom-6 -right-6 text-white/10 text-8xl pointer-events-none">
                ❤️
              </div>
            </motion.div>

            {/* Runaway No Option Button */}
            <div className="w-full flex items-center justify-center mt-4 min-h-[50px] relative">
              <motion.button
                onClick={handleOptionNoClick}
                onMouseEnter={handleOptionNoClick}
                animate={{ x: optionNoPos.x, y: optionNoPos.y }}
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                className="px-4 py-2 rounded-full bg-white/80 hover:bg-white text-rose-800 font-poppins text-xs border border-rose-300/80 backdrop-blur-md shadow-sm flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>{currentOptionNoText}</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* PHASE 3: ZOOM DEEP INSIDE HARSHIT'S HEART */}
        {step === "inside_heart" && (
          <motion.div
            key="inside-heart-phase"
            initial={{ scale: 0.1, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.1, rotate: 20, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 18,
              stiffness: 160,
              duration: 0.7,
            }}
            className="w-full max-w-[380px] rounded-[36px] bg-gradient-to-b from-[#FFF5F7] via-[#FFE8ED] to-[#FFD5DF] border-2 border-rose-300 shadow-[0_20px_60px_rgba(225,29,72,0.4)] p-6 flex flex-col items-center text-center overflow-hidden z-20"
          >
            {/* Glowing Heart Ambient Background */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.35, 0.65, 0.35],
              }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="absolute inset-8 rounded-full bg-gradient-to-tr from-rose-400 via-pink-300 to-amber-200 blur-3xl -z-10"
            />

            {/* Header / Title */}
            <div className="z-10 mt-1 mb-2">
              <span className="text-[11px] font-poppins uppercase tracking-widest text-rose-500 font-bold px-3 py-1 rounded-full bg-rose-100 border border-rose-200">
                Harshit Ka Dil ❤️
              </span>
              <h2 className="font-playfair text-2xl font-bold text-rose-950 mt-2">
                "Dil ke andar to aap ho ji!" 💖
              </h2>
              <p className="font-hindi text-sm text-rose-800 font-medium mt-0.5">
                हर्षित के दिल के सबसे ख़ास कोने में सिर्फ तुम्हारी जगह है ✨
              </p>
            </div>

            {/* Her Photo (yashi.png) Revealed inside Heart Mask */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="relative w-52 h-52 sm:w-56 sm:h-56 my-2 flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 blur-xl opacity-60"
              />

              <div
                className="w-full h-full relative shadow-[0_15px_35px_rgba(225,29,72,0.4)]"
                style={{
                  clipPath: "url(#proposal-heart-clip)",
                  WebkitClipPath: "url(#proposal-heart-clip)",
                }}
              >
                <Image
                  src="/images/yashi.png"
                  alt="Yashi in Harshit's Heart"
                  fill
                  priority
                  className="object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/20 via-transparent to-pink-500/10" />
              </div>
            </motion.div>

            {/* Sweet Message */}
            <div className="z-10 mt-2 p-3.5 rounded-2xl bg-white/80 border border-rose-200/80 shadow-sm max-w-xs">
              <p className="font-dancing text-2xl text-rose-600 font-bold">
                Sirf aur sirf Yashi (Sweetie) 🌸
              </p>
              <p className="font-poppins text-xs text-rose-900/80 mt-1 leading-relaxed">
                Har dhadkan me, har khushi me, aur har pal me... tum hamesha mere dil ke andar rehti ho.
              </p>
            </div>

            {/* Next Action Button: Proceed to Love Check Screen */}
            <motion.button
              onClick={handleProceedToLoveCheck}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-poppins text-xs sm:text-sm font-semibold shadow-glow border border-pink-200 flex items-center gap-2"
            >
              <span>Aage Dekho (Next)</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {/* PHASE 4: "AGAR TUMKO PYAR NAHI HAI TO BATAO..." SCREEN */}
        {step === "ask_love_check" && (
          <motion.div
            key="ask-love-check-phase"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-xs flex flex-col items-center text-center z-10"
          >
            <div className="text-5xl mb-2 animate-bounce">🥺💔</div>

            <span className="text-[10px] font-poppins uppercase tracking-widest text-rose-500 font-bold px-3 py-1 rounded-full bg-white/80 border border-rose-200 mb-2 shadow-sm">
              Sachha Faisla 🌸
            </span>

            <h3 className="font-playfair text-2xl font-bold text-rose-950 mb-1 leading-snug">
              "Agar tumko pyar nahi hai toh batao..."
            </h3>
            <p className="font-hindi text-xs text-rose-800 font-medium mb-4">
              अगर ऐसा है, तो सच-सच बता दो स्वीटी... 🥺
            </p>

            {/* Toast when trying runaway option */}
            <div className="h-10 w-full flex items-center justify-center mb-2 px-2">
              <AnimatePresence mode="wait">
                {loveCheckDrama && (
                  <motion.div
                    key={loveCheckNoCount}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="p-1.5 px-3 rounded-xl bg-white border border-rose-300 shadow-sm text-center"
                  >
                    <p className="text-[11px] font-poppins text-rose-800 font-bold">
                      {loveCheckDrama}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* "Yes, I don't love you" Card - Clean & Center-Aligned */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-full p-5 rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white shadow-[0_15px_35px_rgba(225,29,72,0.35)] border border-pink-200 text-center relative overflow-hidden flex flex-col items-center"
            >
              <h4 className="font-playfair text-xl font-bold leading-snug drop-shadow-sm">
                Yes, I don't love you 💔
              </h4>
              <p className="font-hindi text-xs text-rose-100 mt-1 max-w-[260px]">
                अगर सच में प्यार नहीं है... तो यहाँ टैप करके देखो क्या होता है!
              </p>

              <div className="mt-4 flex items-center justify-center w-full">
                <motion.button
                  onClick={handleTriggerVideoReaction}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 rounded-full bg-white text-rose-700 font-poppins text-xs font-bold shadow-md hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-rose-700" />
                  <span>Tap to see reaction ➔</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Fixed button: "Nahi baba, I love you!" */}
            <div className="w-full flex items-center justify-center mt-4 min-h-[48px] relative">
              <motion.button
                onClick={handleLoveCheckAlternativeClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-poppins text-xs sm:text-sm font-bold border border-rose-300 shadow-md flex items-center gap-2 cursor-pointer transition-all"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Nahi baba, I love you! 🥰💖</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* PHASE 5: ANIMATED VIDEO REACTION SCREEN (D:\yashi\public\images\vid1.mp4) */}
        {step === "video_reaction" && (
          <motion.div
            key="video-reaction-phase"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="w-full max-w-[380px] rounded-[36px] bg-gradient-to-b from-[#FFF5F7] via-[#FFE8ED] to-[#FFD5DF] border-2 border-rose-300 shadow-[0_20px_60px_rgba(225,29,72,0.4)] p-5 flex flex-col items-center text-center overflow-hidden z-20"
          >
            {/* Header with Back Button */}
            <div className="w-full flex items-center justify-between mb-2">
              <motion.button
                onClick={() => setStep("ask_love_check")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-rose-700 hover:text-rose-900 border border-rose-200 text-xs font-poppins font-semibold shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </motion.button>

              <div className="flex items-center gap-1.5">
                <span className="text-lg">🎬</span>
                <span className="text-[11px] font-poppins uppercase tracking-wider text-rose-600 font-bold">
                  Reaction Video
                </span>
              </div>

              <span className="text-[11px] font-poppins text-rose-800/80 bg-white/80 px-2.5 py-0.5 rounded-full border border-rose-200 font-medium">
                For Sweetie 💖
              </span>
            </div>

            <h3 className="font-playfair text-xl font-bold text-rose-950 mb-0.5">
              "Aise kaise I don't love you?!" 🥺
            </h3>
            <p className="font-hindi text-xs text-rose-800 font-medium mb-3">
              ये देखो तुम्हारे लिए क्या खास रिकॉर्ड किया है ✨
            </p>

            {/* Video Container with Rounded Borders & Glow */}
            <div className="relative w-full aspect-[9/16] max-h-[360px] rounded-2xl overflow-hidden bg-black shadow-lg border-2 border-rose-300 flex items-center justify-center">
              <video
                ref={videoRef}
                src="/images/vid1.mp4"
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              />

              {/* Tap overlay to Play/Pause */}
              <button
                onClick={toggleVideoPlayback}
                className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors group"
              >
                {!isVideoPlaying && (
                  <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                )}
              </button>
            </div>

            {/* Message under Video */}
            <p className="font-dancing text-xl text-rose-600 font-bold mt-3">
              Ab toh sach bol do... You love me na? 🥰
            </p>
            <p className="font-poppins text-xs text-rose-900/80 mt-0.5">
              Sach sach batao... ab toh man jao na! 🥺
            </p>

            {/* Action Button: Only Back button */}
            <div className="mt-4 flex items-center justify-center w-full">
              <motion.button
                onClick={() => setStep("ask_love_check")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-full bg-white text-rose-700 font-poppins text-xs sm:text-sm font-semibold shadow-md border border-rose-300 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Peeche Jao (Back)</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* PHASE 6: CELEBRATION SCREEN FOR "Nahi baba, I love you!" WITH cutu1.mp4, BOTH PHOTO & aud2.mp3 */}
        {step === "celebrate_yes" && (
          <motion.div
            key="celebrate-yes-phase"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="w-full max-w-[380px] rounded-[36px] bg-gradient-to-b from-[#FFF5F7] via-[#FFE8ED] to-[#FFD5DF] border-2 border-rose-300 shadow-[0_20px_60px_rgba(225,29,72,0.4)] p-5 flex flex-col items-center text-center overflow-hidden z-20 max-h-[85vh] overflow-y-auto no-scrollbar"
          >
            {/* Top Navigation */}
            <div className="w-full flex items-center justify-between mb-2">
              <motion.button
                onClick={() => {
                  if (celebrateAudioRef.current) {
                    celebrateAudioRef.current.pause();
                    celebrateAudioRef.current.currentTime = 0;
                  }
                  setStep("ask_love_check");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-rose-700 hover:text-rose-900 border border-rose-200 text-xs font-poppins font-semibold shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </motion.button>

              <span className="text-[10px] font-poppins uppercase tracking-widest text-rose-600 font-bold px-2.5 py-0.5 rounded-full bg-white border border-rose-200 shadow-sm">
                Party Time 🥳💖
              </span>
            </div>

            {/* Funny Happy Title */}
            <h3 className="font-dancing text-2xl sm:text-3xl font-bold text-rose-600 mb-0.5">
              Yayyy! She Said YES! 💃🥰
            </h3>
            <p className="font-hindi text-xs text-rose-800 font-medium mb-3">
              मुझे पहले से पता था कि तुम मुझसे बहुत प्यार करती हो! ✨
            </p>

            {/* 1) Cutu Funny Animation Video (cutu1.mp4) */}
            <div className="w-full rounded-2xl overflow-hidden bg-black/5 border border-rose-300/80 shadow-md mb-3 relative flex items-center justify-center max-h-[170px]">
              <video
                src="/images/cutu1.mp4"
                autoPlay
                loop
                playsInline
                muted
                className="w-full max-h-[170px] object-contain rounded-2xl"
              />
            </div>

            {/* 2) Our Both Photo (couple.jpeg) with Glowing Aura */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 my-1 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 blur-xl opacity-60"
              />

              <div
                className="w-full h-full relative shadow-[0_15px_35px_rgba(225,29,72,0.4)]"
                style={{
                  clipPath: "url(#proposal-heart-clip)",
                  WebkitClipPath: "url(#proposal-heart-clip)",
                }}
              >
                <Image
                  src="/images/couple.jpeg"
                  alt="Harshit and Yashi Together"
                  fill
                  priority
                  className="object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/20 via-transparent to-pink-500/10" />
              </div>
            </div>

            {/* Sweet Romantic Caption */}
            <div className="z-10 mt-2 p-3.5 rounded-2xl bg-white/85 border border-rose-200/80 shadow-sm w-full">
              <p className="font-dancing text-xl text-rose-600 font-bold">
                Harshit ❤️ Yashi (Sweetie)
              </p>
              <p className="font-poppins text-xs text-rose-900/85 mt-0.5 leading-relaxed font-medium">
                "Ab koi shaq nahi... Tum meri ho aur main tumhara! Always and forever."
              </p>
            </div>

            {/* Go to Home Screen Now Button */}
            <motion.button
              onClick={handleFinishAndGoHome}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-3.5 w-full py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-poppins text-xs sm:text-sm font-bold shadow-glow border border-pink-200 flex items-center justify-center gap-2"
            >
              <span>Go to Home Screen Now ✨</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
