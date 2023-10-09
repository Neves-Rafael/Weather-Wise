// import React from "react";
import { background, logo } from "@/assets/index.ts";
import { Link, useNavigate } from "react-router-dom";
import Notice from "@/components/notice";

const Home = () => {
  const navigate = useNavigate();

  const pesquisa = () => {
    navigate("/resultado");
  };

  const imput =
    "rounded-lg h-11 w-[300px] placeholder:text-center border-4 focus:border-blue-500 focus:outline-none p-2 text-[18px]";

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        {/* background */}
        <img
          src={background}
          className="object-cover w-full h-full z-[-1] absolute brightness-75"
        />
        <div className="flex items-center justify-center flex-col gap-40">
          {/* LOGO/SEARCH BAR */}
          <div className="flex items-center flex-col gap-[50px]">
            <div className="flex flex-col items-center">
              <img src={logo} alt="" className="w-[100px] h-[100px]" />
              <p className="text-4xl text-center text-white font-bold">
                Weather Wise
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                className={imput}
                placeholder="Selecione a sua Cidade"
              />
              {/* Enviar solicitação API */}
              <button
                onClick={pesquisa}
                className="bg-orange-400 text-black w-[100px] m-auto py-2 rounded-lg hover:text-white hover:bg-orange-600"
              >
                Enviar
              </button>
            </div>
          </div>
          {/* NOTICE */}
          <div className="flex">
            <Notice />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
