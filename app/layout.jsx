// app/layout.jsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import GlobalBanner from "@/components/GlobalBanner";
import LeftNav from "@/components/LeftNav";
import RightRailAd from "@/components/RightRailAd";
import Providers from "@/components/Providers";

export const metadata = {
  title: "NinePlans — Next Big Thing",
  description: "Share confessions, ideas and reviews.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black">
      <body className="text-zinc-100">
        <Providers>
          <Navbar />
          <GlobalBanner />

          <main className="mx-auto max-w-7xl px-3 lg:px-4">
            <div className="flex gap-6">
              <LeftNav />
              <div className="flex-1 min-w-0 py-6">{children}</div>
              <aside className="hidden xl:block w-72 shrink-0 py-6">
                <RightRailAd />
              </aside>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
