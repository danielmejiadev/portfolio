import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import CommandPalette from "@/components/CommandPalette";
import Providers from "./providers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_URL = "https://danielmejiadev.github.io/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Daniel Mejía — Senior / Lead Software Engineer",
  description:
    "Daniel Mejía — Senior/Lead Software Engineer specializing in React, Next.js and TypeScript, building AI-native applications with Claude, GPT, MCP and real-time streaming.",
  openGraph: {
    title: "Daniel Mejía — Senior / Lead Software Engineer",
    description: "AI-native application engineering — React, Next.js, TypeScript, Claude/GPT, MCP, RAG, real-time streaming.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Daniel Mejía",
  alternateName: "Luis Daniel Mejía",
  jobTitle: "Senior / Lead Software Engineer",
  email: "mailto:luisdanielmejia@outlook.com",
  telephone: "+57-312-614-0708",
  address: { "@type": "PostalAddress", addressLocality: "Bogotá", addressCountry: "CO" },
  sameAs: ["https://github.com/danielmejiadev", "https://linkedin.com/in/danielmejiadev"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="bg-bg text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          {children}
          <CommandPalette />
        </Providers>
      </body>
    </html>
  );
}
