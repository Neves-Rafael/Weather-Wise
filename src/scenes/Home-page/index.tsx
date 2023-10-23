import { background, loading } from "@/assets/index.ts";
import Search from "./search";
import { useEffect, useState } from "react";

const Home = () => {
  const LoadingScreen = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2500); // Ocultar a tela de carregamento após 5 segundos

      return () => {
        clearTimeout(timer);
      };
    }, []);

    return visible ? (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-white z-30 flex flex-col gap-6 justify-center items-center">
        <p className="sm:text-3xl font-bold">Seja Bem vindo!</p>
        <img src={loading} className="w-16 h-16" />
      </div>
    ) : null;
  };

  return (
    <>
      <div>
        <LoadingScreen />
      </div>

      <img
        src={background}
        className="object-cover bg-repeat h-full w-full z-[-1]  absolute brightness-75"
      />
      <Search />
    </>
  );
};

export default Home;
