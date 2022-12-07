import React from "react";
import { useState } from "react";
import "./authlogin.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleImage from "./googlelog.png";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ModelContext } from "../helper/ModelContext";
import { GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";
import { toast } from "react-toastify";
import SocialProvider from "./SocialProvider";
import { AuthContext } from "../helper/AuthContext";
const Login = () => {
  let navigate = useNavigate();
  let { setLoginToggle } = useContext(ModelContext);
  let { setLoginTrue } = useContext(AuthContext);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [passwordShow, setPasswordShow] = useState(false);
  let [loading, setLoading] = useState(false);
  let [toggle, setToggle] = useState(false);
  let EyeIcon = () => {
    setToggle(!toggle);
    setPasswordShow(!passwordShow);
  };
  let GmailLogin = () => {
    setTimeout(() => {
      toast.success("successfully Login through Google");
      loginModelRemoval();
    }, 4000);
    return SocialProvider(new GoogleAuthProvider());
  };
  let loginModelRemoval = () => {
    setTimeout(() => {
      setLoginToggle(false);
      navigate("/home");
    }, 2000);
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let userData = await signInWithEmailAndPassword(auth, email, password);
      if (userData.user.emailVerified === true) {
        toast.success("successfully user logged in");
        loginModelRemoval();
      } else {
        toast.error(`user not yet verified please verify email...`);
      }
    } catch (error) {
      toast.error(error.message.slice(16).slice(1, -2));
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        toast.error(
          "Please check your Email Before Login... OR Please Register"
        );
      }
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        toast.error("Please check your Password Before Login...");
      }
    }
    setLoading(false);
  };
  return (
    <section id="authLoginBlock">
      <article>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="logindiv">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="logindiv">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type={passwordShow === true ? "text" : "password"}
              value={password}
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={EyeIcon} className="eyeiconLogin">
              {toggle !== true ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <span className="formSpan">
            <Link
              onClick={() => setLoginToggle(false)}
              to="/auth/forgot-password"
            >
              Forget your eamil and password
            </Link>
          </span>
          <div className="loginButton">
            <button>
              {loading === true ? (
                <Oval
                  height={25}
                  width={25}
                  color="white"
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="blue"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : (
                "Log in"
              )}
            </button>
          </div>
          <figure className="googleFigure">
            <img onClick={GmailLogin} src={GoogleImage} alt="" />
          </figure>
          <h3>
            Don't have an account?&nbsp;
            <Link onClick={() => setLoginToggle(false)} to="/auth/register">
              Start your free trial
            </Link>
          </h3>
        </form>
      </article>
    </section>
  );
};

export default Login;
