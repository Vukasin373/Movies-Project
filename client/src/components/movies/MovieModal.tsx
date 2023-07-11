import { Movie } from "../../domain/movie";

interface Props {
  selectedMovie: Movie;
}

export default function MovieModal({ selectedMovie }: Props) {
  return (
    <div className="modal">
      <div className="modalContent">
        <img src={selectedMovie.poster} className="imageModal" />
        <div>
          <h2>{selectedMovie.title}</h2>
          <div>Type: {selectedMovie.type}</div>
          <div>Year: {selectedMovie.year}</div>
          <div>ImdbID: {selectedMovie.imdbID}</div>
        </div>
      </div>
    </div>
  );
}
