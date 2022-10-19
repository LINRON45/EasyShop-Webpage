import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "react-use-cookie";

function Profile(props) {
  const [show, setShow] = useState(false);

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
        <span>{props.username}</span>
        <img
          id="pfp"
          src="https://cdn-icons-png.flaticon.com/512/1144/1144709.png"
          alt="pfp"
          onClick={() => setShow((prev) => !prev)}
        />
      </p>
      <section
        className="dropdown"
        style={{ display: !show && "none" }}
        onClick={logoutFunc}
      >
        <h3>Log out</h3>
      </section>
    </div>
  );
}

export default Profile;
