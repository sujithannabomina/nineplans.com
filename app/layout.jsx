export const dynamic = "force-static";

import "./globals.css";
import Navbar from "@/components/Navbar";
import GlobalBanner from "@/components/GlobalBanner";
import LeftNav from "@/components/LeftNav";
import RightRailAd from "@/components/RightRailAd";
import Providers from "@/components/Providers";

export const metadata = {
  title: "NinePlans — Next Big Thing",
  description: "Write confessions anonymously, share reviews and ideas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <Providers>
          {/* Top navigation */}
          <Navbar />

          {/* SINGLE global banner (we removed any duplicates from Navbar/pages) */}
          <GlobalBanner />

          {/* 3-col app shell */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6">
              {/* Left rail (hidden on mobile, toggled by hamburger) */}
              <aside
                id="left-rail"
                className="col-span-12 md:col-span-3 hidden md:block border-r border-white/10"
              >
                <LeftNav />
              </aside>

              {/* Main content */}
              <main className="col-span-12 md:col-span-6 min-h-[60vh]">
                {children}
              </main>

              {/* Right rail (ads) */}
              <aside className="col-span-12 md:col-span-3">
                <RightRailAd />
              </aside>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
