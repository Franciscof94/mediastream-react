import {
    Action,
    configureStore,
    ThunkAction,
  } from '@reduxjs/toolkit';
  import moviesReducer from './features/movieSlice'
  import cartReducer from './features/cartSlice'

  
  export const store = configureStore({
    reducer: {
    movies: moviesReducer,
    cart: cartReducer
    },
  });
  
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<ReturnType = void> = ThunkAction<
     ReturnType,
     RootState,
     unknown,
     Action<string>
   >;
  export type AppState = ReturnType<typeof store.getState>;
  