import React, { useState } from "react";
import AccountServices from "../services/Account-services";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { auth } from "../services/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  const [alert, setalert] = useState(false);
  const [message, setmessage] = useState("");
  const [type, settype] = useState("");
  const [passwordconfirm, setconfirm] = useState("");

  const [userInfo, setUserInfo] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    gender: "",
    DOB: "",
  });

  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  


  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "password" || name === "email") {
      setAccount((prevVal) => {
        return {
          ...prevVal,
          [name]: value,
        };
      });
    }

    if (name === "password") {
      return;
    }

    setUserInfo((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  function confirmHandle(event) {
    const confirm = event.target.value;
    setconfirm(confirm);
  }

  //Attempt to Create Account and Verify Email
  async function CreateAcc() {
    // const { fname, lname, username, email, password, DOB } = userInfo;
    // setalert(false);
    // setmessage("");
    // settype("");

    // if (
    //   fname === "" ||
    //   lname === "" ||
    //   username === "" ||
    //   email === "" ||
    //   password === ""||
    //   DOB === ""
    // ) {
    //   setalert(true);
    //   setmessage("Fill all required fields.");
    //   settype("info");
    //   return;
    // }

    if (passwordconfirm !== account.password) {
      setalert(true);
      setmessage(`Password Confirmation doesn't match Password.`);
      settype("error");
      return;
    }

    const verify = await emailVerify(account.email);

    if (!verify) {
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        account.email,
        account.password
      );

      const userCredentials = res.user;
      const userID = userCredentials.uid;


      await AccountServices.addAccount(userID, userInfo);
    } catch (error) {
      console.log(error);
    }

  }

  //Verify Email Address
  async function emailVerify(email) {
    try {
      const res = await axios.get(
        `https://emailverification.whoisxmlapi.com/api/v2?apiKey=at_t8L3VT6v08ilz31bDZiNwXDm0Exa1&emailAddress=${email}`
      );

      const data = await res.data;
      if (
        data.formatCheck === "false" ||
        data.freeCheck === "false" ||
        data.dnsCheck === "false" ||
        data.smtpCheck === "false"
      ) {
        console.log("Invalid email");
        return false;
      }

      return true;
    } catch (error) {
      console.log("Error Occurred: \n" + error);
    }
  }

  return (
    <div className="SignUp-page">
      <img
        className="SignUp-img"
        src="https://images.pexels.com/photos/6634170/pexels-photo-6634170.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="signup-img"
      ></img>

      <div className="SignUp">
        {alert && type !== "" && <Alert severity={type}>{message}</Alert>}
        <h2>Create an Account</h2>
        <p>It is free and easy.</p>

        <input
          type="text"
          onChange={handleChange}
          name="fname"
          placeholder="Enter First name"
          value={userInfo.fname}
          required
        />

        <input
          type="text"
          onChange={handleChange}
          name="lname"
          placeholder="Enter Last name"
          value={userInfo.lname}
          required
        />

        <input
          type="text"
          onChange={handleChange}
          name="username"
          placeholder="Enter Username"
          value={userInfo.username}
          required
        />

        <input
          type="email"
          onChange={handleChange}
          name="email"
          placeholder="Enter email"
          value={account.email}
          required
        />

        <input
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="Enter new password"
          value={account.password}
          required
        />

        <input
          type="password"
          onChange={confirmHandle}
          name="confirm-password"
          placeholder="Confirm Password"
          value={passwordconfirm}
          required
        />

        <label htmlFor="gender">
          Gender:
          <select
            id="gender"
            onChange={handleChange}
            name="gender"
            value={userInfo.gender}
            required
          >
            <option>None</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </label>

        {/* fix misbehaviour  */}

        <label htmlFor="DOB">Date of Birth</label>

        <input
          id="DOB"
          onChange={handleChange}
          name="DOB"
          type="date"
          required
        />
        <Button variant="contained" onClick={CreateAcc}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
export default SignUp;
