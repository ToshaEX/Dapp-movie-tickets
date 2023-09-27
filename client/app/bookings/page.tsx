"use client";
import { MovieTicketingContext } from "@/context/MovieTicketingContext";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Heading = dynamic(() => import("@/components/Heading"));
type MovieType = {
  id: number;
  title: string;
};
type SeatType = {
  movieId: number;
  seatIndex: number;
};

export default function Bookings() {
  const { getAllMovies, isLoading, getBookedSeatsByClientId } = useContext<any>(
    MovieTicketingContext
  );
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
      movieId: parseInt(bookings["movieId"]),
      seatIndex: parseInt(bookings["seatIndex"]),
    }));
    setBookings(bookingsArr);
  };
  useEffect(() => {
    getAllMoviesAsync();
    getBookingsAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="flex flex-col h-[80vh]">
      <Heading text="My Tickets" />
      <div className="flex flex-row flex-wrap overflow-y-auto ">
        {!bookings.length ? (
          <div className="text-2xl m-5">Oops, No Tickets found 🤔</div>
        ) : null}
        {bookings?.map((booking) => (
          <div
            key={`${booking.movieId}-seat-id-${booking?.seatIndex}-ticket`}
            className="bg-teal-500 hover:bg-teal-400  transition-all duration-700 hover:shadow-md m-2 px-2 py-5 flex flex-row  w-[20vw] items-center justify-between"
          >
            <div>
              <div className="text-2xl text-gray-800 capitalize">
                {
                  movies?.filter((movie) => movie.id === booking.movieId)[0]
                    ?.title
                }
              </div>
              <p className="text-gray-500 font-semibold ">
                Seat No: <span className="text-gray-400 text-3xl">#</span>
                <span className=" text-3xl">{booking?.seatIndex}</span>
              </p>
            </div>
            <p className="text-5xl text-gray-800 font-semibold">20$</p>
          </div>
        ))}
      </div>
    </div>
  );
}
