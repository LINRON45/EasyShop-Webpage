import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import Logo from "./components/Home/Logo";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Shop from "./pages/Shop";
import Sell from "./pages/Sell";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import UserCart from "./components/Cart/Cart";
import { useCookies } from "react-cookie";

import { setCookie } from "react-use-cookie";

function App() {
  const [login, setlogin] = useCookies(["state"]);


  function loginstate() {
    setlogin("state", true, { path: "/" });
  }

  function loginstatefalse() {
    setCookie("username", "");
    setlogin("state", false, { path: "/" });
  }

  return (
    <div>
      <nav>
        <ul className="Nav-bar">
          <li id="option1">
            <Link to="/">Home</Link>
          </li>
          <li id="option3">
            <Link to="/shop">Shop</Link>
          </li>
          <li id="option4">
            <Link to="/sell">Sell</Link>
          </li>
          <li id="option2">
            <Link to="/sales">My Sales</Link>
          </li>
          <li id="option5">
            <Link to="/contact">Contact</Link>
          </li>
          <Logo />
          {login.state === "false" ? (
            <li id="option6">
              <Link to="/signup">Sign Up</Link>
            </li>
          ) : (
            <li id="option8">
              <Link to="/cart">Cart</Link>
            </li>
          )}

          {login.state === "false" ? (
            <li id="option7">
              <Link to="/login">Log In</Link>
            </li>
          ) : (
            <Logout func={loginstatefalse} />
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/login"
          element={<Login Func={loginstate}/>}
        />
        <Route path="/cart" element={<UserCart />} />
      </Routes>
    </div>
  );
}

export default App;
