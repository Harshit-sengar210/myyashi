"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Send, CheckCheck, Sparkles, MessageCircle } from "lucide-react";
import { chatStory, ChatStep } from "@/data/chat";

interface MessageItem {
  id: string;
  sender: "me" | "yashi";
  text: string;
  hindiText?: string;
  time: string;
}

export default function ChatStory() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Initial step from "Me"
  useEffect(() => {
    loadStep(0);
  }, []);

  const loadStep = (stepIdx: number) => {
    if (stepIdx >= chatStory.length) {
      setIsCompleted(true);
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
      });
      return;
    }

    const step = chatStory[stepIdx];
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: step.sender,
          text: step.text,
          hindiText: step.hindiText,
          time: step.time,
        },
      ]);
      setCurrentStepIndex(stepIdx);
    }, 1200);
  };

  const handleReply = (replyText: string, nextStepId: number) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(25);
    }

    // Add Yashi's reply immediately
    setMessages((prev) => [
      ...prev,
      {
        id: `reply-${Date.now()}`,
        sender: "yashi",
        text: replyText,
        time: "Just now",
      },
    ]);

    // Load next step from "Me"
    const nextIdx = chatStory.findIndex((s) => s.id === nextStepId);
    if (nextIdx !== -1) {
      loadStep(nextIdx);
    } else {
      setIsCompleted(true);
    }
  };

  const currentStep = chatStory[currentStepIndex];
  const replyOptions = currentStep?.replyOptions || [];

  return (
    <div className="w-full flex flex-col items-center my-2">
      {/* WhatsApp-Style Chat Container */}
      <div className="w-full rounded-[32px] glass-card border border-pink-soft/30 overflow-hidden shadow-2xl flex flex-col h-[520px] bg-gradient-to-b from-[#1E0933]/90 via-[#150624]/95 to-[#0F031A]">
        {/* WhatsApp Chat Top Header */}
        <div className="px-4 py-3 bg-[#240c3c] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-deep to-pink-soft flex items-center justify-center text-white font-bold text-sm shadow-glow">
              H
            </div>
            <div>
              <h4 className="font-poppins text-sm font-semibold text-white flex items-center gap-1.5">
                <span>Harshit 💖</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h4>
              <span className="text-[10px] font-poppins text-pink-soft/70">
                {isTyping ? "typing..." : "online"}
              </span>
            </div>
          </div>

          <div className="text-[11px] font-poppins px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gold-accent">
            WhatsApp Story ✨
          </div>
        </div>

        {/* Message Bubble Feed */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-3.5 select-text"
        >
          {messages.map((m) => {
            const isMe = m.sender === "me";

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex flex-col ${isMe ? "items-start" : "items-end"}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-poppins leading-relaxed relative shadow-md ${
                    isMe
                      ? "bg-white/10 border border-white/15 text-white rounded-tl-sm"
                      : "bg-rose-deep text-white border border-pink-soft/40 rounded-tr-sm shadow-glow"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.hindiText && (
                    <p className="font-hindi text-[11px] text-gold-accent mt-0.5">
                      {m.hindiText}
                    </p>
                  )}

                  <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-pink-soft/60">
                    <span>{m.time}</span>
                    <CheckCheck className="w-3 h-3 text-pink-300" />
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Typing Indicator Bubble */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1 px-3.5 py-2 rounded-2xl bg-white/10 border border-white/10 w-16 text-pink-soft"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-pink-soft animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-pink-soft animate-bounce delay-150" />
              <span className="w-1.5 h-1.5 rounded-full bg-pink-soft animate-bounce delay-300" />
            </motion.div>
          )}

          {/* Completed Story Celebration Card */}
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-2xl glass-card-rose border border-pink-soft/40 text-center my-4"
            >
              <span className="text-3xl mb-1 block">💖</span>
              <h5 className="font-playfair text-base font-bold text-white">
                Tumhari Dosti Sabse Anmol Hai
              </h5>
              <p className="font-hindi text-xs text-gold-accent mt-1">
                हमेशा ऐसे ही मुस्कुराती रहना Sweetie ✨
              </p>
            </motion.div>
          )}
        </div>

        {/* Yashi's Interactive Reply Buttons Bar */}
        <div className="p-3 bg-[#1B0B2E]/90 border-t border-white/10">
          {!isTyping && replyOptions.length > 0 && !isCompleted ? (
            <div className="space-y-2">
              <span className="text-[10px] font-poppins text-pink-soft/70 block px-1">
                Choose Yashi's reply 👇
              </span>
              <div className="flex flex-col gap-1.5">
                {replyOptions.map((opt, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleReply(opt.text, opt.nextStepId)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full text-left px-3.5 py-2 rounded-xl glass-card border border-rose-deep/30 text-xs font-poppins text-blush hover:text-white hover:bg-rose-deep/20 flex items-center justify-between min-h-[44px]"
                  >
                    <span>{opt.text}</span>
                    <Send className="w-3.5 h-3.5 text-rose-400" />
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-2 text-xs font-poppins text-pink-soft/50">
              {isCompleted ? "End of story ✨" : "Main is typing a reply..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
