// app/layout.jsx
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "NinePlans",
  description:
    "You can write confessions anonymously, even when you're logged in.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
