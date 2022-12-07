import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';
export let STATUS = {
  Load: "load",
  Idle: "idle",
  Errors: "Error",
};

let initialState = {
  NavInpValue: "",
  MovieTypeValue: "",
  MovieHeadStorage: [],
  MoviesCart: [],
  MovieAllMoviesData: [],
  StatusCode: "",
};

let MovieSlice = createSlice({
  name: "MoviesHeadData",
  initialState,
  reducers: {
    inpValueGet: (state, action) => {
      state.NavInpValue = action.payload;
    },
    movieTypeGet: (state, action) => {
      state.MovieTypeValue = action.payload;
    },
    movieHeadData: (state, action) => {
      state.MovieHeadStorage = action.payload;
    },
    moviesCart: (state, action) => {
      if(state.MoviesCart.length==0){
        state.MoviesCart.push(action.payload)
      }
      else if(state.MoviesCart.length>=0){
        let data=state.MoviesCart.find((movie)=>movie.imdbID===action.payload.imdbID)
        if(data===undefined){
          state.MoviesCart.push(action.payload)
          toast.success(`Movie is successfully added to your Favorite List`);
        }else{
          toast.warning(`This movie is Already Exist your Favorite List`);
        }
      }
    },
    moviecartRemover:(state,action)=>{
      state.MoviesCart=state.MoviesCart.filter((movie)=>{
        return movie.imdbID!==action.payload
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovieData.pending, (state) => {
        state.StatusCode = STATUS.Load;
      })
      .addCase(fetchAllMovieData.fulfilled, (state, action) => {
        state.StatusCode = STATUS.Idle;
        state.MovieAllMoviesData = action.payload;
      })
      .addCase(fetchAllMovieData.rejected, (state) => {
        state.StatusCode = STATUS.Errors;
      });
  },
});
export const { movieHeadData, moviesCart, inpValueGet, movieTypeGet,moviecartRemover} =
  MovieSlice.actions;
export default MovieSlice.reducer;

export const fetchAllMovieData = createAsyncThunk(
  "MoviesHeadData/fetchMovieData",
  async (movieList) => {
    let { movie, moviePage, movieType } = movieList;
    let { data } = await axios.get(
      `https://www.omdbapi.com/?s=${movie}&page=${moviePage}&type=${movieType}&apikey=7793b1c3`
    );
    let moviesData = data;
    return moviesData;
  }
);
