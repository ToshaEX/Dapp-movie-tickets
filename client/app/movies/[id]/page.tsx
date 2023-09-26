"use client";

import { MovieTicketingContext } from "@/context/MovieTicketingContext";
import { useParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type MovieType = {
  id: number;
  title: string;
};

type SeatsType = {
  index: number;
  isBooked: boolean;
};

interface SeatProp {
  seat: SeatsType;
  setSelectSeats: Dispatch<SetStateAction<number[]>>;
  selectSeats: number[];
}

const Seat = ({ seat, setSelectSeats, selectSeats }: SeatProp) => {
  const [color, setColor] = useState(`${seat.isBooked ? "red" : "green"}`);
  const handleClick = () => {
    if (seat.isBooked) return;
    color === "yellow"
      ? setColor(`${seat.isBooked ? "red" : "green"}`)
      : setColor("yellow");
    if (color === "green") {
      setColor("yellow");
      setSelectSeats((prevState) => [...prevState, seat.index]);
    } else {
      setColor("green");

      setSelectSeats((prevState) => [
        ...prevState.filter((seatIndex) => seatIndex !== seat.index),
      ]);
    }
  };
  return (
    <div
      key={`seat-${seat.index}`}
      className={"w-5 h-5 m-2 "}
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      {seat.index}
    </div>
  );
};

export default function Booking() {
  const { id } = useParams();
  const movieId = +id;
  const { getAllMovies, isLoading, getSeatsByMovieId } = useContext<any>(
    MovieTicketingContext
  );
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [seats, setSeats] = useState<SeatsType[]>();
  const [selectSeats, setSelectSeats] = useState<number[]>([]);

  const getAllMoviesAsync = async () => {
    const movies = await getAllMovies();
    const movieArr = movies.map((movie: any) => ({
      title: movie["title"],
      id: parseInt(movie["movieIndex"]),
    }));
    setMovies(movieArr);
  };
  const getSeatsByMovieIdAsync = async () => {
    const bookedSeatsArr: number[] = await getSeatsByMovieId(movieId);
    const seatsArr: SeatsType[] = [];
    for (let i = 0; i < 20; i++) {
      let isBooked = bookedSeatsArr.includes(i);
      const seat = {
        index: i,
        isBooked,
      };
      seatsArr.push(seat);
    }
    setSeats([...seatsArr]);
  };

  useEffect(() => {
    getAllMoviesAsync();
    getSeatsByMovieIdAsync();
  }, []);

  if (!movies.length || isLoading) return <div>Loading</div>;
  const foundMovie = movies.filter((movie) => movie.id === movieId);
  console.log(movies);
  console.log(seats);

  return (
    <div>
      <h1>{foundMovie[0]?.title}</h1>
      <div className="grid grid-cols-5">
        {seats?.map((seat) => (
          <Seat
            seat={seat}
            key={seat.index}
            setSelectSeats={setSelectSeats}
            selectSeats={selectSeats}
          />
        ))}
      </div>
      {selectSeats.map((seat, i) => (
        <div key={i}>{seat}</div>
      ))}
    </div>
  );
}
