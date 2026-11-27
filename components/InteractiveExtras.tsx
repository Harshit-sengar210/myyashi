"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, PhoneCall } from "lucide-react";

export default function InteractiveExtras() {
  const [gyroRequested, setGyroRequested] = useState(false);

  // 1. Sparkle trail following finger / cursor
  useEffect(() => {
    let lastTime = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const now = Date.now();
      if (now - lastTime < 60) return; // throttle
      lastTime = now;

      const sparkle = document.createElement("div");
      sparkle.innerText = "✨";
      sparkle.style.position = "fixed";
      sparkle.style.left = `${e.clientX - 8}px`;
      sparkle.style.top = `${e.clientY - 8}px`;
      sparkle.style.fontSize = "14px";
      sparkle.style.pointerEvents = "none";
      sparkle.style.zIndex = "99999";
      sparkle.style.transition = "all 0.6s ease-out";
      sparkle.style.opacity = "1";
      sparkle.style.transform = "scale(1)";

      document.body.appendChild(sparkle);

      requestAnimationFrame(() => {
        sparkle.style.opacity = "0";
        sparkle.style.transform = "scale(0.3) translateY(-12px)";
      });

      setTimeout(() => {
        if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
      }, 650);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // 2. Shake detection (DeviceMotion) -> Heart rain
  useEffect(() => {
    let lastX = 0, lastY = 0, lastZ = 0;
    let lastUpdate = 0;

    const handleMotion = (e: DeviceMotionEvent) => {
      const curTime = Date.now();
      if (curTime - lastUpdate > 100) {
        const diffTime = curTime - lastUpdate;
        lastUpdate = curTime;

        const acc = e.accelerationIncludingGravity;
        if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

        const speed =
          (Math.abs(acc.x + acc.y + acc.z - lastX - lastY - lastZ) / diffTime) * 10000;

        if (speed > 800) {
          // Trigger Heart Rain Confetti
          confetti({
            particleCount: 30,
            spread: 90,
            origin: { y: 0.2 },
            colors: ["#E11D48", "#FBCFE8", "#F5D0A9"],
          });
        }

        lastX = acc.x;
        lastY = acc.y;
        lastZ = acc.z;
      }
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, []);

  return null;
}
