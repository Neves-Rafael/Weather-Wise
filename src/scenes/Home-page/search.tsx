import { useState } from "react";
import { GEO_API_URL, API_KEY, METEO_API_URL } from "@/shared/apis";
import { Today } from "../components/today";
import { DayOne } from "../components/dayone";
import { DayTwo } from "../components/daytwo";
import { Forecast } from "../components/forecast";

const imputStyle =
  "rounded-lg  w-[300px] placeholder:text-center p-1 focus:border-blue-500 focus:outline-none text-[18px]";

const Search = () => {
  //função para pegar o valor do input
  const [inputValue, setInputValue] = useState<string>("");

  //atualiza o valor do input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Atualiza o estado com o valor do input
  };

  //Hooks para atualizar a localização e enviar para a API
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  //Hooks para pegar dados do retorno do Weather API
  const [dados, setDados] = useState({
    name: "",
    wind: 0,
    visibility: 5000,
    main: {
      temp: 0,
      feelsLike: 0,
      humidity: 5000,
      tempMax: 0,
      tempMin: 0,
      pressure: 0,
    },
    weather: {
      mainState: "",
      description: "",
      icon: "",
    },
  });

  const handleSubmit = async () => {
    try {
      const getGeoCode = async (inputValue: string) => {
        const apiGeoCodeUrl = `${GEO_API_URL}${inputValue}&limit=1&appid=${API_KEY}`;
        const resultApi = await fetch(apiGeoCodeUrl);
        const geoCode = await resultApi.json();

        if (geoCode && geoCode[0].lon != 0) {
          setLatitude(geoCode[0].lat);
          setLongitude(geoCode[0].lon);
          // console.log("Dados da API:", geoCode);
        } else {
          console.log("Dados de localização não encontrados ou inválidos.");
        }
      };

      const getWeatherData = async (inputValue: string) => {
        const apiWeatherUrl = `${METEO_API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br`;
        const resultApi = await fetch(apiWeatherUrl);
        const resultApiJson = await resultApi.json();
        console.log("dados da API:", resultApiJson);
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
            mainState: resultApiJson.weather[0].main,
            description: resultApiJson.weather[0].description.toUpperCase(),
            icon: resultApiJson.weather[0].icon,
          },
        });
      };

      //Enviar o valor do input para a API ou realizar qualquer outra ação desejada
      getWeatherData(inputValue);
      getGeoCode(inputValue);
      getIcon(dados.weather.icon);
    } catch (error) {
      console.error("error ao buscar");
    }
  };

  type Icon = {
    [key: string]: string;
  };

  //pegar o icone do clima baseado no id retornado da api
  const iconContent: Icon[] = [
    { "01d": "day1" },
    { "02d": "day2" },
    { "03d": "day3" },
    { "04d": "day4" },
    { "05d": "day5" },
    { "01n": "night1" },
    { "02n": "night2" },
    { "03n": "night3" },
    { "04n": "night4" },
    { "05n": "night5" },
  ];

  const [imagem, setImagem] = useState<string>("01d");

  const getIcon = (idIcon: string) => {
    if (idIcon != "") {
      for (let i = 0; i < iconContent.length; i++) {
        const iconObj = iconContent[i];
        const iconKey = Object.keys(iconObj)[0]; // Obtém a chave do objeto
        const iconValue = iconObj[iconKey]; // Obtém o valor associado à chave

        if (iconKey === idIcon) {
          setImagem(iconKey);
          return iconValue;
        }
      }
    }
  };

  return (
    <div>
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
          onClick={handleSubmit}
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
          <Forecast dados={dados} />
        </div>
      </div>
    </div>
  );
};

export default Search;
