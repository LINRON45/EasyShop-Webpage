import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { setCookie } from "react-use-cookie";

function Profile(props) {
  let navigate = useNavigate();

  function logoutFunc() {
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    console.log(Date.now());
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
