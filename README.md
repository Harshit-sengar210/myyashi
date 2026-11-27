# 💖 For Yashi (Sweetie) - Romantic Surprise Website

A mobile-first surprise website built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Google Fonts.

---

## 🎨 How to Edit Content (Names, Dates, Letters, Photos & Song)

All content is cleanly separated inside the `/data` folder and `/public` folder so you don't need to dig through code to customize anything:

| What to edit | File location | What's inside |
| :--- | :--- | :--- |
| **Name, Subtitles & Final Climax Message** | [data/config.ts](file:///d:/yashi/data/config.ts) | Her name (`Yashi`), nickname (`Sweetie`), rotating greeting subtitles, friendship counter start date, and the 4-line climax typewriter message. |
| **Love Letters** | [data/letters.ts](file:///d:/yashi/data/letters.ts) | Add, edit or delete letters (Hinglish, Hindi, English). Each has a title, date, language, preview and full handwritten body. |
| **Questions & Moods** | [data/questions.ts](file:///d:/yashi/data/questions.ts) | The 5 questions, cute reaction replies in Hinglish, and the 5 mood tracker responses. |
| **Reasons Why I Love You** | [data/reasons.ts](file:///d:/yashi/data/reasons.ts) | The 10 swipeable card reasons (emojis, titles, subtitles, and Hindi lines). |
| **Memories Timeline & Photos** | [data/memories.ts](file:///d:/yashi/data/memories.ts) | Memory dates, story paragraphs, and badges. |
| **Real Photos** | `/public/images/` | Place your photos as `memory1.jpg`, `memory2.jpg`, etc. |
| **Background Music & Song** | `/public/audio/song.mp3` | Drop your romantic `.mp3` file here named `song.mp3`. |
| **Song Synchronized Thoughts** | [data/song.ts](file:///d:/yashi/data/song.ts) | Timestamped lyric lines that light up in sync with the song. |

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies (already done)
npm install

# 2. Run the development server
npm run dev
```

Visit **`http://localhost:3000`** in your browser. (Toggle DevTools mobile view `390×844` for the true mobile phone experience).

---

## 🌐 Step-by-Step Instructions to Deploy on Vercel (100% Free)

### Option 1: Using GitHub + Vercel (Recommended)

1. **Create a GitHub Repository**:
   - Go to [github.com/new](https://github.com/new) and create a **Private** (or Public) repository named `yashi-surprise`.
2. **Push your code to GitHub**:
   In your project directory terminal (`D:\yashi`), run:
   ```bash
   git init
   git add .
   git commit -m "Romantic surprise website for Yashi"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/yashi-surprise.git
   git push -u origin main
   ```
3. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in (using GitHub).
   - Click **"Add New..."** ➔ **"Project"**.
   - Select your `yashi-surprise` repository from the list and click **"Import"**.
   - Leave Framework Preset as **Next.js** and default build settings unchanged.
   - Click **"Deploy"**.
4. In under 60 seconds, your site will be live on a free SSL URL (e.g. `https://yashi-surprise.vercel.app`)!

### Option 2: Deploying Directly via Vercel CLI (No Git required)

```bash
npx vercel
```
Follow the quick CLI prompts, and Vercel will upload and deploy the site instantly.
