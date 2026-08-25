import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // À remplacer par le vrai domaine de production une fois déployé.
  metadataBase: new URL("https://tata-rust-nu.vercel.app"),
 
  title: {
    default: "Gestion pedagogique",
    template: "%s · Gestion pedagogique",
  },
  description:
    "Application de gestion de pedagogique : Contrôler les retards de chaque enseignant",
 
  applicationName: "Gestion pedagogique",
  keywords: [
    "gestion pedagogique",
    "retard enseignant",
    "emploi du temps",
    "cours",
    "enseignements",
  ],
  authors: [{ name: "Gestion pedagogique" }],
  creator: "Gestion pedagogique",
 
  formatDetection: {
    telephone: false,
  },
 
  // Suppose que ces fichiers existent dans /public — sinon retire ce bloc
  // ou génère-les (favicon.ico, apple-touch-icon.png, site.webmanifest).
 
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Gestion pedagogique",
    title: "Gestion pedagogique",
    description:
      "Application de gestion pedagogique : Contrôler les retards de chaque enseignant.",
  },
 
  twitter: {
    card: "summary_large_image",
    title: "Gestion pedagogique",
    description: "Application de gestion pedagogique",
  },
 
  // App interne : non indexée par défaut. Passe index/follow à true
  // si elle doit un jour être publiquement référençable.
  robots: {
    index: false,
    follow: false,
  },
};
 
// themeColor ne fait plus partie de Metadata depuis Next 14 : il vit dans
// un export viewport séparé. #dc2626 = le rouge utilisé partout dans l'app.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#dc2626",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-center"
           toastOptions={{
              classNames: {
                toast: "bg-black text-white border-zinc-800",
              },
            }}
        />
        <Analytics/>
      </body>
    </html>
  );
}
