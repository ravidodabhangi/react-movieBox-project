import React, { Fragment, useContext } from "react";
import { AuthContext } from "../helper/AuthContext";
import "./myaccount.css"
const MyAccount = () => {
  const { user } = useContext(AuthContext);
  return (
    user &&(
  <Fragment>
      <aside className="useProfileaside">
      <div className="useProfileDiv">
        <header>
          <img src={user.photoURL} alt={user.displayName} />
        </header>
        <main>
          <h1>{user.displayName}</h1>
          <p>{user.email}</p>
        </main>
        </div>
      </aside>
  </Fragment>
    )
);
};

export default MyAccount;
