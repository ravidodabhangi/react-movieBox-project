import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsHeartFill } from "react-icons/bs";
import "./mainBody.css";
import { BallTriangle } from "react-loader-spinner";
import {
  fetchAllMovieData,
  moviesCart,
} from "../../ReduxToolkit/MovieSlice/MovieSlice1";
import ReactPaginate from "react-paginate";
import { singleMovieFetcher } from "../../ReduxToolkit/MovieSlice/MovieSlice2";
import { Link } from "react-router-dom";
import { STATUS } from "./../../ReduxToolkit/MovieSlice/MovieSlice1";
const MovieDetailsData = () => {
  let movieValue = useSelector((state) => state.MoviesHeadData.MovieTypeValue);
  let status = useSelector((state) => state.MoviesHeadData.StatusCode);
  let [movie, setMovie] = useState("Avatar");
  let inpValue = useSelector((state) => state.MoviesHeadData.NavInpValue);
  let dispatch = useDispatch();
  let allMovieDatas = useSelector(
    (state) => state.MoviesHeadData.MovieAllMoviesData.Search
  );
  let apiPageCount = useSelector(
    (state) => state.MoviesHeadData.MovieAllMoviesData.totalResults
  );
  let pageCount = Math.floor(apiPageCount / 10);
  let handlePageClick = (data) => {
    let moviePage = data.selected + 1;
    inpValue !== "" ? setMovie(inpValue) : setMovie("Avatar");
    let movieType;
    if (movieValue === "movie") {
      movieType = "movie";
    } else if (movieValue === "series") {
      movieType = "series";
    } else {
      movieType = "";
    }
    dispatch(fetchAllMovieData({ movie, moviePage, movieType }));
  };
  // if (status === STATUS.Errors) {
  //   return (
  //     <div className="wentWrong1">
  //       <img
  //         src="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png"
  //         alt="error"
  //       />
  //     </div>
  //   );
  // }
  // if (status === STATUS.Load) {
  //   return (
  //     <div className="wentWrong2">
  //       <BallTriangle
  //         height={120}
  //         width={120}
  //         radius={5}
  //         color="deeppink"
  //         ariaLabel="ball-triangle-loading"
  //         visible={true}
  //       />
  //     </div>
  //   );
  // }
  return (
    <>
    {
      status === STATUS.Errors?(<div className="wentWrong1">
        <img
          src="https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops.png"
          alt="error"
        />
      </div>):null
    }
    {
      status === STATUS.Load?(<div className="wentWrong2">
        <BallTriangle
          height={120}
          width={120}
          radius={5}
          color="deeppink"
          ariaLabel="ball-triangle-loading"
          visible={true}
        />
      </div>):null
    }
    {
      status === STATUS.Idle && (<main className="mainBodyMain">
        {allMovieDatas?.map((movie) => {
          let { Title, Year, imdbID, Type, Poster } = movie;
          return (
            <aside key={imdbID} className="mainBodyAside2">
              <div className="mainBodyAside2div1">
                <figure>
                  <Link
                    to="singleMovie"
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
                <div className="mainBodydataAside2div2div2">
                  <h1 onClick={() => dispatch(moviesCart(movie))}>
                    <BsHeartFill />
                  </h1>
                </div>
              </div>
            </aside>
          );
        })}
      </main>)
    }
      <aside>
        {pageCount == 0 ? null : (
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            pageCount={pageCount}
            previousLabel={null}
            marginPagesDisplayed={3}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            nextLinkClassName="page-next"
            activeLinkClassName="active"
          />
        )}
      </aside>
    </>
  );
};

export default MovieDetailsData;
