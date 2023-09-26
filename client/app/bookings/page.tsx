"use client";
import { MovieTicketingContext } from "@/context/MovieTicketingContext";
import { useContext, useEffect, useState } from "react";

type MovieType = {
  id: number;
  title: string;
};
type SeatType = {
  movieId: number;
  seatIndex: number;
};

export default function Bookings() {
  const {
    getAllMovies,
    isLoading,
    getSeatsByMovieId,
    getBookedSeatsByClientId,
  } = useContext<any>(MovieTicketingContext);
  const [bookings, setBookings] = useState<SeatType[]>([]);
  const [movies, setMovies] = useState<MovieType[]>([]);

  const getAllMoviesAsync = async () => {
    const movies = await getAllMovies();
    const movieArr = movies.map((movie: any) => ({
      title: movie["title"],
      id: parseInt(movie["movieIndex"]),
    }));
    setMovies(movieArr);
  };

  const getBookingsAsync = async () => {
    const bookingsSeats = await getBookedSeatsByClientId();
    const bookingsArr = bookingsSeats.map((bookings: any) => ({
      movieId: bookings["movieId"],
      seatIndex: parseInt(bookings["seatIndex"]),
    }));
    setBookings(bookingsArr);
    console.log("bookings", bookings);
  };

  useEffect(() => {
    getAllMoviesAsync();
    getBookingsAsync();
  }, []);

  if (isLoading || !movies.length || !bookings.length)
    return <div>Loading</div>;
  console.log(movies);
  return (
    <div>
      {bookings?.map((booking) => (
        <div key={`seat-id-${booking?.seatIndex}`}>
          {movies?.filter((movie) => movie.id !== booking.movieId)[0]?.title}-
          {booking?.seatIndex}
        </div>
      ))}
    </div>
  );
}
