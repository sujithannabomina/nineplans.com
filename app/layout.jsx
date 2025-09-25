import "./globals.css";
import { Suspense } from "react";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import LeftNav from "@/components/LeftNav";
import RightRailAd from "@/components/RightRailAd";

export const metadata = {
  title: "NinePlans",
  description: "Write and read anonymously on NinePlans.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* SINGLE header/Banner (no duplicate bottom banner anywhere) */}
          <header className="w-full header-banner">
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
          </header>

          {/* 3-column layout on desktop; LeftNav scrollable; mobile = content only */}
          <main className="container mx-auto grid grid-cols-12 gap-4 pt-4">
            <aside className="hidden lg:block col-span-3">
              <div className="leftnav-scroll">
                <Suspense fallback={null}>
                  <LeftNav />
                </Suspense>
              </div>
            </aside>

            <section className="col-span-12 lg:col-span-6 min-h-[60vh]">
              {children}
            </section>

            <aside className="hidden lg:block col-span-3">
              <RightRailAd />
            </aside>
          </main>
        </Providers>
      </body>
    </html>
  );
}
