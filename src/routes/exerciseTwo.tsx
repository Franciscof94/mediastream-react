import React, { useEffect } from "react";
import { Mountains } from "../assets/images";
import { MovieList, SearchBar } from "../components";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
  fetchAllGenresMoviesExerciseTwo,
  fetchAllMoviesExerciseTwo,
} from "../store/features/movieSlice";
import Spinner from "../components/Spinner";

const ExerciseTwo = () => {
  const dispatch = useAppDispatch();
  const {
    moviesListExerciseTwo,
    genres,
    loading,
    error,
    filters: { orderBy, genre },
  } = useAppSelector((state) => state.movies);
  useEffect(() => {
    dispatch(fetchAllMoviesExerciseTwo({ orderBy, genre }));
  }, [dispatch, genre, orderBy]);

  useEffect(() => {
    dispatch(fetchAllGenresMoviesExerciseTwo());
  }, [dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section
      className="text-white  bg-center p-[4rem]"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "auto",
        backgroundImage: `linear-gradient(to top, #1B1B1B 70%, rgba(0,0,0,0) 100%), url(${Mountains})`,
        backgroundSize: "100%",
      }}
    >
      <h1 className=" text-[2em] mb-4 font-bold">Movie Library</h1>
      <div className="max-w-[1375px]">
        <SearchBar genres={genres} genre={genre}/>
        {loading ? (
          <Spinner />
        ) : (
          <ul className="grid grid-cols-4 gap-[4.25rem] mt-16">
            {moviesListExerciseTwo.map((movie, index) => (
              <MovieList movie={movie} key={index} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ExerciseTwo;
