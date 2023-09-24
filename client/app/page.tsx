"use client";
import { MovieTicketingContext } from "@/context/MovieTicketingContext";
import { useContext } from "react";
export default function Home() {
  const { connectWallet, currentAccount, addMovie, getAllMovies } = useContext(
    MovieTicketingContext
  );
  return (
    <main>
      {!currentAccount ? (
        <div onClick={connectWallet}>Connect Wallet</div>
      ) : null}
      <div onClick={addMovie}> Add Movie</div>
      <div onClick={getAllMovies}> Get all Movies</div>
    </main>
  );
}
