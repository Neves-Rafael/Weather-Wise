import { useState, useEffect } from "react";
import {
  GEO_API_URL,
  API_KEY,
  METEO_API_URL,
  FORESCAST_API_URL,
  API_FLAG,
} from "@/shared/apis";
import { Today } from "../components/today";
import { DayOne } from "../components/dayone";
import { DayTwo } from "../components/daytwo";
import { Forecast } from "../components/forecast";

const imputStyle =
  "rounded-lg  w-[300px] placeholder:text-center p-1 focus:border-blue-500 focus:outline-none text-[20px] text-center";

const Search = () => {
  //função para pegar o valor do input
  const [inputValue, setInputValue] = useState("Brasília");

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

  const [errorMessage, setErrorMessage] = useState("");

  //Hook para pegar dados do retorno do ForeCast API
  const [forecastDados, setForecastDados] = useState({
    list: [
      {
        main: {
          temp: 26.55,
          feels_like: 25.55,
          humidity: 20,
          temp_max: 28.55,
          temp_min: 22.55,
          pressure: 1010,
        },

        weather: [
          {
            description: "Nublado",
            icon: "01d",
          },
        ],
        wind: {
          speed: 5,
        },
      },
    ],
  });

  const [flag, setFlag] = useState("BR");

  //solicitação API tempo da semana
  const getForecasWeather = async (latitude: string, longitude: string) => {
    const forecastApi = `${FORESCAST_API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`;
    const resultForecastApi = await fetch(forecastApi);
    const resultForecastApiJson = await resultForecastApi.json();
    setForecastDados(resultForecastApiJson);
  };

  //solicitação API tempo atual
  const getWeatherData = async (
    latitude: string,
    longitude: string
    // day: number
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
    try {
      const apiGeoCodeUrl = `${GEO_API_URL}${inputValue}&limit=1&appid=${API_KEY}`;
      const resultApi = await fetch(apiGeoCodeUrl);
      const geoCode = await resultApi.json();
      getWeatherData(geoCode[0].lat, geoCode[0].lon);
      getForecasWeather(geoCode[0].lat, geoCode[0].lon);
      console.log(geoCode);
      setFlag(geoCode[0].country);
    } catch (e) {
      setErrorMessage("Erro ao encontrar a sua localização, tente novamente.");
    }
  };

  const callHandle = () => {
    getGeoCode(inputValue);
  };

  //fazer uma chamada para a API uma única vez com a cidade pré definida (Brasília)
  const MeuComponente = () => {
    useEffect(() => {
      // Esta função será executada uma única vez quando o componente for montado
      console.log("A função foi executada automaticamente.");

      callHandle();

      // Se precisar realizar ações quando o componente for desmontado, retorne uma função de limpeza do useEffect
      return () => {
        console.log("O componente está sendo desmontado.");
        // Coloque lógica de limpeza aqui, se necessário
      };
    }, []); // O array de dependências vazio garante que este efeito só ocorra uma vez, como componentDidMount

    return <div>{/* Conteúdo do seu componente */}</div>;
  };
  //chamada automática do componente
  // MeuComponente();

  return (
    <>
      <div className="flex flex-col gap-10">
        {/* Imput */}
        <div className="flex justify-center gap-4 mb-10">
          <input
            type="text"
            className={imputStyle}
            placeholder="Busca a sua Cidade"
            value={inputValue} // Valor do input é controlado pelo estado
            onChange={handleInputChange} // Manipulador de eventos para capturar alterações no input
          />
          <p className="absolute mt-14 text-black font-bold p-2 rounded-lg">
            {errorMessage}
          </p>
          <p className="absolute mt-14 left-20 bg-slate-200 text-black font-bold py-1 px-2 rounded-lg flex items-center text-xl gap-2">
            {inputValue}
            <img src={`https://flagsapi.com/${flag}/flat/32.png`} />
          </p>
          {/* Button Enviar */}
          <div className="flex justify-center">
            <button
              onClick={callHandle}
              className="bg-orange-400 text-black w-[100px] m-auto py-2 rounded-lg hover:text-white hover:bg-orange-600"
            >
              Buscar
            </button>
            {/* Resultado */}
          </div>
        </div>

        <div className="bg-black bg-opacity-30 p-5 rounded-lg">
          <div className="flex gap-5">
            {/* TODAY */}
            <Today
              dados={dados}
              inputValue={inputValue}
              imagem={imagem}
              flag={flag}
            />
            {/* BARRA DE PESQUISA */}
            <div className="h-full flex flex-col gap-[10px]">
              {/* DAY 1 */}
              <DayOne dados={forecastDados} number={[3]} />
              {/* DAY 2 */}
              <DayTwo dados={forecastDados} number={[7]} />
            </div>
          </div>
          {/* FORECAST */}
          {/* <Forecast dados={forecastDados} /> */}
          <div className="mt-5 flex gap-[11px] justify-center rounded-lg">
            <Forecast dados={forecastDados} number={[12]} day={3} />
            <Forecast dados={forecastDados} number={[18]} day={4} />
            <Forecast dados={forecastDados} number={[26]} day={5} />
            <Forecast dados={forecastDados} number={[33]} day={6} />
            <Forecast dados={forecastDados} number={[40]} day={7} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
