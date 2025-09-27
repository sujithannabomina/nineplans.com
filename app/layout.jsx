// app/layout.jsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

export const metadata = {
  title: "NinePlans",
  description:
    "Write confessions and short posts anonymously. Browse by category and share your thoughts.",
  metadataBase: new URL("https://nineplans.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-zinc-950 text-zinc-100">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <Providers>
          <Navbar />
          <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
