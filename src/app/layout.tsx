import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import WhatsAppFloat from "@/components/common/WhatsAppFloat";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Maa Bhagwati Pharmaceuticals | Northeast India's Largest Online B2B Pharma Store",
    template: "%s | Maa Bhagwati Pharmaceuticals",
  },
  description:
    "Wholesale pharmaceutical distributor and cold-chain supplier in Guwahati, Assam. Shop 5,000+ genuine medicines, antibiotics, surgicals, and hospital supplies at best PTR/PTS trade prices.",
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
      className={`${poppins.variable} ${jakarta.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-[#F4F7FB] text-[#0F172A] selection:bg-[#1D4ED8]/15 selection:text-[#1D4ED8]"
        suppressHydrationWarning
      >
        {children}
        <WhatsAppFloat />
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "#FFFFFF",
              border: "1px solid #CBD5E1",
              color: "#0F172A",
            },
          }}
        />
      </body>
    </html>
  );
}
