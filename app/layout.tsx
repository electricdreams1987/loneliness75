import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "75歳の孤独 -老後の人生シミュレーター-",
  description: "18歳から75歳までの人生を数分で疑似体験する、選択型ライフゲームシミュレーター。あなたの下す仕事、家族、友人関係、健康の決断は、75歳の孤独にどうつながるのか。",
  keywords: ["人生シミュレーター", "ライフゲーム", "老後の備え", "孤独リスク", "人間関係"],
  openGraph: {
    title: "75歳の孤独 -老後の人生シミュレーター-",
    description: "あなたの選択は、75歳の孤独にどうつながるのか。人生後半の人間関係を考えるシミュレーションゲーム。",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">{children}</body>
    </html>
  );
}

