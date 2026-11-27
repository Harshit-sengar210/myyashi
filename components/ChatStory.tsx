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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

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
    }, 700);
  };

  const handleReplyChoice = (replyText: string, hindiText?: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `reply-${Date.now()}`,
        sender: "yashi",
        text: replyText,
        hindiText: hindiText,
        time: "Just now",
      },
    ]);

    setTimeout(() => {
      loadStep(currentStepIndex + 1);
    }, 450);
  };

  const currentStep = chatStory[currentStepIndex];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[370px] h-[640px] rounded-[32px] bg-white border border-rose-200/80 shadow-[0_15px_40px_rgba(225,29,72,0.12)] flex flex-col overflow-hidden text-[#3B122D]">
        {/* WhatsApp Romantic Top Header Bar */}
        <div className="px-4 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shadow-sm border border-white/30">
              H
            </div>
            <div>
              <h4 className="font-poppins text-sm font-semibold text-white flex items-center gap-1.5">
                <span>Harshit 💖</span>
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              </h4>
              <span className="text-[10px] font-poppins text-rose-100">
                {isTyping ? "typing..." : "online"}
              </span>
            </div>
          </div>

          <div className="text-[11px] font-poppins px-2 py-0.5 rounded-full bg-white/20 border border-white/30 text-white font-medium">
            WhatsApp Story ✨
          </div>
        </div>

        {/* Message Bubble Feed */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-3.5 select-text bg-[#FFF8FA]"
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
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm font-poppins leading-relaxed relative shadow-sm ${
                    isMe
                      ? "bg-white border border-rose-200 text-rose-950 font-medium rounded-tl-sm shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                      : "bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-tr-sm shadow-md"
                  }`}
                >
                  <p>{m.text}</p>
                  {m.hindiText && (
                    <p
                      className={`font-hindi text-[11px] mt-0.5 ${
                        isMe ? "text-rose-600 font-semibold" : "text-amber-200"
                      }`}
                    >
                      {m.hindiText}
                    </p>
                  )}

                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${
                      isMe ? "text-rose-950/50" : "text-rose-100"
                    }`}
                  >
                    <span>{m.time}</span>
                    <CheckCheck
                      className={`w-3 h-3 ${isMe ? "text-rose-500" : "text-white"}`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-rose-200 text-rose-500 w-20 shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-bounce [animation-delay:0.4s]" />
            </motion.div>
          )}

          {/* Completed State */}
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-2xl bg-white border border-rose-300 shadow-sm text-center my-4"
            >
              <span className="text-2xl">💖✨</span>
              <h5 className="font-playfair text-base font-bold text-rose-950 mt-1">
                Aur aisi hi hamari pyari baatein chalti rahengi!
              </h5>
              <p className="font-hindi text-xs text-rose-700 font-medium mt-1">
                हर्षित हमेशा तुम्हारी हर बात सुनने के लिए यहाँ है...
              </p>
            </motion.div>
          )}
        </div>

        {/* Bottom Interactive Reply Action Bar */}
        <div className="p-3 bg-white border-t border-rose-200 shadow-sm">
          {!isCompleted && currentStep && currentStep.replyOptions && (
            <div className="space-y-2">
              <span className="text-[10px] font-poppins text-rose-600 font-semibold block text-center uppercase tracking-wider">
                Yashi's Turn to Reply 🌸
              </span>
              <div className="flex flex-col gap-1.5">
                {currentStep.replyOptions.map((choice, cIdx) => (
                  <motion.button
                    key={cIdx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleReplyChoice(choice.text)}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl bg-rose-50/80 hover:bg-rose-100 border border-rose-200 text-xs font-poppins text-rose-950 font-semibold flex items-center justify-between min-h-[44px] transition-colors shadow-sm"
                  >
                    <span>{choice.text}</span>
                    <Send className="w-3.5 h-3.5 text-rose-500 ml-2 shrink-0" />
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {isCompleted && (
            <div className="text-center py-2 text-xs font-poppins text-rose-700 font-semibold">
              Chat ended with love 💕
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
