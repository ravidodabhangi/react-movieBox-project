import React from "react";
import { useState } from "react";
import "./authRegister.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../api/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ModelContext } from "./../helper/ModelContext";
import md5 from "md5";
const Registation = () => {
  let navigate = useNavigate();
  let { setLoginToggle } = useContext(ModelContext);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");
  let [dob, setDob] = useState("");
  let [loading, setLoading] = useState(false);
  let [toggle, setToggle] = useState(false);
  let [passwordShow, setPasswordShow] = useState(false);
  let EyeIcon = () => {
    setToggle(!toggle);
    setPasswordShow(!passwordShow);
  };
  const RegisterSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let userDatas = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("successfully user created");
      let confirmMail = `the verification mail has been sent to ${email} please verify`;
      sendEmailVerification(userDatas.user);
      toast.info(confirmMail);
      updateProfile(userDatas.user, {
        displayName: name,
        photoURL: `https://www.gravatar.com/avatar/${md5(email)}q=identicon`,
      });
      navigate("/");
      setLoginToggle(true);
    } catch (error) {
      toast.error(error.message.slice(16).slice(1, -2));
    }
    setLoading(false);
  };
  return (
    <section id="registerSection">
      <aside className="registerAside">
        <h1>Create your Account</h1>
        <p>Use your email and password to watch on your favorite devices</p>
        <form onSubmit={RegisterSubmitHandler}>
          <aside className="formaside">
            <div className="registerdiv">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <div className="registerdiv">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type={passwordShow === true ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
              <span onClick={EyeIcon} className="eyeiconregister">
                {toggle !== true ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <div className="registerdiv">
              <label htmlFor="name">Name</label>
              <br />
              <input
                type="name"
                name="name"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div className="registerdiv">
              <label htmlFor="dob">BirthDate</label>
              <br />
              <input
                type="dob"
                name="dob"
                id="dob"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                }}
                required
              />
            </div>
          </aside>
          <aside className="registerbutton">
            <div>
              <span>
                By clicking “CONTINUE” you agree to the{" "}
                <a href="">Themoviebox Terms of Use</a> and{" "}
                <a href="">Privacy Policy</a>.
              </span>
              <br />
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
                "Register"
              )}
            </button>
            </div>
          </aside>
        </form>
      </aside>
    </section>
  );
};

export default Registation;
