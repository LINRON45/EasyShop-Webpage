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
import Logout from "./components/Logout";
import UserCart from "./components/Cart/Cart";
import { getCookie, setCookie } from "react-use-cookie";

function App() {

  const [showLogin, setShowLogin] = useState(false);

  let currentPath = useLocation();
  let navigate = useNavigate();
  const loginState = getCookie("state")


  useEffect(() => {
    const cookie = getCookie("state");
    if (
      currentPath.pathname === "/signup" && cookie==="true"   ) {
      navigate("/");
    }

    // setCookie("state", false)
  },[]);

  function loginstate(username) {
    setCookie("state", true);
    setCookie("username", `${username}`);
  }

  function loginstatefalse() {
    setCookie("username", "");
    setCookie("state", false);
  }

  return (
    <div>
      <nav >
        <Logo />
        <ul className="Nav-bar">
          <li id="option1">
            <Link to="/">Home</Link>
          </li>
          <li id="option3">
            <Link to="/shop">Shop</Link>
          </li>
          <li id="option4" hidden>
            <Link to="/sell">Sell</Link>
          </li>
          <li id="option2" hidden>
            <Link to="/sales">My Sales</Link>
          </li>
          <li id="option5">
            <Link to="/contact">Contact</Link>
          </li>

          <li>
            {loginState ==="false"? (
              <Link to="/signup">Sign Up</Link>
            ) : (
              <Link to="/cart">Cart</Link>
            )}
          </li>

          <li>
            {loginState==="false" ? (
              <a onClick={() => setShowLogin(true)}>Log In</a>
            ) : (
              <Logout func={loginstatefalse} />
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
    </div>
  );
}

export default App;
