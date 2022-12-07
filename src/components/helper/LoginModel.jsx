import React from "react";
import { createPortal } from "react-dom";
import "./loginModel.css"
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { useContext } from "react";
import { ModelContext } from "./ModelContext";
const LoginModel = ({ children }) => {
  let{loginToggle,setLoginToggle}=useContext(ModelContext);
  if(loginToggle===false){
    return null
  }
  if(loginToggle===true){
    return createPortal(
      <>
        <section id="loginSection">
          <article>
            <header>
              <span onClick={(e)=>setLoginToggle(false)}>
                <MdClose />
              </span>
            </header>
            <main>{children}</main>
          </article>
        </section>
      </>,
      document.getElementById("model")
    )
  }
  
};

export default LoginModel;
