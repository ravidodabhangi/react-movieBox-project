import React, { useEffect } from "react";
import Slider from "react-slick";
import {MovieHeader} from "../HomeHeader.js";
import style from "./header.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { singleMovieFetcher } from "../../ReduxToolkit/MovieSlice/MovieSlice2";
import { useDispatch, useSelector } from "react-redux";
import {
  movieHeadData,
  moviesCart,
} from "../../ReduxToolkit/MovieSlice/MovieSlice1";
import { Link } from "react-router-dom";
const Header = () => {
  let dispatch = useDispatch();
  let movieHeadInfor = useSelector(
    (state) => state.MoviesHeadData.MovieHeadStorage
  );
  useEffect(() => {
    dispatch(movieHeadData(MovieHeader));
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 6000,
    cssEase: "linear",
  };
  return (
    <section id={style.headerSection}>
      <Slider {...settings}>
        {movieHeadInfor?.map((movieData) => {
          let { Poster, Title, Year, Genre, Runtime, imdbRating, imdbID } =
            movieData;
          return (
            <article className={style.headerArticle} key={imdbID}>
              <aside className={style.headerSectionAside1}>
                <img src={Poster} alt={Title} />
              </aside>
              <main className={style.headerMain}>
                <aside className={style.headerSectionAside2}>
                  <div className={style.headerAside2div1}>
                    <h1>{Title}</h1>
                    <p>
                      <span>{Genre}</span>&nbsp;&nbsp;
                      <span>Duration:&nbsp;{Runtime}</span>
                    </p>
                  </div>
                  <div className={style.headerAside2div2}>
                    <button>
                      <Link
                        to="singleMovie"
                        onClick={() => dispatch(singleMovieFetcher(imdbID))}
                      >
                        View Info
                      </Link>
                    </button>
                    <button onClick={() => dispatch(moviesCart(movieData))}>
                      +&nbsp;Add to WishList
                    </button>
                  </div>
                </aside>
                <aside className={style.headerSectionAside3}>
                  <p>Rating :</p>
                  <p>⭐⭐⭐⭐</p>
                </aside>
              </main>
            </article>
          );
        })}
      </Slider>
    </section>
  );
};

export default Header;
