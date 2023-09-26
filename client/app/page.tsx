"use client";
import { MovieTicketingContext } from "@/context/MovieTicketingContext";
import { useContext } from "react";

export default function Home() {
  const {
    connectWallet,
    currentAccount,
    addMovie,
    getAllMovies,
    bookingSeats,
    getSeatsByMovieId,
  } = useContext<any>(MovieTicketingContext);
  return (
    <main>
      {!currentAccount ? (
        <div onClick={connectWallet}>Connect Wallet</div>
      ) : null}
      <div onClick={() => addMovie("Gindari")}> Add Movie</div>
      <div onClick={bookingSeats}> Book seat </div>
      <div onClick={() => getSeatsByMovieId(0)}> Booked seats </div>
    </main>
  );
}
