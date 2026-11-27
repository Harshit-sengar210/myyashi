import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins, Dancing_Script, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: "swap",
});

const tiroHindi = Tiro_Devanagari_Hindi({
  variable: "--font-hindi",
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#E11D48",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "For Sweetie ❤️ | A Special Surprise for Yashi",
  description: "A little romantic corner made with all my love for my sweetest Yashi.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "A little something for Yashi 💖",
    description: "Made with all my love and special memories for Sweetie.",
    type: "website",
    locale: "en_US",
    siteName: "For Yashi",
  },
  twitter: {
    card: "summary_large_image",
    title: "A little something for Yashi 💖",
    description: "Made with all my love and special memories for Sweetie.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "For Yashi 💖",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} ${dancingScript.variable} ${tiroHindi.variable}`}
    >
      <body className="min-h-screen bg-[#FFF0F3] text-[#3B122D] antialiased flex items-center justify-center p-0 sm:p-4 selection:bg-rose-deep selection:text-white safe-top safe-bottom">
        {/* Ambient romantic pastel glow effects for desktop view */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden hidden sm:block">
          <div className="absolute top-1/4 left-1/2 -translate-x-[380px] w-[450px] h-[450px] bg-rose-200/60 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-1/4 right-1/2 translate-x-[380px] w-[450px] h-[450px] bg-pink-200/60 rounded-full blur-3xl opacity-60" />
        </div>

        {/* Centered Phone Container (max-width 430px, mobile 390x844 responsive, notch & dynamic island safe area) */}
        <main className="relative w-full sm:max-w-[430px] min-h-screen sm:min-h-[844px] sm:max-h-[920px] sm:h-[844px] sm:rounded-[40px] sm:border sm:border-rose-200/60 bg-gradient-to-b from-[#FFF5F7] via-[#FFF0F4] to-[#FFE4E8] sm:shadow-[0_15px_50px_rgba(225,29,72,0.15)] flex flex-col overflow-hidden text-[#3B122D]">
          {/* Subtle phone notch/dynamic island decoration visible on desktop container */}
          <div className="hidden sm:flex justify-center pt-3 pb-1 z-50">
            <div className="w-28 h-5 bg-rose-950/10 backdrop-blur-md rounded-full border border-rose-300/30" />
          </div>

          {/* Scrollable Screen Body with safe area padding */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
