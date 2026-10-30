import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const baloo2 = Baloo_2({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
});

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Kodlama Kulübü",
  description: "Ortaokul robotik kodlama kulübü için öğrenme platformu",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${baloo2.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
