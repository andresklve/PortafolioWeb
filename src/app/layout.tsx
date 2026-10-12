import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Background } from "@/components/background";
import { BootScreen } from "@/components/boot-screen";
import { LanguageProvider } from "@/components/language-provider";
import { Nav } from "@/components/nav";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Carlos Andres Infantas Galindo — Backend Developer",
    template: "%s — Carlos Andres Infantas Galindo",
  },
  description:
    "Portafolio de Carlos Andres Infantas Galindo: desarrollo backend, arquitectura de software y microservicios con Java, Spring Boot y TypeScript.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="min-h-screen">
        <LanguageProvider>
          <Background />
          <BootScreen>
            <Nav />
            <main className="relative z-10">{children}</main>
            <SiteFooter />
          </BootScreen>
        </LanguageProvider>
      </body>
    </html>
  );
}
