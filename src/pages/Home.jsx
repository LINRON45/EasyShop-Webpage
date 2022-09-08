import React from "react";
import HomeDisplay from "../components/Home/Home-Display";
import HomeItems from "../components/Home/Rest-of-Home";

function Home(props) {
  return (
    <div>
      <HomeDisplay Direct={props.Direct} />
      <HomeItems />
    </div>
  );
}

export default Home;
