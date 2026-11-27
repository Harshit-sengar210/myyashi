export interface OpenWhenLetter {
  id: string;
  tag: string;
  emoji: string;
  label: string;
  hindiLabel: string;
  color: string;
  preview: string;
  body: string;
  closing: string;
}

export const openWhenLetters: OpenWhenLetter[] = [
  {
    id: "sad",
    tag: "Sad",
    emoji: "🥺",
    label: "Open when you're sad",
    hindiLabel: "जब दिल थोड़ा उदास हो 🌸",
    color: "from-blue-600/30 via-indigo-600/20 to-purple-700/30",
    preview: "Udaas mat hona Sweetie... sab theek ho jayega.",
    body: `Hey Sweetie,
Mujhe pata hai kuch din thode bhaari hote hain aur har cheez theek nahi lagti.
Lekin yaad rakhna, koi hai jo tumhari ek smile dekhne ke liye kuch bhi kar sakta hai.
Deep breath lo, paani piyo, aur thoda rest lo. Tum bahut strong ho, aur ye waqt bhi guzar jayega. Main hamesha tumhare saath hoon. 🫂`,
    closing: "Hamesha tumhara Harshit ❤️",
  },
  {
    id: "miss-me",
    tag: "Miss Me",
    emoji: "💭",
    label: "Open when you miss me",
    hindiLabel: "जब मेरी याद आए ✨",
    color: "from-rose-600/30 via-pink-600/20 to-purple-600/30",
    preview: "Agar meri yaad aa rahi hai, toh smile karo...",
    body: `Pyaari Yashi,
Agar tum ye padh rahi ho matlab tum mujhe yaad kar rahi ho... aur sach kahun toh main bhi tumhe hi soch raha tha!
Waqt chahe kitna bhi busy ho ya hum thode door hon, tum mere khayaalon me hamesha rehti ho.
Jab bhi yaad aaye, bas ek message kar dena. Main hamesha reply karne ke liye taiyaar hoon! 🥰`,
    closing: "Just one call away 📞",
  },
  {
    id: "cant-sleep",
    tag: "Can't Sleep",
    emoji: "🌙",
    label: "Open when you can't sleep",
    hindiLabel: "जब नींद ना आ रही हो 😴",
    color: "from-indigo-700/30 via-slate-700/20 to-purple-900/30",
    preview: "Late night overthinking chhod do abhi ke abhi...",
    body: `Sweetie,
Itni raat ko abhi tak jaag rahi ho? Screen time band karo aur eyes close karo.
Saari tension, saara stress kal ke liye chhod do.
Apne favorite blanket me cozy ho jao aur bas pyaare pyaare sapne socho. Good night Sweetie! ☁️✨`,
    closing: "Sweet Dreams 💤",
  },
  {
    id: "happy",
    tag: "Happy",
    emoji: "🥳",
    label: "Open when you're super happy",
    hindiLabel: "जब तुम बहुत ख़ुश हो 🎉",
    color: "from-amber-500/30 via-pink-500/20 to-rose-500/30",
    preview: "Ye khushi dekhkar mera dil khush ho gaya!",
    body: `Kya baat hai Yashi!
Tumhe khush dekh kar mera din 100x better ho jata hai!
Apni is khushi ko celebrate karo, dance karo, kuch meetha khao, aur ye positivity sabme baanto.
Hamesha aise hi khilkhilati rehna, kyunki tumhari smile sabse pyaari hai! 🌟🌸`,
    closing: "Keep shining bright ✨",
  },
  {
    id: "angry",
    tag: "Angry on Me",
    emoji: "😤",
    label: "Open when you're angry on me",
    hindiLabel: "जब मुझसे ग़ुस्सा हो 🥺",
    color: "from-rose-700/30 via-red-600/20 to-pink-700/30",
    preview: "I'm so sorry Sweetie, gussa thook do na...",
    body: `Arre re Sweetie,
Mujhse gussa ho gayi? I am really sorry agar maine kuch galat bola ya kiya ho.
Mera irada tumhe hurt karne ka bilkul nahi tha.
Tum chahe daant lo, thoda sa gussa nikaal lo, lekin naraz mat raho please.
Dekho main kaan pakad raha hoon 🥺 Maan jao na? Ek chocolate treat pakki!`,
    closing: "Sorry na baba 🥺❤️",
  },
];
