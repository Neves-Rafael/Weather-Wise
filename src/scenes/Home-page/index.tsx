// import React from "react";
// import { background } from "../assets";
// import { logo } from "../assets";
import notice from "./components/notice.tsx";

type Props = {};

const Home = (img: Props) => {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        {/* background */}
        <img
          // src={background}
          className="object-cover w-full h-full z-[-1] absolute"
        />

        <div className="flex items-center justify-center flex-col gap-40">
          {/* LOGO/SEARCH BAR */}

          <div className="flex items-center flex-col gap-[50px]">
            <div className="flex flex-col items-center">
              {/* <img src={logo} alt="" className="w-[100px] h-[100px]" /> */}
              <p className="text-3xl text-center text-black font-bold">
                Weather Wise
              </p>
            </div>

            <div>
              <input
                type="text"
                className="rounded-lg h-11 w-[300px] placeholder:text-center border-4 focus:border-blue-600 focus:outline-none p-2"
                placeholder="Selecione a sua Cidade"
              />
            </div>
          </div>
          {/* NOTICE */}
        </div>
      </div>
    </>
  );
};

export default Home;
