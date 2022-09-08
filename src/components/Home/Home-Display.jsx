import React from "react";
import Button from "@mui/material/Button";
import { getCookie } from "react-use-cookie";

function Home_Display(props) {
  const cookie = getCookie("state");

  return (
    <div className="home-vid">
      <video width="100%" autoPlay muted loop>
        <source src="https://i.imgur.com/z51dIUf.mp4" type="video/mp4"></source>
      </video>

      <div className="home-overlay">
        <p id="video-text">Easy Online Shopping and Sales Promotion</p>
        {cookie === "false" && (
          <Button
            id="start-button"
            variant="outlined"
            onClick={() => props.Direct()}
          >
            Get Started
          </Button>
        )}
      </div>
    </div>
  );
}

export default Home_Display;
