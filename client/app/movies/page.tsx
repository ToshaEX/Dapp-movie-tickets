"use client";
import { MovieTicketingContext } from "@/context/MovieTicketingContext";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

type MovieType = {
  id: number;
  title: string;
};

export default function Movies() {
  const { getAllMovies, isLoading } = useContext<any>(MovieTicketingContext);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const getAllMoviesAsync = async () => {
    const movies = await getAllMovies();
    const movieArr = movies.map((movie: any) => ({
      title: movie["title"],
      id: parseInt(movie["movieIndex"]),
    }));
    setMovies(movieArr);
  };
  useEffect(() => {
    getAllMoviesAsync();
  }, []);
  //TODO: implement Loading
  if (!movies.length || isLoading) return <div>Loading</div>;
  return (
    <div>
      {movies.map((movie) => (
        <div key={`movie-id-${movie.id}`}>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </div>
      ))}
    </div>
  );
}
