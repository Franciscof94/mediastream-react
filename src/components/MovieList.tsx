import { FC, useState } from "react";
import { IMovieInfo } from "../interfaces";

interface Props {
  movie: IMovieInfo;
}

export const MovieList: FC<Props> = ({ movie }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      {!imageError && (
        <li key={movie.id} className="rounded">
          <div
            className="relative rounded"
            style={{ width: "300px", height: "400px" }}
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full rounded"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-30 to-transparent"></div>
            <ul className="absolute bottom-0 left-0 p-4 text-white">
              <li className="font-bold text-lg">{movie.title}</li>
              <li> {movie.year}</li>
              <li> {movie.genres.join(", ")}</li>
            </ul>
          </div>
        </li>
      )}
    </>
  );
};
