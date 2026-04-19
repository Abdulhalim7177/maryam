import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maryam Ibrahim | Client Support & Operations Specialist",
  description: "Client Support & Operations Specialist helping businesses and entrepreneurs run smoothly by managing client relations, administrative workflows, and operational systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} ${playfair.variable} ${inter.variable} min-h-screen bg-[#f8f7f4] text-[#1a1a2e] antialiased`}>
        {children}
      </body>
    </html>
  );
}