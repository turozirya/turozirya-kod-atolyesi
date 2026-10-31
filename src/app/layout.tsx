import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const baloo2 = Baloo_2({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
});

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const description =
  "Turozirya Kod Atölyesi — ortaokul robotik kodlama kulübü için öğrenme platformu";

export const metadata: Metadata = {
  title: "Turozirya Kod Atölyesi",
  description,
  manifest: "/manifest.json",
  openGraph: {
    title: "Turozirya Kod Atölyesi",
    description,
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Turozirya Kod Atölyesi",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#8b5cf6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${baloo2.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
