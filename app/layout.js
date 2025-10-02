// app/layout.js
import "./globals.css";
import Header from "@/components/Header";
import Providers from "./providers";

export const metadata = {
  title: "NinePlans",
  description: "Write posts, reviews, and confessions — with your name or an alias.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black text-zinc-100">
      <body>
        <Providers>
          <Header />
          {/* Tagline (subtle, global) */}
          <div className="border-b border-zinc-800 bg-zinc-950">
            <div className="mx-auto max-w-7xl px-4 lg:px-6 py-2 text-sm text-zinc-400">
              You can write confessions anonymously — or use an alias — even when you&apos;re logged in.
            </div>
          </div>

          <div className="py-6">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
