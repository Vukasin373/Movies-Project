import { Movie } from "../../domain/movie";
import MovieItem from "./MovieItem";

interface Props {
  movies: Movie[];
  activeRow: number;
  activeColumn: number;
  row: number;
}

export default function MovieList({
  movies,
  activeRow,
  activeColumn,
  row,
}: Props) {
  return (
    <div className="row">
      {movies.map((movie: Movie, index: number) => (
        <MovieItem
          key={movie.imdbID}
          movie={movie}
          active={row === activeRow && activeColumn === index ? true : false}
        />
      ))}
    </div>
  );
}
