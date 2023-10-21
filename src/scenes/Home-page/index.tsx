import { background, logo, loading } from "@/assets/index.ts";
import Search from "./search";
import React, { useEffect, useState } from "react";

const Home = () => {
  const LoadingScreen = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
        console.log("teste");
      }, 2500); // Ocultar a tela de carregamento após 5 segundos

      return () => {
        clearTimeout(timer);
      };
    }, []);

    return visible ? (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-white z-30 flex flex-col gap-6 justify-center items-center">
        <p className="text-3xl font-bold">Seja Bem vindo!</p>
        <img src={loading} className="w-16 h-16" />
      </div>
    ) : null;
  };

  return (
    <>
      <div>
        <LoadingScreen />
      </div>
      <div className="w-screen h-screen flex items-center justify-center">
        {/* background */}
        <img
          src={background}
          className="object-cover w-full h-full z-[-1] absolute brightness-75"
        />
        <div className="flex items-center justify-center flex-col mt-20">
          {/* LOGO*/}
          <div className="flex items-center flex-col gap-[50px]  h-full">
            <div className="flex flex-col items-center">
              <img src={logo} alt="" className="w-[100px] h-[100px]" />
              <p className="text-4xl text-center text-white font-bold">
                Weather Wise
              </p>
            </div>
            {/* BARRA DE PESQUISA */}
            <div className="flex flex-col">
              <Search />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
