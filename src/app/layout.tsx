import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Components
import Header from "./components/header";
import Footer from "./components/footer";
import Theme from "./components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kelvin to RGB",
  description: "Convert Kelvin to RGB color temperature",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <Header />
          {children}
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
