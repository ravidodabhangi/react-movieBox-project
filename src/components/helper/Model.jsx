import React from "react";
import { useContext } from "react";
import { createPortal } from "react-dom";
import { ThreeCircles } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { ModelContext } from "./ModelContext";
import "./model.css";
import ReactPlayer from "react-player/youtube";

import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const Model = () => {
  let bodyWindow = document.body;
  // let [icon, setIcon] = useState(false);
  let { toggle, setToggle, movieTrailer } = useContext(ModelContext);
  let singleMovieDetail = useSelector(
    (state) => state.singleMovieData.SingleMovie.data
  );
  let singleMovieVideo = useSelector(
    (state) => state.MoviesHeadData.MovieHeadStorage
  );
  let singlemovie;
  if (singleMovieDetail) {
    singlemovie = singleMovieVideo?.filter((movie) => {
      return movie.imdbID == singleMovieDetail.imdbID;
    });
  }
  let bodyToggle = () => {
    setToggle(false);
    bodyWindow.style.overflow = "visible";
  };
  if (!toggle) {
    return null;
  } else {
    return createPortal(
      <section className="ModelSection">
        <article className="ModelArticle">
          <aside className="ModelArticleAside1">
            {movieTrailer || movieTrailer===null ? (
              movieTrailer === null ? (
                <div className="videonot1">
                  <img
                    src="https://www.nucleustechnologies.com/blog/wp-content/uploads/2020/12/video-is-not-available-1.jpg"
                    alt=""
                  />
                </div>
              ) : (
                <ReactPlayer
                  url={movieTrailer}
                  height={550}
                  width={1080}
                  loop={true}
                  controls
                  playing={true}
                />
              )
            ) : (
              <div className="wentWrong2">
                <ThreeCircles
                  height="100"
                  width="100"
                  color="deeppink"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="three-circles-rotating"
                />
              </div>
            )}
          </aside>
          <aside className="ModelArticleAside2">
            <h1 onClick={bodyToggle}>
              <FaTimes />
            </h1>
          </aside>
        </article>
      </section>,
      document.getElementById("model")
    );
  }
};

export default Model;
