import React, { useState } from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Zoom from "@mui/material/Zoom";
import { Button } from "@mui/material";
import { Alert } from "@mui/material";
import { setCookie } from "react-use-cookie";
import AccountServices from "../services/Account-services";

function Login(props) {
  const a = true;

  const [loginAttempt, setAttempt] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(false);
  const [message, setmessage] = useState("");
  const [alerttype, settype] = useState();

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
    if (loginAttempt.username === "" && loginAttempt.password === "") {
      setAlert(true);
      setmessage("Enter username and password.");
      settype("info");
      return;
    } else if (loginAttempt.username === "") {
      setAlert(true);
      setmessage("Enter username.");
      settype("info");
      return;
    } else if (loginAttempt.password === "") {
      setAlert(true);
      setmessage("Enter password.");
      settype("info");
      return;
    }

    try {
      await AccountServices.getAccount(loginAttempt.username);
    } catch (err) {
      window.alert("Login Error occurred.");
      console.log(err);
    }

    const user = await AccountServices.getAccount(loginAttempt.username);

    if (user._document === null) {
      setAlert(true);
      setmessage("Account does not exist.");
      settype("error");
      return;
    }

    const Accountpass =
      user._document.data.value.mapValue.fields.password.stringValue;

    if (loginAttempt.password === Accountpass) {
      const Account_username =
        user._document.data.value.mapValue.fields.username.stringValue;
      setCookie("username", Account_username);

      props.Func();
      props.Direct();
    } else {
      setAlert(true);
      setmessage("Invalid password entered.");
      settype("error");
      return;
    }
  }

  return (
    <Zoom in={a}>
      <div className="Login">
        {alert && (
          <>
            <Alert severity={alerttype}>{message}</Alert>
            <br />
          </>
        )}

        <h2>
          Log into{" "}
          <span>
            <LocalMallIcon />
            EasyShop
          </span>
        </h2>
        <input
          onChange={handlechange}
          type="text"
          name="username"
          placeholder="Enter Username"
          value={loginAttempt.username}
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
    </Zoom>
  );
}

export default Login;
