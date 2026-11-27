export interface Coupon {
  id: string;
  title: string;
  hindiTitle: string;
  description: string;
  emoji: string;
  code: string;
  accent: string;
}

export const couponsData: Coupon[] = [
  {
    id: "coupon-1",
    title: "1 Free Chai / Coffee Treat",
    hindiTitle: "चाय या कॉफ़ी मेरे साथ ☕",
    description: "Whenever you feel tired or just want to chat, redeem this for a hot cup on me!",
    emoji: "☕",
    code: "SWEETIE-CHAI-01",
    accent: "from-amber-500/20 to-orange-500/30",
  },
  {
    id: "coupon-2",
    title: "Midnight Venting Session",
    hindiTitle: "देर रात दिल की बातें 🌙",
    description: "No judgment, no advice unless asked. Pure listening anytime you need to speak your heart out.",
    emoji: "🎧",
    code: "VENT-ANYTIME-24X7",
    accent: "from-purple-500/20 to-indigo-500/30",
  },
  {
    id: "coupon-3",
    title: "Unlimited Ice Cream Pass",
    hindiTitle: "ढेर सारी आइसक्रीम 🍨",
    description: "Valid for any bad mood emergency. Your favorite flavor guaranteed!",
    emoji: "🍦",
    code: "SWEET-TOOTH-100",
    accent: "from-pink-500/20 to-rose-500/30",
  },
  {
    id: "coupon-4",
    title: "Instant Mood Booster Call",
    hindiTitle: "हँसी और मस्ती वाली कॉल 📞",
    description: "Guaranteed to make you laugh with silly jokes and funny stories within 5 minutes.",
    emoji: "🧸",
    code: "SMILE-GUARANTEE-04",
    accent: "from-rose-500/20 to-pink-500/30",
  },
];
