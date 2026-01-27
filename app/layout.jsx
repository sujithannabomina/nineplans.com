// app/layout.jsx
import "./globals.css";
import Shell from "@/components/Shell";

export const metadata = {
  title: "NinePlans",
  description: "Alias-first community for anonymous-friendly posts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
