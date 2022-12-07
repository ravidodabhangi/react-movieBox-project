import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
  SingleMovie: [],
  singleMovieStatus: "",
};
export let SINGSTATUS = {
  Load: "load",
  Idle: "idle",
  Errors: "Error",
};
let SingleMovieSlice = createSlice({
  name: "SingleMovie",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(singleMovieFetcher.pending, (state) => {
        state.singleMovieStatus = SINGSTATUS.Load;
      })
      .addCase(singleMovieFetcher.fulfilled, (state, action) => {
        state.singleMovieStatus = SINGSTATUS.Idle;
        state.SingleMovie = action.payload;
      })
      .addCase(singleMovieFetcher.rejected, (state) => {
        state.singleMovieStatus = SINGSTATUS.Errors;
      });
  },
});
export default SingleMovieSlice.reducer;
export const singleMovieFetcher = createAsyncThunk(
  "SingleMovieSlice/singleMovieFetcher",
  async (movieId) => {
    let movieData = await axios.get(
      `https://www.omdbapi.com/?i=${movieId}&plot=full&apikey=7793b1c3`
    );
    return movieData;
  }
);
