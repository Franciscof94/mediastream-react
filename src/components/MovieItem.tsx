import { FC } from "react";
import { IMovies } from "../interfaces";
import { useAppDispatch } from "../store/hook";
import { addItem } from "../store/features/cartSlice";
import { ItemCount } from "./ItemCount";

interface Props {
  movie: IMovies;
  isCart: boolean;
  allMovies?: IMovies[];
}

export const MovieItem: FC<Props> = ({ movie, allMovies, isCart }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="bg-grey-20 rounded p-3 max-h-[120px]">
      <ul className="list-none">
        <li className="text-white">ID: {movie.id}</li>
        <li className="text-white">Name: {movie.name}</li>
        <li className="text-white">Price: ${movie.price}</li>
      </ul>
      {isCart ? (
        <button
          className="rounded bg-green-30 text-xs px-[3px] py-[1px]"
          onClick={() => dispatch(addItem({ id: movie.id, data: allMovies }))}
        >
          Add to cart
        </button>
      ) : (
        <ItemCount
          movieCount={movie.count}
          id={movie.id}
          allMovies={allMovies}
        />
      )}
    </div>
  );
};
