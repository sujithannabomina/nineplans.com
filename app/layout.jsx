import "./globals.css";
import Navbar from "@/components/Navbar";
import LeftNav from "@/components/LeftNav";
import RightRailAd from "@/components/RightRailAd";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-zinc-950">
      <body className="text-zinc-200">
        <Navbar />
        <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 lg:grid-cols-[14rem_1fr_18rem]">
          <LeftNav />
          <div>{children}</div>
          <aside className="hidden lg:block">
            <RightRailAd />
          </aside>
        </main>
      </body>
    </html>
  );
}
