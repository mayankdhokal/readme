import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "@/components/cookie-consent/page";

export const metadata: Metadata = {
  title: "Edulume",
  description: "Intelligence that understands each student individually. Discover exactly where learners struggle, what they've mastered, and the precise path forward. Request a demo.",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Learning Intelligence | Edulume",
    description: "Intelligence that understands each student individually. Discover exactly where learners struggle, what they've mastered, and the precise path forward. Request a demo.",
    url: 'https://edulume.com',
    siteName: 'Edulume',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Learning Intelligence | Edulume",
    description: "Intelligence that understands each student individually. Discover exactly where learners struggle, what they've mastered, and the precise path forward. Request a demo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
