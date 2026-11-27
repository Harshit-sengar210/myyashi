"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Mail, HelpCircle, Image as ImageIcon, Gift } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Home", href: "/", icon: Home, isSecret: false },
    { label: "Letters", href: "/letters", icon: Mail, isSecret: false },
    { label: "Questions", href: "/questions", icon: HelpCircle, isSecret: false },
    { label: "Memories", href: "/memories", icon: ImageIcon, isSecret: false },
    { label: "Secret 🎁", href: "/surprise", icon: Gift, isSecret: true },
  ];

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:absolute sm:bottom-0 p-3 pb-safe z-[999] pointer-events-auto">
      {/* Background blur pill backdrop */}
      <nav className="max-w-[390px] mx-auto bg-white/95 rounded-full px-2 py-1.5 border border-rose-200/80 backdrop-blur-2xl flex items-center justify-around shadow-[0_10px_35px_rgba(225,29,72,0.18)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick(item.href)}
              className="relative min-w-[54px] min-h-[46px] flex flex-col items-center justify-center cursor-pointer select-none touch-manipulation z-10"
            >
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className={`flex flex-col items-center gap-0.5 transition-colors ${
                  item.isSecret
                    ? isActive
                      ? "text-amber-600 font-bold"
                      : "text-amber-600/80 hover:text-amber-600"
                    : isActive
                    ? "text-rose-600 font-bold"
                    : "text-rose-900/70 hover:text-rose-600"
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
                      className={`absolute -inset-1.5 rounded-full blur-sm -z-10 ${
                        item.isSecret ? "bg-amber-300/40" : "bg-rose-400/30"
                      }`}
                    />
                  )}
                </div>
                <span className="text-[10px] font-poppins font-medium capitalize">
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
