import React, { Fragment } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BallTriangle } from "react-loader-spinner";
import movietrailerdata from "movie-trailer"
import { moviesCart } from "../../ReduxToolkit/MovieSlice/MovieSlice1";
import "../Home/singleMovie.css"
import { ModelContext } from './../helper/ModelContext';
import { SINGSTATUS } from "../../ReduxToolkit/MovieSlice/MovieSlice2";
const SingleMovie = () => {
let status = useSelector((state) => state.singleMovieData.singleMovieStatus);
  let {setToggle,setMovieTrailer}=useContext(ModelContext)
  let singleMovieDetail = useSelector(
    (state) => state.singleMovieData.SingleMovie.data
  );
  let dispatch=useDispatch();
  let bodyWindow=document.body;
  let bodyToggle2=()=>{
    setToggle(true);
    bodyWindow.style.overflow="hidden";
    movietrailerdata( singleMovieDetail.Title, singleMovieDetail.Year )
  .then( response => setMovieTrailer(response) )
  }
  if (status === SINGSTATUS.Errors) {
    return (
      <div className="wentWrong1">
        <img
          src="https://image.shutterstock.com/image-vector/404-error-page-funny-design-260nw-1761026456.jpg"
          alt="error"
        />
      </div>
    );
  }
  if (status === SINGSTATUS.Load) {
    return (
      <div className="wentWrong2">
        <BallTriangle
          height={120}
          width={120}
          radius={5}
          color="deeppink"
          ariaLabel="ball-triangle-loading"
          visible={true}
        />
      </div>
    );
  }
  return (
    
      <section className="singlemoviesection">
      {
        singleMovieDetail && (<>
          <article className="singlemoviearticle">
          <aside className="singlemovieaside1">
            <div className="singlemovieaside1div1">
              <h1>{singleMovieDetail.Title}</h1>
              <main>
                <p>IMDB Rating ⭐: <span>{singleMovieDetail.imdbRating}</span></p>
                <p>IMDB Voting 👍: <span>{singleMovieDetail.imdbVotes}</span></p>
                <p>Rated : <span>{singleMovieDetail.Rated}</span></p>
                <p>RunTime ⌛: <span>{singleMovieDetail.Runtime}</span></p>
                <p>Year 🗓️: <span>{singleMovieDetail.Year}</span></p>
                <p>Released : <span>{singleMovieDetail.Released}</span></p>
              </main>
            </div>
            <div className="singlemovieaside1div2">
                <p>{singleMovieDetail.Plot}</p>
            </div>
            <div className="singlemovieaside1div3">
              <div className="singlemovieaside1div3div1">
                <header>
                <p>Director:</p>
                <p>Writer:</p>
                <p>Actors:</p>
                <p>Generes:</p>
                <p>Type :</p>
                <p>Language:</p>
                <p>Country :</p>
                <p>Metascore :</p>
                <p>BoxOffice :</p>
                <p>Awards:</p>
                </header>
                <footer>
                  <p>{singleMovieDetail.Director}</p>
                  <p>{singleMovieDetail.Writer}</p>
                  <p>{singleMovieDetail.Actors}</p>
                  <p>{singleMovieDetail.Genre}</p>
                  <p>{singleMovieDetail.Type}</p>
                  <p>{singleMovieDetail.Language}</p>
                  <p>{singleMovieDetail.Country}</p>
                  <p>{singleMovieDetail.Metascore}</p>
                  <p>{singleMovieDetail.BoxOffice}</p>
                  <p>{singleMovieDetail.Awards}</p>
                </footer>
              </div>
              <div className="singlemovieaside1div3div2">
                <main>
                  {singleMovieDetail.Ratings.map((rate, index) => {
                    let { Source, Value } = rate;
                    return (
                        <Fragment key={index}>
                        <h1>Source : <span>{Source}</span></h1>
                        <p>Rating : <span>{Value}</span></p>
                        </Fragment>
                    );
                  })}
                </main>
              </div>
              <div className="singlemovieaside1div3div2">
                <button onClick={bodyToggle2}><a href="#"> Watch Trailer +</a></button>
                <button onClick={() => dispatch(moviesCart(singleMovieDetail))}>Add to WishList</button>
              </div>
            </div>
          </aside>
          <aside className="singlemovieaside2">
            <div className="singlemovieaside2div1">
              <figure>
                <img src={singleMovieDetail.Poster} alt="" />
              </figure>
            </div>
          </aside>
        </article>
        <div className="singlemovieamaindiv">
          <h1>MovieBox</h1>
          <h1>@2021,Movie.inc or its affiliates</h1>
        </div>
        </>)
      }
      </section>
    )
};

export default SingleMovie;
