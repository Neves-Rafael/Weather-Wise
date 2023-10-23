// import { useState } from "react";

import {
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  day8,
  day9,
  day10,
  night1,
  night2,
  night3,
  night4,
  night5,
  night6,
  night7,
  night8,
  night9,
  night10,
  night50,
} from "@/assets/index";
export function Today(props: {
  dados: any;
  inputValue: string;
  imagem: string;
}) {
  type IconConfig = Record<string, string>;
  const iconsConfig: IconConfig = {
    "01d": day1,
    "02d": day2,
    "03d": day3,
    "04d": day4,
    "05d": day5,
    "06d": day6,
    "07d": day7,
    "08d": day8,
    "09d": day9,
    "10d": day10,
    "01n": night1,
    "02n": night2,
    "03n": night3,
    "04n": night4,
    "05n": night5,
    "06n": night6,
    "07n": night7,
    "08n": night8,
    "09n": night9,
    "10n": night10,
    "50n": night50,
  };

  const icons: string = props.imagem;
  const imagem = iconsConfig[icons];

  console.log(imagem);

  return (
    <div className=" w-[250px] md:w-[500px] h-[150px]  md:h-[250px] bg-slate-200 rounded-lg text-black flex justify-between flex-col">
      <div className="w-11/12 m-auto flex flex-col justify-between h-5/6">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-[12px] hidden md:block md:text-xl">
              Clima Atual
            </p>
          </div>
          <div>
            <button className="bg-blue-600 text-white py-1 text-[10px] md:text-sm px-3 rounded-lg">
              <a target="_blank" href="mailto:nevesrafael.dev@gmail.com">
                Está vendo um clima diferente?
              </a>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <img src={imagem} className=" w-14 h-14 md:w-[90px] md:h-[90px]" />
          <div>
            <p className=" text-[30px] md:text-7xl text-black font-black text-center">
              {props.dados.main.temp}°C
            </p>
            <p className="text-slate-500 font-bold text-[11px] w-[108px] md:text-xl">
              {`Min ${props.dados.main.tempMin - 6}°C /Max ${
                parseInt(props.dados.main.tempMax.toString().substring(0, 2)) +
                6
              }°C`}
            </p>
          </div>
          <div className="w-[80px] md:w-auto">
            <p className="font-bold text-[8px] md:text-lg hidden md:block text-center md:mb-4">
              {props.dados.weather.description.toUpperCase()}
            </p>
            <p className="text-center text-[12px]">
              Sensação térmica <br />
              <span className="font-bold md:text-lg">
                {`${props.dados.main.feelsLike}°C`}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[2px] bg-slate-300 mt-2 mb-2" />
          <div className="flex justify-between text-[10px] md:text-sm text-center">
            <p>
              <span className="font-bold">Vento</span> {props.dados.wind} km/h
            </p>
            <p>
              <span className="font-bold">Humidade</span>{" "}
              {props.dados.main.humidity}%
            </p>
            <p>
              <span className="font-bold">Visibilidade</span>{" "}
              {props.dados.visibility}M
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
