export interface PolaroidPanel {
  id: string;
  title: string;
  hindiTitle?: string;
  caption: string;
  // CSS background-position and background-size for cropping collage.jpeg
  bgPosition: string;
  bgSize: string;
  rotation: number; // slight random degrees
  direction: { x: number; y: number }; // entry direction
  isSketch?: boolean;
}

export const PHOTO_CAPTIONS = {
  hero: {
    title: "Tum aur main... Better Together 💖",
    subtitle: "हर लम्हा ख़ास है जब तुम साथ हो ✨",
  },
  sketchSlider: {
    caption: "Meri nazar se tum aise dikhti ho... rangeen 🌈",
    hindi: "काले-सफ़ेद स्केच से रंगों की दुनिया तक ✨",
  },
  tiltCard: {
    title: "Humari Yaadon Ka Collage 📸",
    subtitle: "Phone tilt karo ya drag karke dekho ✨",
  },
};

export const COLLAGE_PANELS: PolaroidPanel[] = [
  {
    id: "panel-top-left",
    title: "First Sweet Moment",
    hindiTitle: "पहली प्यारी मुलाक़ात 🌸",
    caption: "Jab baatein shuru hui aur pata hi nahi chala kab dil jud gaya.",
    bgPosition: "0% 0%",
    bgSize: "310% 310%",
    rotation: -3,
    direction: { x: -80, y: -40 },
  },
  {
    id: "panel-top-mid",
    title: "Cute Laughs Together",
    hindiTitle: "बेवजह मुस्कुराना 😊",
    caption: "Tumhari wo hasi jo sabse meethi aur infectious hai.",
    bgPosition: "50% 0%",
    bgSize: "310% 310%",
    rotation: 2,
    direction: { x: 0, y: -60 },
  },
  {
    id: "panel-top-right",
    title: "Sketch of Sweetie",
    hindiTitle: "ख़ूबसूरत ख़यालों की तस्वीर 🎨",
    caption: "Art style panel — just like a sweet portrait of your vibe.",
    bgPosition: "100% 0%",
    bgSize: "310% 310%",
    rotation: -2,
    direction: { x: 80, y: -40 },
    isSketch: true,
  },
  {
    id: "panel-center",
    title: "Better Together",
    hindiTitle: "साथ में सब कुछ बेहतर है 💖",
    caption: "The center of our story — life is simply brighter together.",
    bgPosition: "50% 50%",
    bgSize: "280% 280%",
    rotation: 0,
    direction: { x: 0, y: 0 },
  },
  {
    id: "panel-bottom-left",
    title: "Sukoon & Care",
    hindiTitle: "तुम्हारा ख़याल रखना 🕊️",
    caption: "Chhoti chhoti baatein jinme sabse zyada apna-pan hota hai.",
    bgPosition: "0% 100%",
    bgSize: "310% 310%",
    rotation: 3,
    direction: { x: -70, y: 50 },
  },
  {
    id: "panel-bottom-mid",
    title: "Random Sawaal & Masti",
    hindiTitle: "मस्ती और थोड़ा पागलपन 🧸",
    caption: "Tumhara cute gussa aur phir turant muskura dena.",
    bgPosition: "50% 100%",
    bgSize: "310% 310%",
    rotation: -2.5,
    direction: { x: 0, y: 70 },
  },
  {
    id: "panel-bottom-right",
    title: "Forever Memory",
    hindiTitle: "हमेशा के लिए ख़ास ✨",
    caption: "Har roz ek nayi yaad, jo dil ke sabse kareeb rehti hai.",
    bgPosition: "100% 100%",
    bgSize: "310% 310%",
    rotation: 2,
    direction: { x: 70, y: 50 },
  },
];
