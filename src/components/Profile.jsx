import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { setCookie } from "react-use-cookie";
import {removeCookie} from "react-cookie";

function Profile(props) {
  let navigate = useNavigate();

  function logoutFunc() {
    removeCookie("username");
    setCookie("loggedIn", false);
    return navigate("/");
  }

  return (
    <div id="profile">
      <p>
        {props.username} <AccountCircleIcon sx={{ fontSize: 30 }} />
      </p>
      <div className="dropdown">
        <ul className="dropdown-content">
          <li id="dropdown-list" onClick={logoutFunc}>
            <h3>Log out</h3>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
