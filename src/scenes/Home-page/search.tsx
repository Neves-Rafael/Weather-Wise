import { useState } from "react";
import { GEO_API_URL, API_KEY, METEO_API_URL } from "@/shared/apis";
import { CurrentWeather } from "../Weather/today";

const imputStyle =
  "rounded-lg  w-[300px] placeholder:text-center p-1 focus:border-blue-500 focus:outline-none text-[18px]";

// export const teste = (valorTeste: {}) => {
//   const currentWeather = valorTeste;
//   return currentWeather;
// };

const Search = () => {
  //função para pegar o valor do input
  const [inputValue, setInputValue] = useState<string>("");

  //atualiza o valor do input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Atualiza o estado com o valor do input
  };

  //Hooks para atualizar a localização
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const handleSubmit = async () => {
    try {
      const getGeoCode = async (inputValue: string) => {
        const apiGeoCodeUrl = `${GEO_API_URL}${inputValue}&limit=1&appid=${API_KEY}`;
        const resultApi = await fetch(apiGeoCodeUrl);
        const geoCode = await resultApi.json();

        if (geoCode && geoCode[0].lon != 0) {
          setLatitude(geoCode[0].lat);
          setLongitude(geoCode[0].lon);
          console.log("Dados da API:", geoCode);
        } else {
          console.log("Dados de localização não encontrados ou inválidos.");
        }
      };

      const getWeatherData = async (inputValue: string) => {
        const apiWeatherUrl = `${METEO_API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
        const resultApi = await fetch(apiWeatherUrl);
        const resultApiJson = await resultApi.json();
        //exportando o resultado da API
      };

      //Enviar o valor do input para a API ou realizar qualquer outra ação desejada
      getWeatherData(inputValue);
      getGeoCode(inputValue);
    } catch (error) {
      console.error("error ao buscar");
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          className={imputStyle}
          placeholder="Selecione a sua Cidade"
          value={inputValue} // Valor do input é controlado pelo estado
          onChange={handleInputChange} // Manipulador de eventos para capturar alterações no input
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-orange-400 text-black w-[100px] m-auto py-2 rounded-lg hover:text-white hover:bg-orange-600"
      >
        Enviar
      </button>
      <p className="text-white">
        {latitude}
        {longitude}
      </p>
      <CurrentWeather />
    </>
  );
};

export default Search;
