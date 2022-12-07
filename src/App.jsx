import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPass from "./components/auth/ForgotPass";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/auth/Login";
import Registation from "./components/auth/Registation";
import MovieCard from "./components/Card/MovieCard";
import { ToastContainer } from "react-toastify";
import LoginModel from "./components/helper/LoginModel";
import Model from "./components/helper/Model";
import ModelProvider from "./components/helper/ModelContext";
import Home from "./components/Home/Home";
import MainBody from "./components/Home/MainBody";
import NavBar from "./components/Home/NavBar";
import SingleMovie from "./components/SingleMovie/SingleMovie";
import AuthProvider from "./components/helper/AuthContext";
import MainHome from "./components/Home/MainHome";
import MyAccount from "./components/auth/MyAccount";

const App = () => {
  return (
    <AuthProvider>
      <ModelProvider>
        <BrowserRouter>
          <NavBar />
          <ToastContainer theme="dark" />
          <Model></Model>
          <LoginModel>
            <Login />
          </LoginModel>
          <Routes>
            <Route path="/" element={<MainHome/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/auth/register" element={<Registation />} />
            <Route path="/auth/forgot-password" element={<ForgotPass />} />
            <Route path="/home/moviecart" element={<MovieCard />} />
            <Route path="/home/singleMovie" element={<SingleMovie />} />
            <Route path="/myAccount" element={<MyAccount/>}/>
          </Routes>
        </BrowserRouter>
      </ModelProvider>
    </AuthProvider>
  );
};

export default App;
