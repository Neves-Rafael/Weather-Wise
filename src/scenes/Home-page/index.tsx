// import React from "react";
import background from "./img/background.jpg";

type Props = {};

const Home = (img: Props) => {
  return (
    <div className="w-screem h-screen flex items-center justify-center">
      {<img src={background} className="object-cover w-full h-full" />}
    </div>
  );
};

export default Home;
