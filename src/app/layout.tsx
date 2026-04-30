import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.equiviesaworldwide.com'),
  alternates: {
    canonical: '/',
  },
  title: "VIESA Automations | The Blueprint for Digital Dominance",
  description: "VIESA Automations is de blauwdruk voor digitale dominantie in de bouw en daarbuiten. Fully automated processes from lead to invoice.",
  keywords: "automations, crm, viesa automations, seo, digitale dominantie",
  openGraph: {
    title: "VIESA Automations | The Blueprint for Digital Dominance",
    description: "Fully automated processes from lead to invoice.",
    url: "https://www.equiviesaworldwide.com",
    siteName: "VIESA Automations",
    type: "website",
  },
  robots: "index, follow",
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
