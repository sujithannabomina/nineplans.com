// app/layout.jsx
import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'NinePlans',
  description: 'NinePlans',
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
