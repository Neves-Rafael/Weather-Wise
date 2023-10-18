import { background, logo } from "@/assets/index.ts";
import Search from "./search";

const Home = () => {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        {/* background */}
        <img
          src={background}
          className="object-cover w-full h-full z-[-1] absolute brightness-75"
        />
        <div className="flex items-center justify-center flex-col gap-40">
          {/* LOGO*/}
          <div className="flex items-center flex-col gap-[50px]">
            <div className="flex flex-col items-center">
              <img src={logo} alt="" className="w-[100px] h-[100px]" />
              <p className="text-4xl text-center text-white font-bold">
                Weather Wise
              </p>
            </div>
            {/* BARRA DE PESQUISA */}
            <div className="flex flex-col gap-4">
              <Search />
            </div>
          </div>
          {/* NOTICE */}
        </div>
      </div>
    </>
  );
};

export default Home;
