import React from "react";
import "./mainBody.css";
import MovieNewsData from "./MovieNewsData";
import MovieDetailsData from "./MovieDetailsData";
import { ModelContext } from "../helper/ModelContext";
import { useContext } from "react";
const MainDataFetch = () => {
  let { setApiChanger, apiChanger } = useContext(ModelContext);
  return (
      <>{apiChanger === false ? <MovieDetailsData /> : <MovieNewsData />}</>
  );
};

export default MainDataFetch;
