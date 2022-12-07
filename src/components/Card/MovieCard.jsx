import React from "react";
import "./moviecart.css";
import "../Home/mainBody.css";
import { useDispatch, useSelector } from "react-redux";
import { moviecartRemover } from "../../ReduxToolkit/MovieSlice/MovieSlice1";
import { Link } from "react-router-dom";
import { singleMovieFetcher } from "../../ReduxToolkit/MovieSlice/MovieSlice2";
import { toast } from 'react-toastify';
const MovieCard = () => {
  let moviecartData = useSelector((state) => state.MoviesHeadData.MoviesCart);
  let dispatch = useDispatch();
  return (
    <section className="movieCartsection">
      <article className="moviecartArticle">
        <main className="mainBodyMain">
          {moviecartData?.map((movie) => {
            let { Title, Year, imdbID, Type, Poster } = movie;
            return (
              <aside key={imdbID} className="mainBodyAside2">
                <div className="mainBodyAside2div1">
                  <figure>
                    <Link
                      to="/home/singleMovie"
                      onClick={() => dispatch(singleMovieFetcher(imdbID))}
                    >
                      <img src={Poster} alt={Title} />
                    </Link>
                  </figure>
                </div>
                <div className="mainBodydataAside2div2">
                  <div className="mainBodydataAside2div2div1">
                    <h1>{Title}</h1>
                    <p>
                      {Year} &nbsp; ({Type})
                    </p>
                  </div>
                  <div className="maincartdataAside2div2div2">
                    <button
                      onClick={() => {
                        toast.success(`${Title} movie is successfully Remove From your Favorite List`);
                        dispatch(moviecartRemover(imdbID));
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </aside>
            );
          })}
        </main>
      </article>
    </section>
  );
};

export default MovieCard;
