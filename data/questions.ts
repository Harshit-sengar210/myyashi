export interface QuizQuestion {
  id: string;
  question: string;
  hindiSub?: string;
  options: {
    text: string;
    emoji: string;
    isCorrect?: boolean;
    reaction: string;
  }[];
}

export interface MoodOption {
  id: string;
  label: string;
  emoji: string;
  response: string;
  tip: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q-1",
    question: "Yashi ko sabse zyada kya pasand hai?",
    hindiSub: "चलो देखते हैं मैं तुम्हें कितना जानता हूँ 😉",
    options: [
      { text: "Kadak Chai", emoji: "☕", isCorrect: true, reaction: "Wah! Chai lovers are the sweetest! Ek cup chai tumhare saath toh banti hai 😍" },
      { text: "Hot Coffee", emoji: "☕", isCorrect: true, reaction: "Coffee person? Classy and energetic! Bilkul tumhari tarah ☕✨" },
      { text: "Ice Cream", emoji: "🍨", isCorrect: true, reaction: "Ice cream anytime! Sweet tooth for the sweetest girl 🍦💖" },
      { text: "Dark Chocolate", emoji: "🍫", isCorrect: true, reaction: "Chocolate vibes! Ekdum perfect choice Sweetie 🍫✨" },
    ],
  },
  {
    id: "q-2",
    question: "Tumhara favourite season kaun sa hai?",
    hindiSub: "मौसम और मिज़ाज 🌸",
    options: [
      { text: "Baarish (Monsoon)", emoji: "🌧️", isCorrect: true, reaction: "Mitti ki khushboo aur baarish ki boondein... tumhari tarah refreshing! ☔🌈" },
      { text: "Thand (Winter)", emoji: "❄️", isCorrect: true, reaction: "Cozy blankets, hoodie aur dhoop... winter vibes suits you best! 🧤✨" },
      { text: "Basant (Spring)", emoji: "🌸", isCorrect: true, reaction: "Phoolon ki khushboo aur nayi shuruat, just like your bright smile 🌺" },
      { text: "Garmi (Summer)", emoji: "☀️", isCorrect: true, reaction: "Chhutiyaan aur ice-creams, full on masti time! 🏖️🍹" },
    ],
  },
  {
    id: "q-3",
    question: "Mood kharab ho toh Yashi ko kya chahiye?",
    hindiSub: "Emergency mood lifter 🍫",
    options: [
      { text: "Thoda sa meetha khana", emoji: "🍰", isCorrect: true, reaction: "Meetha solves 99% problems! Agli baar meri taraf se treat 🍰😋" },
      { text: "Favorite gaane sunna", emoji: "🎧", isCorrect: true, reaction: "Music heals the soul! Earphones on, duniya off 🎶✨" },
      { text: "Lambii neend lena", emoji: "😴", isCorrect: true, reaction: "Best therapy ever! Sleeping beauty mode activated 💤☁️" },
      { text: "Dil khol ke baatein", emoji: "🗣️", isCorrect: true, reaction: "Main hamesha sunne ke liye taiyaar hoon, anytime Sweetie! 👂💖" },
    ],
  },
  {
    id: "q-4",
    question: "Free time me sabse achha kya lagta hai?",
    hindiSub: "Sukoon wale pal 🧸",
    options: [
      { text: "Reels scroll karna", emoji: "📱", isCorrect: true, reaction: "Haha relatable! Lekin zyada screen time nahi haan! 📱👀" },
      { text: "Long walks / drive", emoji: "🚗", isCorrect: true, reaction: "Shaam ki hawa aur shaant raasta... the purest feeling 🍃" },
      { text: "Apne khayaalon me khona", emoji: "💭", isCorrect: true, reaction: "Dreamy mind! Bas acche khayaal sochna ✨" },
      { text: "Kuch creative banana", emoji: "🎨", isCorrect: true, reaction: "Artistic soul! Tum jo bhi banati ho pyara hi hota hai 🎨🖌️" },
    ],
  },
  {
    id: "q-5",
    question: "Sabse pyaari cheez tumhari kya hai?",
    hindiSub: "Sach sach batana 🙈",
    options: [
      { text: "Tumhari pyaari hansi", emoji: "😄", isCorrect: true, reaction: "100% correct! Tumhari hansi dekhkar sab accha lagta hai 💖" },
      { text: "Tumhara masoom sa gussa", emoji: "😤", isCorrect: true, reaction: "Pout karti ho toh aur zyada cute lagti ho! 🥰" },
      { text: "Tumhara sabka khayal rakhna", emoji: "🕊️", isCorrect: true, reaction: "Your pure golden heart is what makes you so rare ✨" },
      { text: "Sab kuch (Everything)", emoji: "👑", isCorrect: true, reaction: "Bilkul sahi! Yashi jaisi koi doosri nahi hai! 🌟❤️" },
    ],
  },
];

export const moodOptions: MoodOption[] = [
  {
    id: "happy",
    label: "Super Happy",
    emoji: "🥰",
    response: "Tumhe khush dekhkar mera din ban gaya! Aise hi hamesha khilkhilati raho Sweetie 🌸",
    tip: "Aisi smile maintain rakhna pura din!",
  },
  {
    id: "tired",
    label: "Thak Gayi",
    emoji: "🥱",
    response: "Arre re! Aaj bahut kaam tha kya? Thoda aaram karo aur paani piyo 💧",
    tip: "Ek hot cup chai ya coffee piyo aur rest lo.",
  },
  {
    id: "sad",
    label: "Thoda Low",
    emoji: "🥺",
    response: "Kya hua Sweetie? Sab theek ho jayega, tension mat lo. Tum bahut strong ho 🫂",
    tip: "Yaad rakhna, main hamesha tumhare saath hoon.",
  },
  {
    id: "excited",
    label: "Mast & Energetic",
    emoji: "🥳",
    response: "Kya baat hai! Ye positive energy to pure room ko bright kar rahi hai ⚡",
    tip: "Is energy ke saath aaj jo chaho kar daalo!",
  },
  {
    id: "overthinking",
    label: "Overthinking",
    emoji: "🤯",
    response: "Deep breath lo... itna mat socho. Jo hoga sab accha hoga, promise! 🕊️",
    tip: "Eye close karke 3 deep breaths lo.",
  },
];
