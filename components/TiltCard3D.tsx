"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Sparkles, Compass } from "lucide-react";
import { PHOTO_CAPTIONS } from "@/data/photos";

export default function TiltCard3D() {
  const [gyroActive, setGyroActive] = useState(false);
  const [gyroSupported, setGyroSupported] = useState(false);

  // Motion values for tilt angles
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);
  const shineOpacity = useTransform(mouseX, [-100, 100], [0.1, 0.45]);
  const shineX = useTransform(mouseX, [-100, 100], ["-50%", "150%"]);

  useEffect(() => {
    if (typeof window !== "undefined" && "DeviceOrientationEvent" in window) {
      setGyroSupported(true);
    }
  }, []);

  const requestOrientationPermission = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === "granted") {
          startGyro();
        }
      } catch (err) {
        console.log("Device orientation error:", err);
      }
    } else {
      startGyro();
    }
  };

  const startGyro = () => {
    setGyroActive(true);
    window.addEventListener("deviceorientation", (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = Math.min(Math.max(e.gamma * 2.5, -100), 100);
        const y = Math.min(Math.max((e.beta - 45) * 2.5, -100), 100);
        mouseX.set(x);
        mouseY.set(y);
      }
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="w-full my-6 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-accent" />
          <span className="text-xs font-poppins font-semibold uppercase tracking-wider text-pink-soft">
            {PHOTO_CAPTIONS.tiltCard.title}
          </span>
        </div>

        {gyroSupported && !gyroActive && (
          <button
            onClick={requestOrientationPermission}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-poppins text-pink-soft hover:text-white border border-pink-soft/20 transition-all"
          >
            <Compass className="w-3 h-3 text-gold-accent" /> Enable Tilt
          </button>
        )}
      </div>

      {/* 3D Perspective Wrapper */}
      <div
        style={{ perspective: 1000 }}
        className="w-full max-w-[340px] flex items-center justify-center select-none"
      >
        <motion.div
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-full h-80 rounded-[32px] p-2 glass-card-rose border border-pink-soft/40 shadow-[0_20px_50px_rgba(27,11,46,0.8)] cursor-grab active:cursor-grabbing overflow-hidden"
        >
          {/* Collage Image with next/image */}
          <div className="relative w-full h-full rounded-[26px] overflow-hidden">
            <Image
              src="/images/collage.jpeg"
              alt="Better Together Collage"
              fill
              sizes="(max-width: 430px) 340px, 360px"
              className="object-cover object-center"
            />

            {/* Holographic Light Sweep Overlay */}
            <motion.div
              style={{
                opacity: shineOpacity,
                left: shineX,
              }}
              className="absolute inset-0 w-3/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
            />

            {/* Bottom Glow Pill */}
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-center">
              <span className="font-dancing text-lg text-white font-bold block">
                Better Together 💖
              </span>
              <span className="text-[10px] font-poppins text-pink-soft/80">
                {PHOTO_CAPTIONS.tiltCard.subtitle}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
