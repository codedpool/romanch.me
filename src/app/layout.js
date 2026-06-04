import { Geist, Geist_Mono, Kaushan_Script, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kaushan = Kaushan_Script({
  variable: "--font-kaushan",
  subsets: ["latin"],
  weight: "400",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Romanch Roshan Singh",
  description: "Romanch's Portfolio",
  icons: {
    icon: '/portfolio.png',
    shortcut: '/portfolio.png',
    apple: '/portfolio.png',
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kaushan.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
