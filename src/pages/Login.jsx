import React, { useEffect, useState } from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Zoom from "@mui/material/Zoom";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";
import { setCookie } from "react-use-cookie";
import AccountServices from "../services/Account-services";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase-config";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [loginAttempt, setAttempt] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState(false);
  const [message, setmessage] = useState("");
  const [alerttype, settype] = useState();

  const itemPage = props.cart;

  let navigate = useNavigate();

  function handlechange(event) {
    const { name, value } = event.target;

    setAttempt((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  async function login() {
    if (loginAttempt.email === "" && loginAttempt.password === "") {
      setAlert(true);
      setmessage("Enter email and password.");
      settype("info");
      return;
    } else if (loginAttempt.email === "") {
      setAlert(true);
      setmessage("Enter email.");
      settype("info");
      return;
    } else if (loginAttempt.password === "") {
      setAlert(true);
      setmessage("Enter password.");
      settype("info");
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        loginAttempt.email,
        loginAttempt.password
      );

      const userCredentials = res.user;
      const userID = userCredentials.uid;

      const userinfo = await AccountServices.getAccount(userID);
      const data = userinfo.data();

      setCookie("username", `${data.username}`);
      setCookie("uid", `${userID}`);
      setCookie("loggedIn", true);
      console.log(itemPage);
      if (itemPage) {
        return window.location.reload();
      }

      props.showLogin(false);

      return navigate("/");
    } catch (error) {
      setAlert(true);

      settype("error");
      setmessage("Attempt to login failed.");
    }
  }

  function closeModal(event) {
    const target = event.target.id;
    if (target === "loginModal" || target === "") {
      return;
    }

    props.showLogin(false);
  }

  const [display, setDisplay] = useState(false);
  useEffect(
    () =>
      setTimeout(() => {
        setDisplay(true);
      }, 160),

    []
  );

  return (
    <Zoom in={true}>
      <div
        id="loginOverlay"
        onClick={closeModal}
        style={display && { background: "rgba(128, 128, 128, 0.653)" }}
      >
        <div id="loginModal">
          <h2>
            Log into
            <span>
              <LocalMallIcon />
              EasyShop
            </span>
          </h2>
          {alert && (
            <>
              <Alert severity={alerttype}>{message}</Alert>
            </>
          )}
          <input
            onChange={handlechange}
            type="text"
            name="email"
            placeholder="Enter email"
            value={loginAttempt.email}
          />
          <input
            onChange={handlechange}
            type="password"
            name="password"
            placeholder="Enter password"
            value={loginAttempt.password}
          />
          <Button variant="contained" onClick={login}>
            Log In
          </Button>
        </div>
      </div>
    </Zoom>
  );
}

export default Login;
