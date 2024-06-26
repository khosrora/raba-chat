import Layoutprovider from "@/providers/layout-provider";
import ThemeProviders from "@/providers/theme-providers";
import { ClerkProvider } from "@clerk/nextjs";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import ReduxProvider from "@/providers/redux_provider";

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
          <ReduxProvider>
            <ThemeProviders>
              <Layoutprovider>{children}</Layoutprovider>
            </ThemeProviders>
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
