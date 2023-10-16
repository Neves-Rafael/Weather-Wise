import { useState } from "react";
import { background, logo } from "@/assets/index.ts";
import Notice from "@/components/notice";
import Search from "./search";
import { METEO_API_URL, API_KEY } from "@/shared/apis";

// type searchData = {
//   latitude: number;
//   longitude: number;
//   hourly: string;
// };

const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    return new Promise((resolve, reject) => {
      console.log(searchData);
      const [lat, lon] = searchData.value.split(" ");

      const currentWeatherFetch = fetch(
        `${METEO_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${METEO_API_KEY}`
      );
      const forecastFetch = fetch(
        `${METEO_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${METEO_API_KEY}`
      );

      Promise.all([currentWeatherFetch, forecastFetch])
        .then(async (response) => {
          const weatherResponse = await response[0].json();
          const forecastResponse = await response[1].json();

          const currentWeather = { city: searchData.label, ...weatherResponse };
          setCurrentWeather(currentWeather);
          setForecast({ city: searchData.label, ...forecastResponse });

          resolve(currentWeather); // Resolva a promessa com currentWeather
        })
        .catch((err) => {
          console.log(err);
          // reject(err); // Rejeite a promessa se houver um erro
        });
      const getCurrentWeatherData = () => {
        return currentWeather;
      };
    });
  };

  // console.log(currentWeather);
  // console.log(forecast);

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
              <Search />
              {/* Enviar solicitação API */}
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

export const getCurrentWeather = Home;
