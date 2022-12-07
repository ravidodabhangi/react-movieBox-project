import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import style from "./navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { inpValueGet } from "../../ReduxToolkit/MovieSlice/MovieSlice1";
import { fetchAllMovieData } from "./../../ReduxToolkit/MovieSlice/MovieSlice1";
import { Link, useLocation } from "react-router-dom";
import { ModelContext } from "./../helper/ModelContext";
import { useContext } from "react";
import { AuthContext } from "../helper/AuthContext";
const NavBar = () => {
  const location = useLocation();
  let { toggle, setToggle, setLoginToggle } = useContext(ModelContext);
  let bodyWindow = document.body;
  let movieCartData = useSelector((state) => state.MoviesHeadData.MoviesCart);
  let [inpValue, setInpValue] = useState("");
  let [movie, setBtnValue] = useState("");
  let dispatch = useDispatch();
  let moviePage = "";
  let movieType = "";
  let btnchanger = () => {
    setBtnValue(inpValue);
  };
  useEffect(() => {
    dispatch(inpValueGet(inpValue));
    dispatch(fetchAllMovieData({ movie, moviePage, movieType }));
  }, [movie]);
  let modeChanger = () => {
    setToggle(false);
    bodyWindow.style.overflow = "visible";
  };
  let { user, logout } = useContext(AuthContext);
  let AuthenticatedUser = () => {
    return (
      <>
        <Link className={style.navloginPhoto} to="/myAccount">
          <img src={user.photoURL} alt={user.displayName} />
        </Link>
        <Link
          to="/home"
          onClick={() => {
            modeChanger();
            setLoginToggle(false);
          }}
          className={style.navlogin}
        >
          HOME
        </Link>
        <Link onClick={logout} className={style.navlogin} to="/">
          Logout
        </Link>
        <Link className={style.navlogin} to="/myAccount">
          MyProfile
        </Link>
        <Link
          to="/home/moviecart"
          onClick={() => modeChanger()}
          className={style.navfavorite}
        >
          <MdFavorite />
          <span className={style.navspan}>{movieCartData?.length}</span>
        </Link>
      </>
    );
  };
  let AnonymouseUser = () => {
    return (
      <>
        <Link
          to="/"
          onClick={() => {
            modeChanger();
            setLoginToggle(false);
          }}
          className={style.navlogin}
        >
          HOME
        </Link>
        <Link className={style.navlogin} to="/home">Movies</Link>
        {location.pathname === "/auth/register" || location.pathname === "/auth/forgot-password" ? null : (
          <a
            className={style.navlogin}
            onClick={() => setLoginToggle(true)}
            href="#"
          >
            Login
          </a>
        )}
        <Link
          className={style.navsignup}
          onClick={() => setLoginToggle(false)}
          to="/auth/register"
        >
          Signup
        </Link>
      </>
    );
  };
  return (
    <section id={style.navbarsection}>
      <article>
        <aside className={style.navaside1}>
          <h1>THEMOVIE</h1>
        </aside>
        <aside className={style.navaside2}>
          <div>
            {location.pathname === "/" || location.pathname==="/myAccount" || location.pathname==="/home/moviecart" || location.pathname==="/auth/register" || location.pathname==="/auth/forgot-password" || !user? null : (
              <>
                <input
                  type="text"
                  placeholder="Search Movie"
                  value={inpValue}
                  onChange={(e) => setInpValue(e.target.value)}
                />
                <h1 onClick={btnchanger}>
                  <FaSearch />
                </h1>
              </>
            )}
          </div>
          <div>{user ? <AuthenticatedUser /> : <AnonymouseUser />}</div>
        </aside>
      </article>
    </section>
  );
};

export default NavBar;
