import { FC } from "react";
import { IMovies } from "../interfaces";
import { useAppDispatch } from "../store/hook";
import { addItem, removeItem } from "../store/features/cartSlice";
interface Props {
  movieCount: number | null | undefined;
  id: number;
  allMovies: IMovies[] | undefined;
}
export const ItemCount: FC<Props> = ({ movieCount, id, allMovies }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex mt-1">
      <button
        className="bg-green-30 rounded h-5 w-5"
        onClick={() => dispatch(removeItem(id))}
      >
        -
      </button>
      <span className="mx-2 text-white text-base">{movieCount}</span>
      <button
        className="bg-green-30 rounded h-5 w-5"
        onClick={() => dispatch(addItem({ id: id, data: allMovies }))}
      >
        +
      </button>
    </div>
  );
};
