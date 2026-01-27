// app/layout.jsx
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "NinePlans — Post anonymous",
  description: "Anonymous community where you can post anonymously (alias-first).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
