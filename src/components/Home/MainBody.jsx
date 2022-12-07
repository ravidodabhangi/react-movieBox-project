import React, { useEffect, useState } from "react";
import "./mainBody.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllMovieData,
  movieTypeGet,
} from "./../../ReduxToolkit/MovieSlice/MovieSlice1";
import MainDataFetch from "./MainDataFetch";
import { movieNewsFetcher } from "../../ReduxToolkit/MovieSlice/MovieSlice3";
import { ModelContext } from './../helper/ModelContext';
import { useContext } from "react";
const MainBody = () => {
  let{setApiChanger,apiChanger}=useContext(ModelContext)
  let inpValue = useSelector((state) => state.MoviesHeadData.NavInpValue);
  let [movie, setMovie] = useState("Avatar");
  let [count, setCount] = useState(0);
  let [moviePage, setMoviePage] = useState("1");
  let [movieType, setMovieType] = useState("");
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllMovieData({ movie, moviePage, movieType }));
  }, []);
  useEffect(() => {
    dispatch(fetchAllMovieData({ movie, moviePage, movieType }));
  }, [movie, moviePage, movieType, count, dispatch]);
  let changer1 = () => {
    setApiChanger(false)
    dispatch(movieTypeGet(""));
    inpValue !== "" ? setMovie(inpValue) : setMovie("Avatar");
    setMovieType("");
    setMovieType("");
    setCount((count += 1));
  };
  let changer2 = () => {
    setApiChanger(false)
    inpValue !== "" ? setMovie(inpValue) : setMovie("Avatar");
    setCount((count += 2));
    setMovieType("movie");
    dispatch(movieTypeGet("movie"));
  };
  let changer3 = () => {
    setApiChanger(false)
    inpValue !== "" ? setMovie(inpValue) : setMovie("Avatar");
    setCount((count += 3));
    setMovieType("series");
    dispatch(movieTypeGet("series"));
  };
  let newsFetcher = () => {
    let page="1"
    setApiChanger(true)
    dispatch(movieNewsFetcher(page))
  };
  return (
    <section id="mainBodySection">
      <article className="mainBodyarticle">
        <aside className="mainBodyAside1">
          <ul>
            <li onClick={() => changer1()}>All</li>
            <li onClick={() => changer2()}>Movies</li>
            <li onClick={() => changer3()}>TV Series</li>
            <li onClick={() => newsFetcher()}>Movie News</li>
          </ul>
        </aside>
        <MainDataFetch />
        <aside className="pagenaionasidebtn">{/* <h1>Hello</h1> */}</aside>
      </article>
    </section>
  );
};

export default MainBody;
