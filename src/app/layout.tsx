import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Footer from "../components/footer";
import { ThemeProvider } from "../context/theme-context";
import InteractiveCanvas from "../components/interactive-canvas";
import AudioPlayer from "../components/audio-player";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lancelot Mailig — Designer & Developer",
  description: "Personal portfolio and digital garden of Lancelot Mailig. Focus on minimalism, performance, and user-centric software.",
  metadataBase: new URL("https://nextjs-portfolio-sepia-eight.vercel.app/"),
  openGraph: {
    title: "Lancelot Mailig — Designer & Developer",
    description: "Personal portfolio and digital garden of Lancelot Mailig.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lancelot Mailig — Designer & Developer",
    images: ["/og.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      try {
        const theme =
          localStorage.getItem('theme') ||
          (window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light');

        document.documentElement.classList.toggle(
          'dark',
          theme === 'dark'
        );
      } catch {}
    `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black blueprint-grid-subtle">
        <ThemeProvider>
          {/* Main split-screen container */}
          <div className="min-h-screen w-full flex flex-col lg:flex-row">
            
            {/* Left Column: Navigation & Content Page (60% width on lg) */}
            <div className="w-full lg:w-[58%] xl:w-[62%] flex flex-col min-h-screen px-6 py-8 sm:px-12 sm:py-12 lg:px-20 lg:py-16 justify-between lg:overflow-y-auto">
              
              {/* Mobile Only: Interactive 3D Canvas at the very top of viewport */}
              <div className="block lg:hidden w-full mb-8">
                <InteractiveCanvas />
              </div>

              <main className="flex-1 flex flex-col justify-center max-w-xl">
                {children}
              </main>

              <Footer />
            </div>

            {/* Subtle Divider Line */}
            <div className="hidden lg:block w-[1px] bg-zinc-200/50 dark:bg-zinc-850/50" />

            {/* Right Column: Interactive 3D Visualizer & Audio Control console (40% width on lg) */}
            <div className="w-full lg:w-[42%] xl:w-[38%] p-6 sm:p-12 lg:p-10 xl:p-12 lg:h-screen lg:sticky lg:top-0 flex flex-col gap-6 justify-center bg-zinc-50/20 dark:bg-zinc-950/5 backdrop-blur-xs border-t lg:border-t-0 border-zinc-200/40 dark:border-zinc-850/40">
              
              {/* Desktop Only: Interactive 3D Canvas */}
              <div className="hidden lg:block">
                <InteractiveCanvas />
              </div>

              {/* Ambient Audio Synthesizer Controls */}
              <AudioPlayer />
            </div>

          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

