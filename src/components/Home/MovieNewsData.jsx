import React from "react";
import "./mainBody2.css";
import { BallTriangle } from "react-loader-spinner";
import { NEWSSTATUS } from "../../ReduxToolkit/MovieSlice/MovieSlice3";
import { movieNewsFetcher } from "../../ReduxToolkit/MovieSlice/MovieSlice3";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
const MovieNewsData = () => {
  let status = useSelector((state) => state.MovieNewsList.movieNewsStatus);
  let dispatch = useDispatch();
  let newsData = useSelector((state) => state.MovieNewsList.movieNews.articles);
  // let currentDate = dateData.toJSON().slice(0, 10);
  let handleNewsPageClick = (datas) => {
    let newsPage = datas.selected + 1;
    dispatch(movieNewsFetcher(newsPage));
  };
  return (
    <>
      {status === NEWSSTATUS.Errors ? (
        <div className="wentWrong1">
          <img
            src="https://www.domainnamesanity.com/blog/wp-content/uploads/2020/04/404-error-example-bing.jpg"
            alt="error"
          />
        </div>
      ) : null}
      {status === NEWSSTATUS.Load ? (
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
      ) : null}
      {status === NEWSSTATUS.Idle ? (
        <section className="newsSection">
          {newsData?.map((news, index) => {
            let {
              source,
              author,
              title,
              description,
              url,
              urlToImage,
              publishedAt,
              content,
            } = news;
            return (
              <article key={index} className="newsSectionArticle">
                <aside className="newsarticleAside1">
                  <h1>{title} :</h1>
                  <p>
                    Published Time : <span>{publishedAt}</span>
                  </p>
                  <p>
                    Source : <span>{source.name}</span>
                  </p>
                  <p>
                    Author : <span>{author}</span>{" "}
                  </p>
                  <p>
                    Description :{" "}
                    <span>
                      {description} {content}
                    </span>{" "}
                  </p>
                  <a href={url} target="_blank">
                    View More
                  </a>
                </aside>
                <aside className="newsarticleAside2">
                  <figure>
                    <img src={urlToImage} alt={title} />
                  </figure>
                </aside>
              </article>
            );
          })}
        </section>
      ) : null}
      <aside>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          pageRangeDisplayed={3}
          onPageChange={handleNewsPageClick}
          pageCount={10}
          previousLabel={null}
          marginPagesDisplayed={3}
          containerClassName="pagination1"
          pageLinkClassName="page-num1"
          nextLinkClassName="page-next1"
          activeLinkClassName="active1"
        />
      </aside>
    </>
  );
};

export default MovieNewsData;
