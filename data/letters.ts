export type LetterLanguage = "all" | "english" | "hinglish" | "hindi";

export interface LoveLetter {
  id: string;
  title: string;
  language: "english" | "hinglish" | "hindi";
  date: string;
  body: string;
  preview?: string;
}

export const letters: LoveLetter[] = [
  {
    id: "letter-1",
    title: "Pehla Letter",
    language: "hinglish",
    date: "12 Nov, 2026",
    preview: "Pata nahi kaise shuru karun, lekin tumhare saath baat karke...",
    body: `Hey Yashi (Sweetie),

Pata nahi kaise shuru karun, lekin tumhare saath baat karke din achha ho jata hai. Tumhari smile, tumhari baatein, aur tumhara pagalpan, sab kuch bahut special hai.

Main bas chahta hoon ki tum hamesha khush raho. Ye chhoti si website meri taraf se tumhare liye ek chhota sa surprise hai.

- Tumhara Harshit ❤️`,
  },
  {
    id: "letter-2",
    title: "दिल की बात",
    language: "hindi",
    date: "25 March, 2024",
    preview: "कुछ लोग ज़िंदगी में ऐसे आते हैं जिनसे मिलकर सब कुछ खूबसूरत लगने लगता है...",
    body: `प्यारी यशी,

कुछ लोग ज़िंदगी में ऐसे आते हैं जिनसे मिलकर सब कुछ खूबसूरत लगने लगता है। तुम भी उन्हीं में से हो। तुम्हारी हँसी मेरे दिन की सबसे अच्छी बात है।

मैं नहीं जानता कल क्या होगा, पर इतना जानता हूँ कि तुम्हारे बिना सब अधूरा लगता है। हमेशा मुस्कुराती रहना, स्वीटी। ❤️`,
  },
  {
    id: "letter-3",
    title: "Just Like That",
    language: "english",
    date: "10 April, 2024",
    preview: "You make ordinary days feel like little celebrations...",
    body: `Dear Yashi,

You make ordinary days feel like little celebrations. Thank you for being you: kind, funny, and wonderfully real.

If I could, I'd bottle your laughter and keep it with me forever.

Always yours, in whatever way you let me be.`,
  },
];
