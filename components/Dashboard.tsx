"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Sparkles,
  X,
  Heart,
  Sun,
  Sunset,
  Moon,
  ArrowRight,
  Play,
  Pause,
  ArrowLeft,
  Volume2,
} from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";
import FriendshipCounter from "@/components/FriendshipCounter";
import MusicPlayer from "@/components/MusicPlayer";
import BottomNav from "@/components/BottomNav";
import HeartHero from "@/components/HeartHero";
import TiltCard3D from "@/components/TiltCard3D";
import dynamic from "next/dynamic";
import { APP_CONFIG } from "@/data/config";

// Lazy-load Journey Components for optimized performance
const DayToNight = dynamic(() => import("@/components/journey/DayToNight"), {
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center text-rose-400 text-xs font-poppins">
      Loading Journey... ✨
    </div>
  ),
});

const WordReveal = dynamic(() => import("@/components/journey/WordReveal"), {
  ssr: false,
});

const HeartFill = dynamic(() => import("@/components/journey/HeartFill"), {
  ssr: false,
});

const ShootingStars = dynamic(() => import("@/components/journey/ShootingStars"), {
  ssr: false,
});

interface DashboardProps {
  onReplaySplash?: () => void;
}

export default function Dashboard({ onReplaySplash }: DashboardProps) {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [timeGreeting, setTimeGreeting] = useState({
    text: "Hey Sweetie",
    hindi: "ख़ूबसूरत दिन मुबारक हो",
    icon: Sun,
  });

  // Modal State for "Jab se mila hu Yashi se tabse mera dhyan kahan hai"
  const [showDhyanModal, setShowDhyanModal] = useState(false);
  const aud3Ref = useRef<HTMLAudioElement | null>(null);
  const [isAud3Playing, setIsAud3Playing] = useState(false);

  // Easter Egg: Tapping "Yashi" 5 times
  const [eggTapCount, setEggTapCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    aud3Ref.current = new Audio("/audio/aud3.mp3");
    aud3Ref.current.loop = true;

    return () => {
      if (aud3Ref.current) {
        aud3Ref.current.pause();
        aud3Ref.current.currentTime = 0;
      }
    };
  }, []);

  const openDhyanScreen = () => {
    // 1. Pause Home screen music (loveyouji.mp3)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("yashi_pause_home_music"));
    }

    setShowDhyanModal(true);

    // 2. Play inside song (aud3.mp3)
    if (aud3Ref.current) {
      aud3Ref.current.currentTime = 0;
      aud3Ref.current.play().then(() => {
        setIsAud3Playing(true);
      }).catch(() => {});
    }

    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#E11D48", "#FB7185", "#F472B6", "#FFF1F2", "#F5D0A9"],
    });
  };

  const closeDhyanScreen = () => {
    setShowDhyanModal(false);

    // 1. Stop inside song (aud3.mp3)
    if (aud3Ref.current) {
      aud3Ref.current.pause();
      aud3Ref.current.currentTime = 0;
      setIsAud3Playing(false);
    }

    // 2. Resume Home screen music (loveyouji.mp3)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("yashi_resume_home_music"));
    }
  };

  const toggleAud3 = () => {
    if (!aud3Ref.current) return;
    if (aud3Ref.current.paused) {
      aud3Ref.current.play();
      setIsAud3Playing(true);
    } else {
      aud3Ref.current.pause();
      setIsAud3Playing(false);
    }
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setTimeGreeting({
        text: "Good Morning, Sweetie ☕",
        hindi: "आज का दिन तुम्हारे जितना ही प्यारा हो 🌸",
        icon: Sun,
      });
    } else if (hour >= 12 && hour < 17) {
      setTimeGreeting({
        text: "Good Afternoon, Sweetie ☀️",
        hindi: "लंच कर लिया ना? थोड़ा आराम भी करो 😊",
        icon: Sun,
      });
    } else if (hour >= 17 && hour < 22) {
      setTimeGreeting({
        text: "Good Evening, Sweetie 🌆",
        hindi: "शाम की ठंडी हवा और तुम्हारी याद ✨",
        icon: Sunset,
      });
    } else {
      setTimeGreeting({
        text: "Good Night, Sweetie 🌙",
        hindi: "मीठे सपनों की दुनिया में खो जाओ 😴",
        icon: Moon,
      });
    }

    const timer = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % APP_CONFIG.subtitles.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleYashiTap = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([30, 20, 30]);
    }

    const nextCount = eggTapCount + 1;
    setEggTapCount(nextCount);

    if (nextCount === 5) {
      setShowEasterEgg(true);
      setEggTapCount(0);
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.4 },
        colors: ["#FFF1F2", "#FBCFE8", "#E11D48"],
      });
    }
  };

  const GreetingIcon = timeGreeting.icon;

  return (
    <div className="relative min-h-full flex flex-col justify-between overflow-x-hidden selection:bg-rose-deep selection:text-white text-[#3B122D]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5F7] via-[#FFF0F4] to-[#FFE4E8] pointer-events-none -z-10" />
      <FloatingHearts count={16} interactive={true} />

      <div className="flex-1 p-5 pb-24 relative z-20">
        {/* Top Header bar with Time-based pill */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-rose-200/80 shadow-sm">
            <GreetingIcon className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-poppins uppercase tracking-wider text-rose-900 font-semibold">
              {timeGreeting.text}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onReplaySplash && (
              <button
                onClick={onReplaySplash}
                title="Replay intro animation"
                className="text-[11px] font-poppins text-rose-800/80 hover:text-rose-deep px-2.5 py-1 rounded-full bg-white/80 border border-rose-200 transition-all min-h-[44px] flex items-center shadow-sm"
              >
                Intro ✨
              </button>
            )}
            <MusicPlayer />
          </div>
        </div>

        {/* Greeting Card with rotating subtitle & Easter Egg on "Yashi" */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 text-center"
        >
          <h1 className="font-dancing text-4xl sm:text-5xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent drop-shadow-sm">
            Hey{" "}
            <span
              onClick={handleYashiTap}
              className="cursor-pointer active:scale-95 inline-block select-none transition-transform"
              title="Tap me ✨"
            >
              Yashi
            </span>{" "}
            🌸
          </h1>

          {/* Time greeting subtitle in Hindi */}
          <p className="font-hindi text-xs text-rose-800/90 mt-0.5 font-medium">
            {timeGreeting.hindi}
          </p>

          {/* Rotating Subtitle with smooth fade */}
          <div className="h-7 flex items-center justify-center mt-1">
            <AnimatePresence mode="wait">
              <motion.p
                key={subtitleIndex}
                initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="font-poppins text-xs text-rose-900/80 font-medium"
              >
                {APP_CONFIG.subtitles[subtitleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 1) HERO REVEAL: Couple Heart Masked Photo */}
        <HeartHero />

        {/* SPECIAL NEW FEATURE CARD: "Jab se mila hu Yashi se tabse mera dhyan kahan hai" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="my-5"
        >
          <div className="p-5 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-[0_15px_35px_rgba(225,29,72,0.3)] border border-pink-200/80 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-poppins uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-white/20 border border-white/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-200" /> Dil Ki Baat ✨
              </span>
              <span className="text-xs text-white/95 font-dancing text-lg">For Yashi 🌸</span>
            </div>

            <h3 className="font-playfair text-xl sm:text-2xl font-bold leading-snug drop-shadow-sm mt-1">
              "Jab se mila hu Yashi se..." 💭💖
            </h3>
            <p className="font-hindi text-sm text-rose-100 font-medium mt-1 leading-relaxed">
              तब से मेरा ध्यान कहाँ है? सच जानना चाहती हो?
            </p>

            <div className="mt-4 flex items-center justify-end">
              <motion.button
                onClick={openDhyanScreen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-full bg-white text-rose-600 font-poppins text-xs sm:text-sm font-bold shadow-md hover:bg-rose-50 transition-all flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
                <span>Jaaniye Yahan ➔</span>
              </motion.button>
            </div>

            <div className="absolute -bottom-8 -right-6 text-white/10 text-9xl pointer-events-none">
              ❤️
            </div>
          </div>
        </motion.div>

        {/* Live Days of Friendship Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="my-5"
        >
          <FriendshipCounter />
        </motion.div>

        {/* 4) 3D TILT CARD: Interactive Holographic Collage Card */}
        <TiltCard3D />

        {/* Long Cinematic Scroll Journey Sections */}
        <div className="mt-12 pt-6 border-t border-rose-200/60 w-full flex flex-col items-center">
          <div className="text-center mb-4">
            <span className="text-[10px] font-poppins uppercase tracking-widest text-rose-500 font-bold block mb-1">
              Scroll Down Together
            </span>
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#2B0E21]">
              Our Journey in Thoughts 🌌
            </h3>
            <p className="font-hindi text-xs text-rose-700 mt-0.5 font-medium">
              जैसे-जैसे नीचे जाओगे, दिल की बातें खुलती जाएंगी ✨
            </p>
          </div>

          <DayToNight />
          <WordReveal />
          <HeartFill />
          <ShootingStars />
        </div>
      </div>

      <BottomNav />

      {/* ANIMATED SCREEN MODAL: "Jab se mila hu Yashi se tabse mera dhyan kahan hai" with aud3.mp3 */}
      <AnimatePresence>
        {showDhyanModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/75 backdrop-blur-md overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0.7, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.7, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 220 }}
              className="relative w-full max-w-[380px] rounded-[36px] bg-gradient-to-b from-[#FFF5F7] via-[#FFE8ED] to-[#FFD5DF] border-2 border-rose-300 shadow-[0_20px_60px_rgba(225,29,72,0.45)] p-5 flex flex-col items-center text-center overflow-hidden max-h-[88vh] overflow-y-auto no-scrollbar"
            >
              {/* Header Navigation */}
              <div className="w-full flex items-center justify-between mb-2">
                <motion.button
                  onClick={closeDhyanScreen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-rose-700 hover:text-rose-900 border border-rose-200 text-xs font-poppins font-semibold shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </motion.button>

                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-[10px] font-poppins uppercase tracking-wider text-rose-600 font-bold px-2 py-0.5 rounded-full bg-white border border-rose-200">
                    Song Playing 🎵
                  </span>
                </div>

                <button
                  onClick={toggleAud3}
                  className="w-8 h-8 rounded-full bg-white text-rose-600 flex items-center justify-center shadow-sm border border-rose-200"
                >
                  {isAud3Playing ? <Pause className="w-4 h-4 fill-rose-600" /> : <Play className="w-4 h-4 fill-rose-600 ml-0.5" />}
                </button>
              </div>

              {/* Title Header */}
              <h3 className="font-playfair text-xl sm:text-2xl font-bold text-rose-950 mt-1 mb-0.5">
                "Jab se mila hu Yashi se..." 💭
              </h3>
              <p className="font-hindi text-sm text-rose-700 font-semibold mb-3">
                तब से मेरा सारा ध्यान सिर्फ तुम पर ही है ❤️
              </p>

              {/* Central Glowing Couple Heart Photo */}
              <div className="relative w-48 h-48 sm:w-52 sm:h-52 my-2 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-200 blur-2xl opacity-60"
                />

                <div
                  className="w-full h-full relative shadow-[0_15px_35px_rgba(225,29,72,0.4)]"
                  style={{
                    clipPath: "url(#dhyan-heart-clip)",
                    WebkitClipPath: "url(#dhyan-heart-clip)",
                  }}
                >
                  <Image
                    src="/images/couple.jpeg"
                    alt="Harshit and Yashi"
                    fill
                    priority
                    className="object-cover object-center scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-950/20 via-transparent to-pink-500/10" />
                </div>
              </div>

              {/* SVG Definition for Clip */}
              <svg width="0" height="0" className="absolute">
                <defs>
                  <clipPath id="dhyan-heart-clip" clipPathUnits="objectBoundingBox">
                    <path d="M 0.5, 0.88 C 0.1, 0.58, 0, 0.28, 0.22, 0.1 C 0.38, -0.04, 0.48, 0.12, 0.5, 0.2 C 0.52, 0.12, 0.62, -0.04, 0.78, 0.1 C 1, 0.28, 0.9, 0.58, 0.5, 0.88 Z" />
                  </clipPath>
                </defs>
              </svg>

              {/* Emotional Romantic Message Card */}
              <div className="z-10 mt-2 p-3.5 rounded-2xl bg-white/90 border border-rose-200/90 shadow-sm w-full text-center">
                <p className="font-dancing text-2xl text-rose-600 font-bold">
                  Sirf Tum Yashi 🌸
                </p>
                <p className="font-poppins text-xs text-rose-950 font-medium mt-1 leading-relaxed">
                  "Sach bolu toh... jab se tum meri life me aayi ho, subah ki pehli dhoop se lekar raat ke aakhri sapne tak, bas tumhara hi dhyan rehta hai."
                </p>
                <p className="font-hindi text-xs text-rose-800 font-semibold mt-1">
                  हर्षित का दिल हमेशा तुम्हारे ही पास है ✨
                </p>
              </div>

              {/* Close / Return Button */}
              <motion.button
                onClick={closeDhyanScreen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-7 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-poppins text-xs sm:text-sm font-bold shadow-glow border border-pink-200 flex items-center gap-2"
              >
                <span>Wapas Dashboard Par Aayein ✨</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Easter Egg Modal Popup */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEasterEgg(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, rotate: 5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative p-6 rounded-3xl bg-white border border-rose-200 shadow-2xl text-center max-w-xs"
            >
              <button
                onClick={() => setShowEasterEgg(false)}
                className="absolute top-3 right-3 text-rose-900/40 hover:text-rose-900"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-4xl mb-2">🌸✨</div>
              <h3 className="font-dancing text-2xl font-bold text-rose-600 mb-1">
                You found the secret!
              </h3>
              <p className="font-poppins text-xs text-rose-950 leading-relaxed">
                Yashi ko 5 baar tap karne par ye khula! Harshit loves you more than words can ever describe. ❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
