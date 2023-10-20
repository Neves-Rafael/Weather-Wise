import { useState } from "react";
import {
  GEO_API_URL,
  API_KEY,
  METEO_API_URL,
  FORESCAST_API_URL,
} from "@/shared/apis";
import { Today } from "../components/today";
import { DayOne } from "../components/dayone";
import { DayTwo } from "../components/daytwo";
import { Forecast } from "../components/forecast";

const imputStyle =
  "rounded-lg  w-[300px] placeholder:text-center p-1 focus:border-blue-500 focus:outline-none text-[18px]";

const Search = () => {
  //função para pegar o valor do input
  const [inputValue, setInputValue] = useState("brasília");

  //atualiza o valor do input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Atualiza o estado com o valor do input
  };

  //Hooks para atualizar a localização e enviar para a API
  const [imagem, setImagem] = useState("01d");

  //Hooks para pegar dados do retorno do Weather API
  const [dados, setDados] = useState({
    name: "Brasília",
    wind: 12,
    visibility: 5000,
    main: {
      temp: 26,
      feelsLike: 25,
      humidity: 20,
      tempMax: 28,
      tempMin: 22,
      pressure: 1010,
    },
    weather: {
      description: "Nublado",
      icon: "01d",
    },
  });

  //Hook para pegar dados do retorno do ForeCast API
  const [forecastDados, setForecastDados] = useState({
    tempMax: 0,
    tempMin: 0,
    icon: "0",
    data: "",
  });
  console.log(forecastDados);

  //solicitação API tempo da semana
  const getForecasWeather = async (latitude: string, longitude: string) => {
    const forecastApi = `${FORESCAST_API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`;
    const resultForecastApi = await fetch(forecastApi);
    const resultForecastApiJson = await resultForecastApi.json();
    ForecastGenerator(resultForecastApiJson);
    console.log("dados da API:", resultForecastApiJson);

    setForecastDados({
      ...forecastDados,
      tempMax: resultForecastApiJson.list[0].main.temp_max
        .toString()
        .substring(0, 2),
      tempMin: resultForecastApiJson.list[0].main.temp_min
        .toString()
        .substring(0, 2),
      icon: resultForecastApiJson.list[0].weather[0].icon,
      data: resultForecastApiJson.list[0].dt_txt,
    });
  };

  //solicitação API tempo atual
  const getWeatherData = async (
    latitude: string,
    longitude: string,
    day: number
  ) => {
    const apiWeatherUrl = `${METEO_API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`;
    const resultApi = await fetch(apiWeatherUrl);
    const resultApiJson = await resultApi.json();
    //atribuindo os dados para o estado
    setImagem(resultApiJson.weather[0].icon);
    setDados({
      ...dados,
      name: resultApiJson.name,
      wind: resultApiJson.wind.speed,
      visibility: resultApiJson.visibility,
      main: {
        ...dados.main,
        temp: resultApiJson.main.temp.toString().substring(0, 2),
        feelsLike: resultApiJson.main.feels_like.toString().substring(0, 2),
        humidity: resultApiJson.main.humidity,
        tempMax: resultApiJson.main.temp_max.toString().substring(0, 2),
        tempMin: resultApiJson.main.temp_min.toString().substring(0, 2),
        pressure: resultApiJson.main.pressure,
      },
      weather: {
        ...dados.weather,
        description: resultApiJson.weather[0].description.toUpperCase(),
        icon: resultApiJson.weather[0].icon,
      },
    });
  };

  const getGeoCode = async (inputValue: string) => {
    const apiGeoCodeUrl = `${GEO_API_URL}${inputValue}&limit=1&appid=${API_KEY}`;
    const resultApi = await fetch(apiGeoCodeUrl);
    const geoCode = await resultApi.json();
    getWeatherData(geoCode[0].lat, geoCode[0].lon);
    getForecasWeather(geoCode[0].lat, geoCode[0].lon);
  };

  const callHandle = () => {
    getGeoCode(inputValue);
  };

  const ForecastGenerator = (forecastRecebido: any) => {
    for (let i = 0; i < forecastRecebido.list.length; i += 8) {
      <div>
        <Forecast dados={forecastRecebido.list[i]} />
      </div>;
      // Adicionando o valor do array à div
      // Adicionando a div ao contêiner
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Imput */}
      <div className="flex justify-center">
        <input
          type="text"
          className={imputStyle}
          placeholder="Selecione a sua Cidade"
          value={inputValue} // Valor do input é controlado pelo estado
          onChange={handleInputChange} // Manipulador de eventos para capturar alterações no input
        />
      </div>
      {/* Button Enviar */}
      <div className="flex justify-center">
        <button
          onClick={callHandle}
          className="bg-orange-400 text-black w-[100px] m-auto py-2 rounded-lg hover:text-white hover:bg-orange-600"
        >
          Enviar
        </button>
        {/* Resultado */}
      </div>

      <div>
        <div className="flex m-auto w-full h-full gap-20">
          {/* TODAY */}
          <Today dados={dados} inputValue={inputValue} imagem={imagem} />
          {/* BARRA DE PESQUISA */}
          <div className="h-full flex flex-col gap-10">
            {/* DAY 1 */}
            <DayOne dados={dados} inputValue={inputValue} imagem={imagem} />
            {/* DAY 2 */}
            <DayTwo dados={dados} inputValue={inputValue} imagem={imagem} />
          </div>
        </div>
        {/* FORECAST */}
        <div className="mt-10">
          {/* <Forecast dados={forecastDados} /> */}
          <ForecastGenerator dados={forecastDados} />
        </div>
      </div>
    </div>
  );
};

export default Search;
