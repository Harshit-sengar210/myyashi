"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Mail,
  HelpCircle,
  HeartHandshake,
  Image,
  Music2,
  Sparkles,
  X,
  Heart,
  MessageCircle,
  Mic,
  Gift,
  Sun,
  Sunset,
  Moon,
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
  loading: () => <div className="h-96 flex items-center justify-center text-pink-soft/50 text-xs font-poppins">Loading Journey... ✨</div>,
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

const MENU_CARDS = [
  {
    title: "Sweetie's Chat",
    hindi: "हमारी चैट स्टोरी",
    icon: MessageCircle,
    href: "/chat",
    badge: "WhatsApp 💬",
    color: "from-emerald-500/20 via-teal-500/10 to-transparent",
    glow: "hover:shadow-glow",
    accent: "text-emerald-400",
  },
  {
    title: "Kyun Pasand Ho",
    hindi: "Reasons why I love you",
    icon: HeartHandshake,
    href: "/reasons",
    badge: "Reasons",
    color: "from-rose-deep/25 via-pink-500/10 to-transparent",
    glow: "hover:shadow-glow",
    accent: "text-pink-300",
  },
  {
    title: "Scratch Coupons",
    hindi: "प्यारे वाउचर",
    icon: Gift,
    href: "/coupons",
    badge: "Rewards 🎁",
    color: "from-amber-500/20 via-rose-500/10 to-transparent",
    glow: "hover:shadow-glow-gold",
    accent: "text-amber-400",
  },
  {
    title: "Voice Note",
    hindi: "मेरी आवाज़ में पैगाम",
    icon: Mic,
    href: "/voice",
    badge: "Audio 🎙️",
    color: "from-purple-500/20 via-pink-500/10 to-transparent",
    glow: "hover:shadow-glow-lavender",
    accent: "text-purple-400",
  },
  {
    title: "Our Song",
    hindi: "हमारा ख़ास गाना",
    icon: Music2,
    href: "/song",
    badge: "Melody",
    color: "from-lavender/20 via-rose-deep/15 to-transparent",
    glow: "hover:shadow-glow-lavender",
    accent: "text-purple-300",
  },
];

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

  // Easter Egg: Tapping "Yashi" 5 times
  const [eggTapCount, setEggTapCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    // 6. Time-based greeting in Hinglish
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
    // Vibration feedback on tap
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
    <div className="relative min-h-full flex flex-col justify-between overflow-x-hidden selection:bg-rose-deep selection:text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2A0845]/40 via-[#1B0B2E] to-[#120420] pointer-events-none -z-10" />
      <FloatingHearts count={16} interactive={true} />

      <div className="flex-1 p-5 pb-24 relative z-20">
        {/* Top Header bar with Time-based pill */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card border-rose-deep/30">
            <GreetingIcon className="w-3.5 h-3.5 text-gold-accent" />
            <span className="text-[10px] font-poppins uppercase tracking-wider text-pink-soft font-medium">
              {timeGreeting.text}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onReplaySplash && (
              <button
                onClick={onReplaySplash}
                title="Replay intro animation"
                className="text-[11px] font-poppins text-pink-soft/60 hover:text-pink-soft px-2.5 py-1 rounded-full glass-card border border-pink-soft/10 transition-all min-h-[44px] flex items-center"
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
          <h1 className="font-dancing text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-soft via-[#F5D0A9] to-rose-deep bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(225,29,72,0.5)]">
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
          <p className="font-hindi text-xs text-gold-accent/90 mt-0.5">
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
                className="font-poppins text-xs text-blush/80 font-medium"
              >
                {APP_CONFIG.subtitles[subtitleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 1) HERO REVEAL: Couple Heart Masked Photo */}
        <HeartHero />

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

        {/* Grid of Menu Cards with Staggered entrance */}
        <div className="grid grid-cols-2 gap-3.5 mb-6">
          {MENU_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 25, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + idx * 0.05,
                  ease: "easeOut",
                }}
              >
                <Link href={card.href} className="block group h-full">
                  <motion.div
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={`h-full p-4 rounded-3xl glass-card bg-gradient-to-b ${card.color} border border-pink-soft/20 transition-all duration-300 flex flex-col justify-between ${card.glow} relative overflow-hidden min-h-[140px]`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-2xl bg-white/10 backdrop-blur-md ${card.accent}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-pink-soft/80 font-poppins">
                        {card.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-playfair text-base font-semibold text-blush group-hover:text-white transition-colors leading-snug">
                        {card.title}
                      </h3>
                      <p className="font-hindi text-xs text-gold-accent/90 mt-1 line-clamp-1">
                        {card.hindi}
                      </p>
                    </div>

                    <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-rose-deep/20 rounded-full blur-xl group-hover:bg-rose-deep/40 transition-colors pointer-events-none" />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Long Cinematic Scroll Journey Sections */}
        <div className="mt-12 pt-6 border-t border-white/10 w-full flex flex-col items-center">
          <div className="text-center mb-4">
            <span className="text-[10px] font-poppins uppercase tracking-widest text-pink-soft font-semibold block mb-1">
              Scroll Down Together
            </span>
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white">
              Our Journey in Thoughts 🌌
            </h3>
            <p className="font-hindi text-xs text-gold-accent mt-0.5">
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

      {/* Hidden Easter Egg Modal Popup */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEasterEgg(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xs rounded-3xl glass-card-rose p-6 border border-pink-soft/40 shadow-glow text-center cursor-default"
            >
              <button
                onClick={() => setShowEasterEgg(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center min-h-[44px]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-4xl mb-3">🤍</div>
              <h4 className="font-dancing text-2xl text-white font-bold mb-2">
                Secret Note!
              </h4>
              <p className="font-poppins text-sm text-blush font-medium leading-relaxed mb-4">
                "{APP_CONFIG.easterEggText}"
              </p>
              <div className="text-[11px] font-hindi text-gold-accent">
                तुमने सीक्रेट खोज लिया ✨
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
