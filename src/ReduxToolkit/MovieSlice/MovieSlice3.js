import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  movieNews: [],
  movieNewsStatus: "",
};
export let NEWSSTATUS = {
  Load: "load",
  Idle: "idle",
  Errors: "Error",
};
let MovieNewsData = createSlice({
  name: "MovieNews",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(movieNewsFetcher.pending, (state) => {
        state.movieNewsStatus = NEWSSTATUS.Load;
      })
      .addCase(movieNewsFetcher.fulfilled, (state, action) => {
        state.movieNewsStatus = NEWSSTATUS.Idle;
        state.movieNews = action.payload;
      })
      .addCase(movieNewsFetcher.rejected, (state) => {
        state.movieNewsStatus = NEWSSTATUS.Errors;
      });
  },
});

export default MovieNewsData.reducer;

export const movieNewsFetcher = createAsyncThunk(
  "movieNewsFetcher/MovieNewsData",
  async (newsDetail) => {
    let dateData=new Date();
        let fullYear=dateData.getFullYear();
        let date=dateData.getDate();
        let month=dateData.getMonth();
        let fullData=`${fullYear}-${month}-${date}`;
    let {data} = await axios.get(
      `https://newsapi.org/v2/everything?q=movies&from=${fullData}&language=en&page=${newsDetail}&pageSize=10&sortBy=popularity&apiKey=341218b142a84ee2937c6454cac4cb9a`
    );
    return data;
  }
);
