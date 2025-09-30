import "./globals.css";
import Navbar from "@/components/Navbar";
import LeftNav from "@/components/LeftNav";
import RightRailAd from "@/components/RightRailAd";
import Providers from "@/components/Providers";

export const metadata = {
  title: "NinePlans",
  description: "Confess, review, and share ideas — anonymously if you want.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <div className="tagline">
            <div className="mx-auto max-w-6xl px-4">
              You can write confessions anonymously, even when you're logged in.
            </div>
          </div>

          <main className="mx-auto max-w-6xl px-4 pb-12 container-3col">
            {/* Left rail (sticky) */}
            <aside className="left-rail hidden lg:block">
              <LeftNav />
            </aside>

            {/* Main content */}
            <section>
              {children}
            </section>

            {/* Right rail (sticky) */}
            <aside className="right-rail hidden lg:block">
              <RightRailAd />
            </aside>
          </main>
        </Providers>
      </body>
    </html>
  );
}
