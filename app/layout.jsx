import "./globals.css";
import Providers from "@/app/providers";

export const metadata = {
  title: "NinePlans — Anonymous Community",
  description: "A black-and-white, alias-first community platform.",
  openGraph: {
    title: "NinePlans",
    description: "Anonymous community platform",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  const pub = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  return (
    <html lang="en">
      <head>
        {pub ? (
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pub}`} crossOrigin="anonymous" />
        ) : null}
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
