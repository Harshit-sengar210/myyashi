export interface SongLyricLine {
  id: number;
  timeSec: number;
  text: string;
  hindi?: string;
  emoji?: string;
}

export const songLyricsData: SongLyricLine[] = [
  {
    id: 1,
    timeSec: 0,
    text: "Playing our special melody for Yashi... 🎵",
    hindi: "ये धुन सिर्फ तुम्हारे लिए",
    emoji: "✨",
  },
  {
    id: 2,
    timeSec: 4,
    text: "Tumhare saath waqt kitni jaldi guzar jata hai...",
    hindi: "हर लम्हा ख़ूबसूरत लगता है",
    emoji: "🌸",
  },
  {
    id: 3,
    timeSec: 8,
    text: "Like a soft melody that stays in the heart forever.",
    hindi: "दिल के सबसे करीब",
    emoji: "💖",
  },
  {
    id: 4,
    timeSec: 13,
    text: "Tumhari hansi sabse pyara music hai, Sweetie.",
    hindi: "मुस्कुराओ Sweetie 😊",
    emoji: "🥰",
  },
  {
    id: 5,
    timeSec: 18,
    text: "Thank you for bringing so much light into my life.",
    hindi: "तुम बहुत अनमोल हो",
    emoji: "🌟",
  },
  {
    id: 6,
    timeSec: 23,
    text: "No matter where life takes us, you will always be special.",
    hindi: "हमेशा खास रहोगी ❤️",
    emoji: "🕊️",
  },
  {
    id: 7,
    timeSec: 28,
    text: "Always here for you, today and forever.",
    hindi: "वादा रहा ✨",
    emoji: "🧸",
  },
];
