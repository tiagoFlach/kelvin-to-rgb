import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { ThemeProvider } from "./components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kelvin to RGB",
  description: "Convert Kelvin color temperature to RGB",
  keywords: ["kelvin", "rgb", "color", "temperature"],
  authors: {
    name: "Tiago Lucas Flach",
    url: "https://github.com/tiagoFlach",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <Navbar />
            <div className="container mx-auto mb-16 px-2 sm:px-4">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
