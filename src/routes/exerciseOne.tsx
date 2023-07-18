import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MovieItem } from "../components";
import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { fetchMovies } from "../store/features/movieSlice";

const ExerciseOne = () => {
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector((state) => state.movies);
  const { moviesCart, totalAmount } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex items-center flex-col justify-center bg-grey-60 h-screen w-screen">
      <div className="grid grid-cols-2 gap-x-8">
        {loading ? (
          <Spinner />
        ) : (
          <div className="w-[416px] bg-grey-40 p-4 rounded gap-y-4 grid">
            {movies?.map((movie, index) => (
              <MovieItem key={index} movie={movie} allMovies={movies} isCart />
            ))}
          </div>
        )}
        <div className="w-[416px] h-[425px] bg-grey-40 rounded p-4 rounded gap-y-4 grid relative">
          <div className="overflow-y-auto h-[330px] space-y-4">
            {moviesCart.map((movie, index) => (
              <MovieItem
                movie={movie}
                allMovies={movies}
                isCart={false}
                key={index}
              />
            ))}
          </div>

          <div className=" text-xlabsolute bottom-3 left-4 text-white">
            Total: ${totalAmount}
          </div>
        </div>
      </div>
      <button className="mt-3 bg-green-30 rounded px-6 py-3">
        <Link to="/">Back</Link>
      </button>
    </div>
  );
};

export default ExerciseOne;
