export interface MemoryItem {
  id: string;
  date: string;
  title: string;
  hindiTitle?: string;
  text: string;
  image?: string; // e.g. /images/memory1.jpg
  badge: string;
  rotation?: number; // Polaroid rotation in deg
}

export const memoriesData: MemoryItem[] = [
  {
    id: "mem-1",
    date: "First Conversation",
    title: "Jab Pehli Baar Baat Hui",
    hindiTitle: "एक नई और ख़ूबसूरत शुरुआत 🌸",
    text: "Pata nahi tha ki ek aam si baat cheet itni special ban jayegi. Pehli hi baatcheet me laga ki tum kitni pyaari aur real ho.",
    image: "/images/memory1.jpg",
    badge: "Day One",
    rotation: -2,
  },
  {
    id: "mem-2",
    date: "Midnight Talks",
    title: "Late Night Gup-Shup",
    hindiTitle: "देर रात की हँसी और बातें 🌙",
    text: "Raat ke 2 baje bina kisi matlab ke hasna, random topics par baatein karna... those late night talks will always be my absolute favorite.",
    image: "/images/memory2.jpg",
    badge: "Unforgettable",
    rotation: 3,
  },
  {
    id: "mem-3",
    date: "The Inside Jokes",
    title: "Humara Apna Mazaak",
    hindiTitle: "वो बातें जो सिर्फ हम समझते हैं 😂",
    text: "Ek doosre ko dekh kar ya aisi baaton par hasna jo kisi aur ko samajh bhi na aaye. Those silly moments made us closest.",
    image: "/images/memory3.jpg",
    badge: "Pure Fun",
    rotation: -3,
  },
  {
    id: "mem-4",
    date: "Sharing Secrets",
    title: "Dil Ki Baatein Batana",
    hindiTitle: "भरोसा और अपनापन 💖",
    text: "Jab tumne apne dreams, apne fears aur apni baatein share ki... tab realise hua ki ye dosti kitni gehri aur sacchi hai.",
    image: "/images/memory4.jpg",
    badge: "Special Bond",
    rotation: 2,
  },
  {
    id: "mem-5",
    date: "Right Now & Forever",
    title: "Making This For You",
    hindiTitle: "ये पल सिर्फ तुम्हारे नाम ✨",
    text: "Tumhe surprise karne ki ye koshish... taaki jab bhi tum low feel karo, ye website dekh kar tumhare chehre par ek pyari si smile aa jaye.",
    image: "/images/memory5.jpg",
    badge: "Forever",
    rotation: -1,
  },
];
