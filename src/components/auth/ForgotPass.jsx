import React, { useContext } from "react";
import { useState } from "react";
import "./authForgot.css";
import { Link, useNavigate } from "react-router-dom";
import { ModelContext } from "../helper/ModelContext";
import { Oval } from "react-loader-spinner";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../api/firebase";
const ForgotPass = () => {
  let navigate=useNavigate();
  let { setLoginToggle } = useContext(ModelContext);
  let [email, setEmail] = useState("");
  let [loading, setLoading] = useState(false);
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.warning(`please check ${email} for reseting password`);
      navigate("/");
      setLoginToggle(true);
    } catch (error) {
      toast.error(error.code);
    }
    setLoading(false);
  };
  return (
    <section id="ForgotPasswordSection">
      <article className="ForgotArticle">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="forgotdiv">
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
          <span>
            <Link to="/" onClick={() => setLoginToggle(true)}>
              Back to Login
            </Link>
          </span>
          <div className="forgotButton">
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
                "Forgot password"
              )}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default ForgotPass;
