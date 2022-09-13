import React from "react";
import Button from "@mui/material/Button";
import { getCookie } from "react-use-cookie";
import { useNavigate } from "react-router-dom";

function Home_Display(props) {
  const cookie = getCookie("state");

  let navigate = useNavigate();

  return (
    <div className="home-vid">
      <video autoPlay muted loop>
        <source src="https://i.imgur.com/z51dIUf.mp4" type="video/mp4"></source>
      </video>

      <div className="home-overlay">
        <p id="video-text">
          Easy Online Shopping and Sales Promotion <br />
          In St. Vincent and the Grenadines !
        </p>
        {cookie === "false" && (
          <Button
            id="start-button"
            variant="outlined"
            // add a path to sign up
            onClick={() => navigate("/signup")}
          >
            Get Started
          </Button>
        )}
      </div>
    </div>
  );
}

export default Home_Display;
