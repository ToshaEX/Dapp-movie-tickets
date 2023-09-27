"use client";
import { MovieTicketingContext } from "@/context/MovieTicketingContext";
import { useContext } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Button = dynamic(() => import("@/components/Button"));
const Heading = dynamic(() => import("@/components/Heading"));

export default function Home() {
  const { connectWallet, currentAccount, isLoading } = useContext<any>(
    MovieTicketingContext
  );
  if (isLoading) return <div>Loading</div>;
  return (
    <main className="flex h-[90vh] flex-col justify-center items-center">
      <Heading text="Welcome to Movie Ticketing App" />
      <p className="m-5 text-2xl w-[50vw] text-gray-600 font-semibold">
        {
          "To purchase tickets, you'll need to connect your MetaMask wallet. If you don't have MetaMask installed, you can download it "
        }
        <Link
          target="_blank"
          href={"https://metamask.io/"}
          className="text-teal-500"
        >
          here
        </Link>
      </p>
      {!currentAccount ? (
        <Button
          onClick={connectWallet}
          label="Connect Wallet"
          isLoading={false}
        />
      ) : (
        <p className="text-gray-500 text-5xl text-center m-5">
          {" "}
          {"Your wallet is Connected 👍"}
        </p>
      )}
    </main>
  );
}
