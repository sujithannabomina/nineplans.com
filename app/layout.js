// app/layout.js
import './globals.css';
import Providers from './providers';
import Header from '@/components/Header';
import LeftNav from '@/components/LeftNav';
import RightRailAd from '@/components/RightRailAd';

export const metadata = {
  title: 'NinePlans',
  description: 'You can write confessions anonymously, even when you’re logged in.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-neutral-950 text-neutral-100">
        <Providers>
          {/* Top header (logo, nav, hamburger) */}
          <Header />

          {/* 3-column shell (shows on all pages) */}
          <main className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-4 lg:gap-6">
              {/* Left rail (sticky, hidden on small screens) */}
              <aside className="hidden lg:block col-span-3 xl:col-span-2">
                <div className="sticky top-20">
                  <LeftNav />
                </div>
              </aside>

              {/* Content */}
              <section className="col-span-12 lg:col-span-7 xl:col-span-8">
                {children}
              </section>

              {/* Right rail ads (hidden on < xl) */}
              <aside className="hidden xl:block col-span-2">
                <div className="sticky top-20 space-y-4">
                  <RightRailAd />
                </div>
              </aside>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
