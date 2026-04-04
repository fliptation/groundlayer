import { Playfair_Display, Source_Serif_4, DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./components/AuthProvider";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata() {
  const t = await getTranslations("metadata");
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    title: t("home.title"),
    description: t("home.description"),
    openGraph: {
      type: 'website' as const,
      siteName: t("home.title"),
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image' as const,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={cn("h-full", "antialiased", playfair.variable, sourceSerif.variable, dmSans.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-cream text-foreground">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-green-deep focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold">
          Skip to content
        </a>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
