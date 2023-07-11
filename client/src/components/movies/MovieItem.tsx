import { Movie } from "../../domain/movie";

interface Props {
  movie: Movie;
  active: boolean;
}

export default function MovieItem({ movie, active }: Props) {
  return (
    <div className={`movieItem ${active ? "activeItem" : ""}`}>
      <img className="image" src={movie.poster} />
    </div>
  );
}
