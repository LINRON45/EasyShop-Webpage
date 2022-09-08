import React, { useState } from "react";
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
  const [navigate, setnavigate] = useState({ option1: true });
  const [login, setlogin] = useCookies(["state"]);

  function handleClick(event) {
    const select = event.target.id;

    setnavigate(() => {
      return {
        [select]: true,
      };
    });
  }

  function Directfunc() {
    setnavigate({ option6: true });
  }

  function Directhomefunc() {
    setnavigate({ option1: true });
  }

  function loginDirect() {
    setnavigate({ option1: true });
  }

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
          <li id="option1" onClick={handleClick}>
            Home
          </li>
          <li id="option3" onClick={handleClick}>
            Shop
          </li>
          <li id="option4" onClick={handleClick}>
            Sell
          </li>
          <li id="option2" onClick={handleClick}>
            My Sales
          </li>
          <li id="option5" onClick={handleClick}>
            Contact
          </li>
          <Logo />
          {login.state === "false" ? (
            <li id="option6" onClick={handleClick}>
              Sign Up
            </li>
          ) : (
            <li id="option8" onClick={handleClick}>
              {" "}
              Cart{" "}
            </li>
          )}

          {login.state === "false" ? (
            <li id="option7" onClick={handleClick}>
              Log In
            </li>
          ) : (
            <Logout Direct={Directhomefunc} func={loginstatefalse} />
          )}
        </ul>
      </nav>
      {navigate.option1 && <Home Direct={Directfunc} />}
      {navigate.option2 && <Sales />}
      {navigate.option3 && <Shop />}
      {navigate.option4 && <Sell />}
      {navigate.option5 && <Contact />}
      {navigate.option6 && <SignUp />}
      {navigate.option7 && <Login Func={loginstate} Direct={loginDirect} />}
      {navigate.option8 && <UserCart />}
    </div>
  );
}

export default App;
