export type LetterLanguage = "all" | "hinglish" | "hindi" | "special";

export interface LoveLetter {
  id: string;
  title: string;
  hindiTitle?: string;
  language: "hinglish" | "hindi" | "special";
  date: string;
  badge?: string;
  preview: string;
  body: string;
}

export const letters: LoveLetter[] = [
  {
    id: "timeline-letter-1",
    title: "Pehli Mulaqaat • Vishal Mega Mart",
    hindiTitle: "विशाल मेगा मार्ट वाली पहली मुलाक़ात 🌸",
    language: "hinglish",
    date: "12 Nov 2026",
    badge: "First Sight ✨",
    preview: "Vishal Mega Mart me jab pehli baar dekha tha, sach me bohot cute lag rahi thi...",
    body: `Hey Yashi (Sweetie),

Vishal Mega Mart me jab mile the... jab maine tumko pehli baar dekha tha, sach me bohot cute lag rahi thi tum. 

Pata nahi us pal dil me kya hua tha, par tumhari wo masoom si smile aur tumhara andaz mere dil ko chhu gaya. 

I really like you, Sweetie! Sach me, bohot zyada. 💖

- Tumhara Harshit ❤️`,
  },
  {
    id: "timeline-letter-2",
    title: "First Time in VIP Restaurant",
    hindiTitle: "तुम्हें पिज़्ज़ा खाते देखना और वो प्यारी आँखें 🍕",
    language: "hinglish",
    date: "VIP Restaurant Date",
    badge: "Pizza & Eyes 🍕",
    preview: "VIP Restaurant me first time gaye the saath me, seeing you eating pizza and with your lovely eyes...",
    body: `My Dearest Sweetie,

First time VIP restaurant gaye the saath me... seeing you eating pizza and looking into your lovely eyes was the sweetest feeling in the world. 🍕

Tum jis tarah baatein karte karte pizza enjoy kar rahi thi aur tumhari wo pyari aankhein... main bas dekhta hi reh gaya. 

Wo date mere dil ke hamesha sabse kareeb rahegi. ❤️

- Harshit ✨`,
  },
  {
    id: "timeline-letter-3",
    title: "Annual Function Memories",
    hindiTitle: "एनुअल फंक्शन और वो ख़ास अहसास 🌟",
    language: "hinglish",
    date: "Annual Function",
    badge: "Special Bond 🌺",
    preview: "Annual function me jaakar you feel like haan bohot pyaari ho tum, I really want you in my daily life...",
    body: `Dear Yashi,

Annual function me jaakar feel hua ki haan... bohot pyaari ho tum! 

Tumhari presence har cheez ko itna bright aur beautiful bana deti hai. Tabhi dil ne kaha ki I really want you in my daily life, Yashi. 

Tum meri zindagi ka wo hissa ho jiske bina sab adhoora lagta hai. 🌸

- Harshit 💫`,
  },
  {
    id: "timeline-letter-4",
    title: "Dil Ki Baatein",
    hindiTitle: "मेरे दिल की सबसे सच्ची बात 💖",
    language: "hindi",
    date: "Dil Se Dil Tak",
    badge: "I Like You ❤️",
    preview: "I like you, Yashi... sach me, tum mere liye bohot zyada special ho...",
    body: `यशी (स्वीटी),

I like you, Yashi. Sach me dil se bol raha hoon.

Tum mere liye kitni special ho, shayad main shabdon me poora na keh paun. Jab tum muskurati ho, toh lagta hai sab theek hai. 

Bas yahi dua hai ki tum hamesha mere saath aisi hi khush raho. Mere dil ki har dhadkan me tumhara hi naam hai. 💖

- सिर्फ तुम्हारा, हर्षित ✨`,
  },
  {
    id: "timeline-letter-5",
    title: "Making This Surprise For You",
    hindiTitle: "ये ख़ास सरप्राइज सिर्फ तुम्हारे लिए 🎁",
    language: "special",
    date: "Right Now & Forever",
    badge: "Forever Yours 💍",
    preview: "Ye website sirf tumhare chehre par smile laane ke liye banayi hai taaki jab bhi tum...",
    body: `Sweetie,

Ye website aur ye har ek letter sirf aur sirf tumhare chehre par ek pyaari si smile laane ke liye banaya hai.

Taaki jab bhi tum kabhi low feel karo ya udas ho, tum yahan aakar padh sako ki koi hai jo tumse bepanah pyaar karta hai aur hamesha tumhare saath khada hai.

Always yours, in every moment. 

- Harshit 💖💍`,
  },
];
