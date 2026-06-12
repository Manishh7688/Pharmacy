import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import WhatsAppFloat from "@/components/common/WhatsAppFloat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Maa Bhagwati Pharmaceuticals | Pharmaceutical Wholesaler Guwahati",
    template: "%s | Maa Bhagwati Pharmaceuticals",
  },
  description: "Leading pharmaceutical products wholesaler and distributor in Guwahati, Assam. Trusted supplier of quality generic medicines, branded drugs, OTC & surgicals across Northeast India.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full bg-white text-slate-900" 
        suppressHydrationWarning
      >
        {children}
        <WhatsAppFloat />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
