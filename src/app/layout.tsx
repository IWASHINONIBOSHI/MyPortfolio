// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css" ; //

export const metadata: Metadata = {
  title: "Iwamoto Portfolio",
  description: "自己紹介兼ポートフォリオサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <div className="container">
          {/* 全ページ共通ヘッダー */}
          <header className="site-header">
            <h1>自己紹介兼ポートフォリオ</h1>
          </header>

          {/* ここに各ページの中身が入る */}
          <main className="site-main">
            {children}
          </main>

          {/* 全ページ共通フッター */}
          <footer className="site-footer">
            <p>&copy; {new Date().getFullYear()} Iwamoto</p>
          </footer>
        </div>
      </body>
    </html>
  );
}