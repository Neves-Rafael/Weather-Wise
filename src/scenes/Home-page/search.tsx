import { logo } from "@/assets";
import { useState, useEffect } from "react";
import {
  GEO_API_URL,
  API_KEY,
  METEO_API_URL,
  FORECAST_API_URL,
} from "@/shared/apis";
import { Today } from "../components/today";
import { DayOne } from "../components/dayone";
import { DayTwo } from "../components/daytwo";
import { Forecast } from "../components/forecast";

const imputStyle =
  "rounded-lg  sm:w-[300px] w-[200px] placeholder:text-center sm:p-1 focus:border-blue-500 focus:outline-none text-sm sm:text-[20px] text-center";

const Search = () => {
  //Hooks para pegar o valor do input
  const [inputValue, setInputValue] = useState("Brasília");

  //atualiza o valor do input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Atualiza o estado com o valor do input
    setErrorMessage("");
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

  //Hook para pegar a mensagem de erro
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

  //solicitação API tempo da semana
  const getForecasWeather = async (latitude: string, longitude: string) => {
    const forecastApi = `${FORECAST_API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`;
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

  //fazer a buscar a localização
  const getGeoCode = async (inputValue: string) => {
    try {
      const apiGeoCodeUrl = `${GEO_API_URL}${inputValue}&limit=1&appid=${API_KEY}`;
      const resultApi = await fetch(apiGeoCodeUrl);
      const geoCode = await resultApi.json();
      getWeatherData(geoCode[0].lat, geoCode[0].lon);
      getForecasWeather(geoCode[0].lat, geoCode[0].lon);
    } catch (e) {
      setErrorMessage("Erro ao encontrar a sua localização, tente novamente.");
    }
  };

  //adiciona o valor de busca ao componente today
  const [searchCity, setSearchCity] = useState("Brasília");

  const callHandle = () => {
    getGeoCode(inputValue);
    setSearchCity(inputValue);
  };

  //fazer uma chamada para a API uma única vez com a cidade pré definida (Brasília)
  const MeuComponente = () => {
    useEffect(() => {
      // Esta função será executada uma única vez quando o componente for montado
      // console.log("A função foi executada automaticamente.");

      callHandle();

      // Se precisar realizar ações quando o componente for desmontado, retorne uma função de limpeza do useEffect
      return () => {
        // console.log("O componente está sendo desmontado.");
        // Coloque lógica de limpeza aqui, se necessário
      };
    }, []); // O array de dependências vazio garante que este efeito só ocorra uma vez, como componentDidMount

    return <div>{/* Conteúdo do seu componente */}</div>;
  };

  //fazer a buscar a partir da tecla enter
  const onKeyPress = (event: any) => {
    if (event.keyCode === 13) {
      // Chama a função
      callHandle();
    }
  };

  //chamada automática do componente
  MeuComponente();

  return (
    <>
      <div className="flex flex-col gap-10 justify-center sm:w-auto sm:pt-24 sm:pb-24 pt-[50%] pb-[40%]">
        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt=""
            className=" w-[50px] sm:w-[100px] sm:h-[100px]"
          />
          <p className="sm:text-4xl text-center text-white font-bold">
            Weather Wise
          </p>
        </div>
        {/* Imput */}
        <div className="flex justify-center gap-4 sm:mb-10 relative">
          <input
            type="text"
            className={imputStyle}
            placeholder="Busca a sua Cidade"
            value={inputValue} // Valor do input é controlado pelo estado
            onChange={handleInputChange} // Manipulador de eventos para capturar alterações no input
            onKeyDown={onKeyPress}
          />
          <p className="absolute w-[300px] sm:w-[500px] text-center mt-6 sm:mt-14 text-black font-bold p-2 text-[12px] sm:text-lg ">
            {errorMessage}
          </p>

          {/* Button Enviar */}
          <div className="flex justify-center">
            <button
              onClick={callHandle}
              className="bg-orange-400 text-sm font-bold text-black px-2 sm:w-[100px] m-auto py-1 sm:py-2 rounded-lg hover:text-white hover:bg-orange-600"
            >
              Buscar
            </button>
            {/* Resultado */}
          </div>
        </div>

        <div className="bg-black bg-opacity-30 rounded-lg py-5 px-5 w-[300px] sm:w-[550px]  lg:w-[1000px] m-auto">
          <div className="flex flex-wrap gap-5 ">
            {/* TODAY */}
            <div className="m-auto">
              <Today dados={dados} inputValue={searchCity} imagem={imagem} />
            </div>
            {/* BARRA DE PESQUISA */}
            <div className="flex flex-col gap-5 m-auto">
              {/* DAY 1 */}
              <DayOne dados={forecastDados} number={[3]} />
              {/* DAY 2 */}
              <DayTwo dados={forecastDados} number={[7]} />
            </div>
          </div>
          {/* FORECAST */}
          <div className="mt-5 flex gap-[20px] sm:justify-center rounded-lg w-[250px] sm:w-[400px] lg:w-auto flex-wrap m-auto">
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
