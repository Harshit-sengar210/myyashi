export interface ReasonCard {
  id: number;
  emoji: string;
  title: string;
  subtitle: string;
  hindi?: string;
  color: string;
}

export const reasonsData: ReasonCard[] = [
  {
    id: 1,
    emoji: "✨",
    title: "Tumhari Smile",
    subtitle: "Jab tum hasti ho na, toh sach me pura din ban jata hai.",
    hindi: "तुम्हारी हँसी सबसे अनमोल है",
    color: "from-rose-500/30 via-pink-500/20 to-purple-500/30",
  },
  {
    id: 2,
    emoji: "🌸",
    title: "Tumhari Saadgi",
    subtitle: "You don't need to try at all. Tum jaise ho, bilkul perfect ho.",
    hindi: "सादगी जो दिल छू ले",
    color: "from-pink-500/30 via-rose-400/20 to-amber-500/20",
  },
  {
    id: 3,
    emoji: "🕊️",
    title: "Tumhara Caring Nature",
    subtitle: "Chhoti chhoti baaton ka dhyan rakhna aur sabka khayal rakhna.",
    hindi: "इतना प्यारा और साफ़ दिल",
    color: "from-purple-500/30 via-indigo-500/20 to-pink-500/20",
  },
  {
    id: 4,
    emoji: "🧸",
    title: "Tumhara Cute Pagalpan",
    subtitle: "Jab tum apni bachkani baatein karti ho, it's the most adorable thing ever.",
    hindi: "तुम्हारा प्यारा सा बचपना",
    color: "from-amber-500/30 via-pink-500/20 to-rose-500/20",
  },
  {
    id: 5,
    emoji: "🌟",
    title: "How Real You Are",
    subtitle: "No drama, no pretense. You speak your mind with so much grace.",
    hindi: "सच्ची और बेमिसाल",
    color: "from-rose-600/30 via-purple-600/20 to-pink-500/20",
  },
  {
    id: 6,
    emoji: "☕",
    title: "Sukoon Wali Baatein",
    subtitle: "Tumhare saath ghanton baat karke bhi lagta hai waqt kam pad gaya.",
    hindi: "बातें जो दिल को सुकून दें",
    color: "from-pink-600/30 via-rose-500/20 to-indigo-500/20",
  },
  {
    id: 7,
    emoji: "😤",
    title: "Tumhara Cute Gussa",
    subtitle: "Gussa karti ho toh thodi der ke liye, par usme bhi pyaar dikhta hai.",
    hindi: "रूठना और फिर मान जाना",
    color: "from-red-500/30 via-pink-500/20 to-purple-500/20",
  },
  {
    id: 8,
    emoji: "🎨",
    title: "Tumhara Unique Perspective",
    subtitle: "The way you look at the world makes everything feel more colorful.",
    hindi: "तुम्हारी ख़ास नज़रिया",
    color: "from-indigo-500/30 via-pink-500/20 to-rose-500/20",
  },
  {
    id: 9,
    emoji: "💖",
    title: "You Make Me Better",
    subtitle: "Tumhare baare me sochte hi face par ek sweet si smile aa jati hai.",
    hindi: "तुम मेरी ज़िंदगी की रोशनी हो",
    color: "from-rose-500/30 via-pink-400/20 to-amber-500/20",
  },
  {
    id: 10,
    emoji: "👑",
    title: "Because You are Yashi",
    subtitle: "Bas isiliye, kyunki duniya me tumhare jaisi koi doosri ho hi nahi sakti.",
    hindi: "सिर्फ और सिर्फ तुम, स्वीटी",
    color: "from-pink-500/40 via-rose-600/30 to-amber-400/30",
  },
];
