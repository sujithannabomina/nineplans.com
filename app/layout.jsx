import "./globals.css";
import Providers from "@/app/providers";

export const metadata = {
  title: "NinePlans — Post Anonymous",
  description: "The alias-first community. Post freely, discuss everything, stay anonymous.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black">
      <body className="bg-black text-white min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
