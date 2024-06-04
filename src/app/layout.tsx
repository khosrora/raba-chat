import ThemeProviders from "@/providers/theme-providers";
import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "raba-chat",
  description: "chat service for learning and testing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProviders>{children}</ThemeProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
