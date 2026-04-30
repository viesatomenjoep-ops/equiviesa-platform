import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.equiviesa.com'),
  alternates: {
    canonical: '/',
  },
  title: "Equiviesa Worldwide | Premium Sport Horses & Elite Equestrian Platform",
  description: "Discover the world's most exclusive showjumping horses, elite equestrian facilities, and advanced AI-driven stable management at Equiviesa.",
  keywords: "equiviesa, maarten driessen, showjumping horses, elite sport horses, equestrian platform, horse sales, stable management, zandcement, egaliseren",
  openGraph: {
    title: "Equiviesa Worldwide | Premium Sport Horses",
    description: "Discover the world's most exclusive showjumping horses and advanced AI-driven stable management.",
    url: "https://www.equiviesa.com",
    siteName: "Equiviesa",
    type: "website",
  },
  robots: "index, follow, max-image-preview:large, max-snippet:-1",
  verification: {
    google: "google-site-verification-code" // Placeholder for real verification
  }
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} antialiased font-sans bg-background text-foreground min-h-screen flex flex-col`}
      >
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        {children}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new window.google.translate.TranslateElement({pageLanguage: 'nl', includedLanguages: 'en,nl,de,es', autoDisplay: false}, 'google_translate_element');
            }
          `}
        </Script>
        <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
      </body>
    </html>
  );
}
