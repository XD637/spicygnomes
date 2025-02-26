import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import App from "./App"; // Wrap everything with App.js

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SpicyGnomes | LittleBao",
  description: "NFT by LittleBao",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg-loop bg-cover bg-repeat bg-center flex flex-col min-h-screen`}
      >
        <App>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </App>
      </body>
    </html>
  );
}
