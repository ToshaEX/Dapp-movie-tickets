"use client";
import { MovieTicketingContext } from "@/context/MovieTicketingContext";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import dynamic from "next/dynamic";

const Heading = dynamic(() => import("@/components/Heading"));

type MovieType = {
  id: number;
  title: string;
  rating: string;
  availableSeats?: number;
};
type SeatType = {
  movieId: number;
  availableSeats: number;
};

export default function Movies() {
  const { getAllMovies, isLoading, getSeatsByMovieId } = useContext<any>(
    MovieTicketingContext
  );
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [seats, setSeats] = useState<SeatType[]>([]);

  const getSeatsAsync = async (movieIds: number[], moviesArr: MovieType[]) => {
    console.log("movies", moviesArr, movieIds);
    const arr: SeatType[] = [];
    for (let i = 0; i < movieIds.length; i++) {
      const seats = await getSeatsByMovieId(movieIds[i]);
      const obj: SeatType = {
        movieId: movieIds[i],
        availableSeats: 20 - ethers.BigNumber.from(seats.length).toNumber(),
      };
      arr.push(obj);
    }
    setSeats([...arr]);
  };

  const getAllMoviesAsync = async () => {
    const moviesArr = await getAllMovies();
    const arr: MovieType[] = [];
    const movieIdArr: number[] = [];
    for (let i = 0; i < moviesArr.length; i++) {
      const movieId = ethers.BigNumber.from(
        moviesArr[i]["movieIndex"]
      ).toNumber();
      const obj: MovieType = {
        title: moviesArr[i]["title"],
        id: movieId,
        rating: ethers.BigNumber.from(moviesArr[i].rating).toString(),
      };
      arr.push(obj);
      movieIdArr.push(movieId);
    }
    setMovies([...arr]);
    return { moviesArr: arr, idArr: movieIdArr };
  };
  useEffect(() => {
    getAllMoviesAsync().then(({ idArr, moviesArr }) =>
      getSeatsAsync(idArr, moviesArr)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //TODO: implement Loading
  if (isLoading) return <div>Loading</div>;
  if (!movies.length)
    return (
      <div className="m-5 text-gray-500 text-2xl">
        No Movie found, Stay tuned 😔
      </div>
    );

  return (
    <div>
      <Heading text="Movies" />
      <div className="flex flex-row flex-wrap m-5">
        {movies.map((movie) => (
          <Link key={`movie-id-${movie.id}`} href={`/movies/${movie.id}`}>
            <div className="hover:bg-teal-400 p-5 mb-2 ml-2 w-[20rem]  hover:shadow-md transition-all duration-700 bg-teal-500">
              <div className="flex flex-row items-center justify-between">
                <span className="text-3xl font-semibold capitalize text-gray-800">
                  {movie.title}
                </span>
                <div className="flex flex-row flex-nowrap">
                  {ratingArr(+movie.rating)}
                </div>
              </div>
              <div className="text-2xl">
                Available :#
                {
                  seats.filter((seats) => seats.movieId === movie.id)[0]
                    ?.availableSeats
                }
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const ratingArr = (rating: number) => {
  const arr: string[] = [];
  for (let i = 0; i < rating; i++) {
    arr.push("⭐");
  }
  return arr;
};
