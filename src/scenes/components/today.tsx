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
  // switch (icons) {
  //   case "01d":
  //     setImagem(day1);
  //     break;
  //   case "02d":
  //     setImagem(day2);
  //     break;
  //   case "03d":
  //     setImagem(day3);
  //     break;
  //   case "04d":
  //     setImagem(day4);
  //     break;
  //   case "05d":
  //     setImagem(day5);
  //     break;
  //   case "06d":
  //     setImagem(day6);
  //     break;
  //   case "07d":
  //     setImagem(day7);
  //     break;
  //   case "08d":
  //     setImagem(day8);
  //     break;
  //   case "09d":
  //     setImagem(day9);
  //     break;
  //   case "10d":
  //     setImagem(day10);
  //     break;
  //   case "01n":
  //     setImagem(night1);
  //     break;
  //   case "02n":
  //     setImagem(night2);
  //     break;
  //   case "03n":
  //     setImagem(night3);
  //     break;
  //   case "04n":
  //     setImagem(night4);
  //     break;
  //   case "05n":
  //     setImagem(night5);
  //     break;
  //   case "06n":
  //     setImagem(night6);
  //     break;
  //   case "07n":
  //     setImagem(night7);
  //     break;
  //   case "08n":
  //     setImagem(night8);
  //     break;
  //   case "09n":
  //     setImagem(night9);
  //     break;
  //   case "10n":
  //     setImagem(night10);
  //     break;
  //   case "50n":
  //     setImagem(night50);
  //     break;
  // }

  type Icon =
    | "01d"
    | "02d"
    | "03d"
    | "04d"
    | "05d"
    | "06d"
    | "07d"
    | "08d"
    | "09d"
    | "10d"
    | "01n"
    | "02n"
    | "03n"
    | "04n"
    | "05n"
    | "06n"
    | "07n"
    | "08n"
    | "09n"
    | "10n"
    | "50n";
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
    <div className="w-[500px] h-[250px] bg-slate-200 rounded-lg text-black flex justify-between flex-col">
      <div className="w-11/12 m-auto flex flex-col justify-between  h-5/6">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-xl">Clima Atual</p>
          </div>
          <div>
            <button className="bg-blue-600 text-white py-1  px-3 rounded-lg">
              <a target="_blank" href="mailto:nevesrafael.dev@gmail.com">
                Está vendo um clima diferente?
              </a>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <img src={imagem} className="w-[90px] h-[90px]" />
          <div>
            <p className="text-7xl text-black font-black text-center">
              {props.dados.main.temp}°C
            </p>
            <p className="text-slate-500 font-bold text-xl">
              {`Min ${props.dados.main.tempMin - 6}°C /Max ${
                props.dados.main.tempMax
              }°C`}
            </p>
          </div>
          <div>
            <p className="font-bold text-lg text-center mb-4">
              {props.dados.weather.description.toUpperCase()}
            </p>
            <p className="text-center">
              Sensação térmica <br />
              <span className="font-bold text-lg">
                {`${props.dados.main.feelsLike}°C`}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[2px] bg-slate-300 mb-2" />
          <div className="flex justify-between">
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
