import React from "react";
import { useContext } from "react";
import Header from "./Header";
import "./mainBody.css"
import MainBody from "./MainBody";
import { AuthContext } from "./../helper/AuthContext";
const Home = () => {
  let { user } = useContext(AuthContext);
  return (
    <section>
      {user ? (
        <article>
          <Header />
          <MainBody />
        </article>
      ) : (
        <aside className="loginregisteraside">
          <figure>
            <img
              src="https://static.vecteezy.com/ti/vettori-gratis/p3/2789043-3d-illustrazioni-web-computer-e-account-login-e-password-form-page-on-screen-sign-in-to-account-autorizzazione-utente-login-autenticazione-concetto-pagina-nome-utente-password-campi-vettoriale.jpg"
              alt=""
            />
            <h1 className="loginRegisterh1">
              Please Login Then Enjoy TheMovie<span>Box</span>
            </h1>
          </figure>
        </aside>
      )}
    </section>
  );
};

export default Home;
