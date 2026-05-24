import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Footer from "../components/footer";
import { ThemeProvider } from "../context/theme-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TO-DO
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
        <ThemeProvider>
          <div className="w-full max-w-2xl pl-6 pr-6 sm:pl-16 md:pl-24 py-8 sm:py-12 mr-auto flex flex-col flex-1 justify-between">
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
