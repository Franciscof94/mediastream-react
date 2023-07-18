import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { movies } from "../../mockData/movies";
import { IMovieInfo, IMovies } from "../../interfaces";

interface IFilter {
  orderBy: string;
  genre: string;
}

export type MovieState = {
  movies: IMovies[];
  moviesListExerciseTwo: IMovieInfo[];
  genres: any;
  loading: boolean;
  error: string | undefined;
  filters: {
    orderBy: string;
    genre: string;
  };
};

const initialState: MovieState = {
  movies: [],
  moviesListExerciseTwo: [],
  genres: [],
  loading: false,
  error: "",
  filters: {
    orderBy: "",
    genre: "",
  },
};

export const fetchMovies = createAsyncThunk(
  "data/fetchMovies",
  async (_, thunkAPI) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return movies;
    } catch (error) {
      console.error("Error al obtener las peliculas:", error);
      throw error;
    }
  }
);

export const fetchAllMoviesExerciseTwo = createAsyncThunk(
  "data/fetchAllMoviesExerciseTwo",
  async (props: { genre: string; orderBy: string }, thunkAPI) => {
    const { genre, orderBy } = props;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/movies?_limit=50${
          genre ? `&genres_like=${genre}` : ""
        }${orderBy ? `&_sort=year&_order=${orderBy}` : ""}`
      );
      let movies = await response.json();

      return movies;
    } catch (error) {
      console.error("Error al obtener las peliculas:", error);
      throw error;
    }
  }
);

export const fetchAllGenresMoviesExerciseTwo = createAsyncThunk(
  "data/fetchAllGenresMoviesExerciseTwo",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/genres`);
      const genres = await response.json();

      return genres;
    } catch (error) {
      console.error("Error al obtener los géneros:", error);
      throw error;
    }
  }
);

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<{ type: string; name: string }>
    ) => {
      state.filters[action.payload.type as keyof IFilter] = action.payload.name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllMoviesExerciseTwo.fulfilled, (state, action) => {
        state.moviesListExerciseTwo = action.payload;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchAllMoviesExerciseTwo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMoviesExerciseTwo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllGenresMoviesExerciseTwo.fulfilled, (state, action) => {
        const genres = action.payload.map((genre: string) => ({
          value: genre,
          label: genre,
        }));
        state.genres = genres;
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchAllGenresMoviesExerciseTwo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllGenresMoviesExerciseTwo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters } = movieSlice.actions;

export const moviesGlobal = (state: RootState) => state.movies;

export default movieSlice.reducer;
