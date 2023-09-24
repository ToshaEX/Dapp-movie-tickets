import { MovieTicketingProvider } from "@/context/MovieTicketingContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web 3: Movie Ticketing App",
  description: "Etherium based movie ticketing App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MovieTicketingProvider>{children}</MovieTicketingProvider>
      </body>
    </html>
  );
}
