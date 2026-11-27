"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Mail, HelpCircle, Image as ImageIcon, Gift } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home, isSecret: false },
    { label: "Letters", href: "/letters", icon: Mail, isSecret: false },
    { label: "Questions", href: "/questions", icon: HelpCircle, isSecret: false },
    { label: "Memories", href: "/memories", icon: ImageIcon, isSecret: false },
    { label: "Secret 🎁", href: "/surprise", icon: Gift, isSecret: true },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:absolute sm:bottom-0 p-3 pb-safe z-50 bg-gradient-to-t from-[#160626] via-[#160626]/95 to-transparent pointer-events-auto">
      <nav className="max-w-[390px] mx-auto glass-card rounded-full px-2 py-1.5 border border-pink-soft/25 backdrop-blur-2xl flex items-center justify-around shadow-[0_4px_25px_rgba(27,11,46,0.8)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative min-w-[50px] min-h-[44px] flex flex-col items-center justify-center group"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center gap-0.5 transition-colors ${
                  item.isSecret
                    ? isActive
                      ? "text-gold-accent font-semibold"
                      : "text-gold-accent/80 hover:text-gold-accent"
                    : isActive
                    ? "text-rose-deep font-semibold"
                    : "text-pink-soft/60 hover:text-pink-soft"
                }`}
              >
                <div className="relative">
                  <IconComponent
                    className={`w-5 h-5 ${
                      item.isSecret && !isActive ? "animate-pulse" : ""
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="nav-glow"
                      className={`absolute -inset-1 rounded-full blur-sm -z-10 ${
                        item.isSecret ? "bg-gold-accent/40" : "bg-rose-deep/30"
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-[9.5px] font-poppins leading-tight ${
                    isActive ? "font-semibold text-blush" : "font-normal"
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
