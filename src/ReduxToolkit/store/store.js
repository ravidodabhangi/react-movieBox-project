import { configureStore } from "@reduxjs/toolkit";
import MovieHeadReducer from "../MovieSlice/MovieSlice1";
import SingleMovieReducer from "../MovieSlice/MovieSlice2";
import MovieNewsReducer from "../MovieSlice/MovieSlice3";
let store=configureStore({
    reducer:{
        MoviesHeadData:MovieHeadReducer,
        singleMovieData:SingleMovieReducer,
        MovieNewsList:MovieNewsReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

})
export default store;
