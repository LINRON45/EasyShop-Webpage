import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getCookie } from "react-use-cookie";

function Logout(props) {
  const username = getCookie("username");

  return (
    <li id="option9">
      <span>{username}</span> <AccountCircleIcon sx={{ fontSize: 35 }} />
      <div className="dropdown">
        <ul className="dropdown-content">
          <li
            id="dropdown-list"
            onClick={() => {
              props.Direct();
              props.func();
            }}
          >
            <h3>Log out</h3>
          </li>
        </ul>
      </div>
    </li>
  );
}

export default Logout;
