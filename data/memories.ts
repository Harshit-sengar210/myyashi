export interface MemoryItem {
  id: string;
  date: string;
  title: string;
  hindiTitle?: string;
  text: string;
  image?: string;
  badge: string;
  rotation?: number;
}

export const memoriesData: MemoryItem[] = [
  {
    id: "mem-1",
    date: "First Meeting • 12 Nov 2026",
    title: "Jab Pehli Baar Baat Hui",
    hindiTitle: "विशाल मेगा मार्ट वाली पहली मुलाक़ात 🌸",
    text: "Vishal Mega Mart me mile the jab... jab tumko pehli baar dekha tha, sach me bohot cute lag rahi thi tum. I really like you, Sweetie! 💖",
    image: "/images/memory1.jpg",
    badge: "First Sight ✨",
    rotation: -2,
  },
  {
    id: "mem-2",
    date: "VIP Restaurant Date",
    title: "First Time in VIP Restaurant",
    hindiTitle: "तुम्हें पिज़्ज़ा खाते देखना और वो प्यारी आँखें 🍕",
    text: "First time VIP restaurant gaye the saath me... seeing you eating pizza and looking at you with your lovely eyes was the sweetest feeling ever. ❤️",
    image: "/images/memory2.jpg",
    badge: "Pizza & Eyes 🍕",
    rotation: 3,
  },
  {
    id: "mem-3",
    date: "College / School Days",
    title: "Annual Function",
    hindiTitle: "एनुअल फंक्शन और वो ख़ास अहसास ✨",
    text: "Annual function me jaakar laga ki haan, bohot pyaari ho tum. I really want you in my daily life, Yashi! 🌟",
    image: "/images/memory3.jpg",
    badge: "Annual Function 🌺",
    rotation: -3,
  },
  {
    id: "mem-4",
    date: "Dil Se Dil Tak",
    title: "Dil Ki Baatein",
    hindiTitle: "मेरे दिल की सच्ची बात 💖",
    text: "I like you, Yashi. Sach me, tum mere liye bohot zyada special ho aur hamesha rahogi. 🤍✨",
    image: "/images/memory4.jpg",
    badge: "I Like You ❤️",
    rotation: 2,
  },
  {
    id: "mem-5",
    date: "Right Now & Forever",
    title: "Making This For You",
    hindiTitle: "ये पल सिर्फ तुम्हारे नाम ✨",
    text: "Tumhe surprise karne ki ye koshish... taaki jab bhi tum low feel karo, ye website dekh kar tumhare chehre par ek pyari si smile aa jaye. Always yours, Harshit! 🌸",
    image: "/images/memory5.jpg",
    badge: "Forever 💍",
    rotation: -1,
  },
];
