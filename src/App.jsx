import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Logo from "./components/Home/Logo";
import Home from "./pages/Home";
import Sales from "./pages/Sales";
import Shop from "./pages/Shop";
import Sell from "./pages/Sell";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./components/Profile";
import UserCart from "./pages/Cart";
import { getCookie, setCookie } from "react-use-cookie";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [hideOptions, setHideOptions] = useState(true);
  const [username, setUsername] = useState(null);

  let currentPath = useLocation();
  let navigate = useNavigate();
  const loginState = getCookie("loggedIn");

  useEffect(() => {
    setUsername(getCookie("username"));

    console.log(username);

    if (loginState === "true") {
      setHideOptions("");
    } else {
      setHideOptions(true);
    }

    if (loginState==="false" || !loginState) {
      if(currentPath.pathname === "/sell" || currentPath.pathname === "/sales" || currentPath.pathname === "/cart"){
        navigate("/")
      }
    }

    if (currentPath.pathname === "/signup" && loginState === "true") {
      navigate("/");
    }
  }, [loginstate]);

  function loginstate(username) {
    setCookie("loggedIn", true);
    setCookie("username", `${username}`);
  }

  return (
    <div>
      <nav>
        <Logo />
        <ul className="Nav-bar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li style={{ display: hideOptions && "none" }}>
            <Link to="/sell">Sell</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>

          <li hidden={hideOptions}>
            <Link hidden={hideOptions} to="/sales">
              Sales
            </Link>
          </li>
          <li>
            {loginState === "false" || !loginState ? (
              <Link to="/signup">Sign Up</Link>
            ) : (
              <Link to="/cart">Cart</Link>
            )}
          </li>

          <li>
            {loginState === "false" || !loginState ? (
              <a onClick={() => setShowLogin(true)}>Log In</a>
            ) : (
              <Profile username={username} />
            )}
          </li>
        </ul>
      </nav>

      {showLogin && <Login Func={loginstate} showLogin={setShowLogin} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<UserCart />} />
      </Routes>
      <div id="footer"></div>
    </div>
  );
}

export default App;
