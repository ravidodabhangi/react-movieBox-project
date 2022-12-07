import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../api/firebase";

export let AuthContext = createContext();

let AuthProvider = ({ children }) => {
  let [user, setUser] = useState(null);
//   let [toggle, setToggle] = useState(false);
//   let dropDownToggle = () => {
//     setToggle(!toggle);
//   };
  let logout = async () => {
    await signOut(auth);
    window.sessionStorage.removeItem("TOKEN");
    window.location.assign("/");
  };
  useEffect(() => {
    return onAuthStateChanged(auth, (userData) => {
      if (userData?.emailVerified === true && userData) {
        let token = userData.accessToken;
        window.sessionStorage.setItem("TOKEN", token);
        setUser(userData);
      } else {
        // window.sessionStorage.removeItem("TOKEN");
        setUser(null);
      }
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
