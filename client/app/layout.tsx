import { MovieTicketingProvider } from "@/context/MovieTicketingContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web 3: Movie Ticketing App",
  description: "Ethereum based movie ticketing App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <MovieTicketingProvider>{children}</MovieTicketingProvider>
      </body>
    </html>
  );
}
