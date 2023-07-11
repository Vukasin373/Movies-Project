import React, { useEffect, useRef, useState } from "react";
import { Movie } from "../../domain/movie";
import MovieList from "./MovieList";
import MovieModal from "./MovieModal";

export default function MovieDashboard() {
  const [movies, setMovies] = useState<Movie[][]>([]);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [activeColumn, setActiveColumn] = useState<number>(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const types: Array<string> = ["Spiderman", "Batman", "Avengers"];

  //dodato kako bismo mogli odmah da se krećemo strelicama po filmovima nakon učitavanja aplikacije,
  //prvobitno je moralo da se klikne mišem bilo gde na ekranu
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const getMovies = async () => {
    try {
      const fetchedMovies: Movie[][] = [];
      let moviesOfType: Movie[] = [];
      for (const type of types) {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=ae7934b9&s=${type}`
        );
        const data = await response.json();

        if (data.Search) {
          data.Search.forEach((movie: any) => {
            const newMovie = new Movie(
              movie.Title,
              movie.Year,
              movie.imdbID,
              movie.Type,
              movie.Poster
            );
            moviesOfType.push(newMovie);
          });
        }

        fetchedMovies.push(moviesOfType);
        moviesOfType = [];
      }

      setMovies(fetchedMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      if (activeRow > 0 && !selectedMovie) {
        setActiveRow(activeRow - 1);
        if (activeColumn >= movies[activeRow - 1].length)
          setActiveColumn(movies[activeRow - 1].length - 1);
      }
    } else if (event.key === "ArrowDown") {
      if (activeRow < movies.length - 1 && !selectedMovie) {
        setActiveRow(activeRow + 1);
        if (activeColumn >= movies[activeRow + 1].length)
          setActiveColumn(movies[activeRow + 1].length - 1);
      }
    } else if (event.key === "ArrowLeft") {
      if (activeColumn > 0 && !selectedMovie) setActiveColumn(activeColumn - 1);
    } else if (event.key === "ArrowRight") {
      if (activeColumn < movies[activeRow].length - 1 && !selectedMovie)
        setActiveColumn(activeColumn + 1);
    } else if (event.key === "Enter") {
      setSelectedMovie(movies[activeRow][activeColumn]);
    } else if (event.key === "Escape") {
      setSelectedMovie(null);
    }
  };

  return (
    <div
      className="movieContainer"
      onKeyDown={handleKeyPress}
      tabIndex={0}
      ref={containerRef}
    >
      {movies.map((moviesOfType: Movie[], index: number) => (
        <MovieList
          key={index}
          movies={moviesOfType}
          activeRow={activeRow}
          activeColumn={activeColumn}
          row={index}
        />
      ))}
      {selectedMovie && <MovieModal selectedMovie={selectedMovie} />}
    </div>
  );
}
