import { MovieTicketingProvider } from "@/context/MovieTicketingContext";
import "react-toastify/ReactToastify.min.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
const inter = Inter({ subsets: ["latin"] });

const NavBar = dynamic(() => import("@/components/NavBar"));

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
        <MovieTicketingProvider>
          <NavBar />
          <div className="area">
            <ul className="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          {children}
          <ToastContainer position="bottom-right" newestOnTop />
        </MovieTicketingProvider>
      </body>
    </html>
  );
}
