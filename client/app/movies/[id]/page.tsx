"use client";
import Loading from "@/app/loading";
import { MovieTicketingContext } from "@/context/MovieTicketingContext";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const Button = dynamic(() => import("@/components/Button"));
const Heading = dynamic(() => import("@/components/Heading"));

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

    if (color === "green" && selectSeats.length !== 5) {
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
      className="flex justify-center items-center"
      style={{
        backgroundColor: color,
        opacity: ".5",
        borderBottom: "5px solid red",
        margin: ".5rem",
        width: "2rem",
        height: "2rem",
        color: "white",
      }}
      onClick={handleClick}
    >
      {seat.index}
    </div>
  );
};

export default function Booking() {
  const { id } = useParams();
  const movieId = +id;
  const { getAllMovies, isLoading, getSeatsByMovieId, bookingSeats } =
    useContext<any>(MovieTicketingContext);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [seats, setSeats] = useState<SeatsType[]>([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!movies.length || isLoading) return <Loading />;

  const foundMovie = movies.filter((movie) => movie.id === movieId);

  const handleBooking = async () => {
    const amount = 13000000000000000 * selectSeats.length;

    bookingSeats(amount, selectSeats, movieId);
  };

  return (
    <div>
      <Heading text={foundMovie[0]?.title} />
      <div className="flex flex-wrap  m-5 w-[15rem] ">
        {seats?.map((seat) => (
          <Seat
            seat={seat}
            key={seat.index}
            setSelectSeats={setSelectSeats}
            selectSeats={selectSeats}
          />
        ))}
      </div>
      <div className={"mx-5"}>Ticket Price : 20 $</div>
      {selectSeats.length ? (
        <>
          <div className={"mx-5"}>
            <div>Total amount: 20 * {selectSeats.length}</div>
            <div>
              {" "}
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;:{" "}
              {20 * selectSeats.length} $
            </div>
          </div>
          <Button label="Book Now" isLoading={false} onClick={handleBooking} />
        </>
      ) : null}
    </div>
  );
}
