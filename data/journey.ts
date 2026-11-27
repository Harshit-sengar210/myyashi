export interface JourneyData {
  dayToNight: {
    chapter: string;
    phases: {
      label: string;
      hindi: string;
      icon: string;
    }[];
  };
  wordReveal: {
    chapter: string;
    paragraph: string;
    hindiLine: string;
    author: string;
  };
  heartFill: {
    chapter: string;
    title: string;
    hindiSubtitle: string;
    filledText: string;
    fullMessage: string;
  };
  shootingStars: {
    chapter: string;
    title: string;
    subtitle: string;
    hindi: string;
    wishButtonText: string;
    wishMessage: string;
    subNote: string;
  };
}

export const journeyData: JourneyData = {
  dayToNight: {
    chapter: "Chapter 1 • A Day In My Thoughts ✨",
    phases: [
      {
        label: "Subah ki pehli smile tumhari yaad dilaati hai ☀️",
        hindi: "सुबह की पहली धूप और तुम्हारी प्यारी याद",
        icon: "☀️",
      },
      {
        label: "Dopahar me bhi sirf tum hi yaad aati ho 🌤️",
        hindi: "दिन के हर काम के बीच तुम्हारा ही ख़याल",
        icon: "🌤️",
      },
      {
        label: "Shaam ko tumse baat karne ka sabse zyada intezaar rehta hai 🌇",
        hindi: "ढलती शाम और तुमसे बातें करने का सुकून",
        icon: "🌇",
      },
      {
        label: "Aur raat ko tumhare hi pyaare sapne 🌙",
        hindi: "चांदनी रात और ख़्वाबों में तुम, स्वीटी",
        icon: "🌙",
      },
    ],
  },
  wordReveal: {
    chapter: "Chapter 2 • Dil Se Nikli Baat ✍️",
    paragraph:
      "Kabhi kabhi sochta hoon ki zindagi me kuch rishte kitne unexpected aur pyare hote hain. Yashi, tumhari hansi, tumhara baat karne ka andaaz, aur tumhari masoomiyat har ordinary din ko celebration bana deti hai. Harshit hamesha yahi chahta hai ki tumhari aankhon me hamesha wahi chamak rahe aur tum aise hi khilkhilati raho. Tum meri life ki sabse anmol Sweetie ho.",
    hindiLine: "तुम सिर्फ एक ख़ास दोस्त नहीं, बल्कि दिल के सबसे करीब हो ❤️",
    author: "— Harshit ✨",
  },
  heartFill: {
    chapter: "Chapter 3 • Kitna Pyaar? 💖",
    title: "Filling the Heart",
    hindiSubtitle: "जैसे जैसे स्क्रॉल करोगे, दिल भरता जाएगा ✨",
    filledText: "Itna pyaar... aur tum poochti ho kitna? 💖",
    fullMessage: "Pura dil sirf aur sirf tumhari khushi ke liye dhadakta hai, Sweetie!",
  },
  shootingStars: {
    chapter: "Chapter 4 • Starlit Wishes 🌠",
    title: "Make a Wish Under the Stars",
    subtitle: "Jab koi toota tara dikhe, dil se maango...",
    hindi: "रात के आसमान में टिमटिमाते तारे और तुम्हारी हर मुराद ✨",
    wishButtonText: "Wish maango ✨",
    wishMessage: "Wish maang li? Pakka poori hogi, Sweetie ✨",
    subNote: "Kyunki sachhe dil ki har dua qubool hoti hai 💖",
  },
};
