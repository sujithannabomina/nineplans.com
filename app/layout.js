// app/layout.js
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import LeftNav from "@/components/LeftNav";
import RightRailAd from "@/components/RightRailAd";

export const metadata = {
  title: "NinePlans",
  description: "Write and discover posts across the community."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-neutral-950 text-neutral-100">
      <body>
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
            <div className="flex gap-6">
              <LeftNav />
              <section className="flex-1 min-w-0 py-6">{children}</section>
              <RightRailAd />
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
