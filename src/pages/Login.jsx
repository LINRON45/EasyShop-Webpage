import React, { useState } from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
// import Zoom from "@mui/material/Zoom";
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

    let usernameData;

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
      setCookie("state", true);

      usernameData = data.username;
      console.log(userID);
    } catch (error) {
      console.log(error);
    }

    props.showLogin(false);

    return () => {
      props.func(usernameData);
      navigate("/");
    };
  }

  function closeModal(event) {
    const target = event.target.id;
    console.log(target);
    if (target === "loginModal" || target === "") {
      return;
    }

    props.showLogin(false);
  }

  return (
    <div id="loginOverlay" onClick={closeModal}>
      <div id="loginModal">
        {alert && (
          <>
            <Alert severity={alerttype}>{message}</Alert>
            <br />
          </>
        )}
        <h2>
          Log into
          <span>
            <LocalMallIcon />
            EasyShop
          </span>
        </h2>
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
  );
}

export default Login;
