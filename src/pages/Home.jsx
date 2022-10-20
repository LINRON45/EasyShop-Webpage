import React from "react";
import HomeDisplay from "../components/Home/Home-Display";
import HomeSection from "../components/Home/HomeSection";
import Zoom from "@mui/material/Zoom";

function Home() {
  return (
    <Zoom in={true}>
      <div id="homePage">
        <HomeDisplay />
        <HomeSection />
      </div>
    </Zoom>
  );
}

export default Home;
