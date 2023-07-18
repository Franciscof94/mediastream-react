export interface IMovies {
  id: number;
  name: string;
  price: number;
  count?: number;
}

export interface IMoviesCart {
  id: number;
  name: string;
  price: number;
  count?: number;
  totalPrice: number;
}

export interface IMovieInfo {
  id: number;
  title: string;
  year: number;
  runtime: number;
  genres: string[];
  director: string;
  actors: string;
  plot: string;
  posterUrl: string
}
