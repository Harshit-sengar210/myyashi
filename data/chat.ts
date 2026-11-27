export interface ChatStep {
  id: number;
  sender: "me" | "yashi";
  text: string;
  hindiText?: string;
  time: string;
  replyOptions?: {
    text: string;
    nextStepId: number;
  }[];
}

export const chatStory: ChatStep[] = [
  {
    id: 1,
    sender: "me",
    text: "Hey Sweetie... Free ho kya? Ek baat bolni thi. 🌸",
    hindiText: "एक छोटी सी बात कहनी थी...",
    time: "10:30 PM",
    replyOptions: [
      { text: "Haan bolo na, kya hua? 😊", nextStepId: 2 },
      { text: "Hamesha free hoon tumhare liye 💖", nextStepId: 2 },
    ],
  },
  {
    id: 2,
    sender: "me",
    text: "Pata nahi kyu, par jab bhi tumse baat hoti hai, sab kuch positive lagne lagta hai.",
    time: "10:31 PM",
    replyOptions: [
      { text: "Achaa sach me? 🙈", nextStepId: 3 },
      { text: "Tum bhi na, bohot butter lagate ho 😂", nextStepId: 3 },
    ],
  },
  {
    id: 3,
    sender: "me",
    text: "Sach me! Tumhari dosti mere liye koi aam baat nahi hai. It really means a lot.",
    hindiText: "तुम सच में बहुत ख़ास हो",
    time: "10:32 PM",
    replyOptions: [
      { text: "You mean a lot to me too! 🤍", nextStepId: 4 },
      { text: "Thank you for always being there ✨", nextStepId: 4 },
    ],
  },
  {
    id: 4,
    sender: "me",
    text: "Bas itna chahta hoon ki tum hamesha aisi hi khush raho. Kisi bhi cheez ki tension mat lena kabhi.",
    time: "10:33 PM",
    replyOptions: [
      { text: "Promise! Aur tum bhi hamesha saath rahoge na? 🥺", nextStepId: 5 },
      { text: "Tum ho na sambhalne ke liye 🥰", nextStepId: 5 },
    ],
  },
  {
    id: 5,
    sender: "me",
    text: "Hamesha! Chahe kuch bhi ho, Harshit hamesha tumhare saath khada rahega. Promise! ❤️✨",
    hindiText: "हमेशा साथ रहेंगे, वादा रहा 🌸",
    time: "10:34 PM",
    replyOptions: [],
  },
];
