import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { IMovies, IMoviesCart } from "../../interfaces";
import { discountRules } from "../../mockData/movies";

export type CartState = {
  moviesCart: IMoviesCart[];
  totalAmount: number;
  discountApplied: boolean;
};

const initialState: CartState = {
  moviesCart: [],
  totalAmount: 0,
  discountApplied: false,
};

const discountApplied = (state: any) => {
  const totalWithoutDiscount = state.moviesCart.reduce(
    (total: number, movie: IMovies) => total + (movie.count ?? 0) * movie.price,
    0
  );

  if (state.moviesCart.length >= 2) {
    const movieIds = state.moviesCart.map((m: IMoviesCart) => m.id);
    const matchingDiscount = discountRules.find((rule) => {
      if (rule.m.length !== movieIds.length) {
        return false;
      }

      return rule.m.every((id) => movieIds.includes(id));
    });
    if (matchingDiscount) {
      state.discountApplied = true;

      state.moviesCart.forEach((movie: IMoviesCart) => {
        const discount = movie.price * matchingDiscount.discount;
        movie.totalPrice = movie.price - discount;
      });

      state.totalAmount = state.moviesCart.reduce(
        (total: number, movie: IMoviesCart) =>
          total + (movie.totalPrice ?? 0) * (movie.count ?? 0),
        0
      );
    } else {
      state.discountApplied = false;
      state.totalAmount = totalWithoutDiscount;
    }
  } else {
    state.discountApplied = false;
    state.totalAmount = totalWithoutDiscount;
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const movieId = action.payload.id;
      const movie = action.payload.data?.find((m: IMovies) => m.id === movieId);

      if (movie) {
        const existingMovie = state.moviesCart.find((m) => m.id === movieId);

        if (existingMovie) {
          if (existingMovie.count !== undefined) {
            existingMovie.count += 1;
          } else {
            existingMovie.count = 1;
          }
        } else {
          state.moviesCart.push({ ...movie, count: 1 });
        }

        discountApplied(state);
      }
    },
    removeItem: (state, action) => {
      const movieId = action.payload;
      const movieIndex = state.moviesCart.findIndex((m) => m.id === movieId);

      if (movieIndex !== -1) {
        const movie = state.moviesCart[movieIndex];

        if (movie && movie.count && movie.count > 0) {
          movie.count -= 1;

          if (movie.count === 0) {
            state.moviesCart.splice(movieIndex, 1);
          }

          state.totalAmount -= movie.price;
          state.discountApplied = false;

          discountApplied(state);
        }
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export const cartGlobal = (state: RootState) => state.cart;

export default cartSlice.reducer;
