import { useState } from "react";
import { GEO_API_URL, API_KEY, METEO_API_URL } from "@/shared/apis";

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
    country: "",
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
    visibility: 5000,
    wind: {
      speed: 0,
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
          console.log("Dados da API:", geoCode);
        } else {
          console.log("Dados de localização não encontrados ou inválidos.");
        }
      };

      const getWeatherData = async (inputValue: string) => {
        const apiWeatherUrl = `${METEO_API_URL}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
        const resultApi = await fetch(apiWeatherUrl);
        const resultApiJson = await resultApi.json();
        console.log("Dados da API:", resultApiJson);
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
      <button
        onClick={handleSubmit}
        className="bg-orange-400 text-black w-[100px] m-auto py-2 rounded-lg hover:text-white hover:bg-orange-600"
      >
        Enviar
      </button>

      {/* Resultado */}

      <div>
        <div className="flex m-auto w-full gap-20">
          {/* TODAY */}
          <div>
            <div className="w-[600px] h-[320px] bg-slate-400 rounded-lg text-black flex justify-between flex-col">
              <div className="w-11/12 m-auto flex flex-col justify-between bg-red-400 h-5/6">
                <div className="flex justify-between">
                  <div>
                    <p>Clima Atual</p>
                    <p>Horário atual aqui</p>
                  </div>
                  <div>
                    <button>está vendo um clima diferente?</button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>imagem do clima correspondente</p>
                  <div>
                    <p>{dados.main.temp}</p>
                    <p>{`min ${dados.main.tempMin} max ${dados.main.tempMax}`}</p>
                  </div>
                  <div>
                    <p>atualizar de acordo com o retorno da api</p>
                    <p>{`Sensação térmica ${dados.main.feelsLike}`}</p>
                  </div>
                </div>
                <div>
                  <p>
                    (se possivel conteúdo adicional sobre como está o clima)
                  </p>
                </div>
                <div className="flex flex-col">
                  <div>
                    <p>-----------</p>
                  </div>
                  <div className="flex">
                    <p>qualidade do ar</p>
                    <p>{dados.wind.speed}</p>
                    <p>{dados.main.humidity}</p>
                    <p>{dados.visibility}</p>
                    <p>{dados.main.pressure}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* BARRA DE PESQUISA */}
          <div>
            {/* DAY 1 */}
            <div className="mb-[50px]">
              <div className="w-[600px] h-[135px] bg-slate-400 rounded-lg flex justify-center">
                <div className="w-11/12 m-auto flex gap-20 bg-red-400 h-5/6">
                  <div>
                    <p>imagem</p>
                    <p>amanhã</p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex justify-around">
                      <p>19° - 29°C</p>
                      <div>
                        <p>chuvas</p>
                        <p>sensação térmica</p>
                      </div>
                    </div>
                    <div className="flex">
                      <p>qualidade do ar</p>
                      <p>vento</p>
                      <p>umidade</p>
                      <p>visibilidade</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* DAY 2 */}
            <div>
              <div className="w-[600px] h-[135px] bg-slate-400 rounded-lg flex justify-center">
                <div className="w-11/12 m-auto flex gap-20 bg-red-400 h-5/6">
                  <div>
                    <p>imagem</p>
                    <p>amanhã</p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex justify-around">
                      <p>19° - 29°C</p>
                      <div>
                        <p>chuvas</p>
                        <p>sensação térmica</p>
                      </div>
                    </div>
                    <div className="flex">
                      <p>qualidade do ar</p>
                      <p>vento</p>
                      <p>umidade</p>
                      <p>visibilidade</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FORECAST */}
        <div>
          <div className="bg-slate-300">
            <div>
              //".map(aqui)"
              <div className="w-[175px] h-[150px] bg-slate-400 flex flex-col justify-between">
                <div>ter.10</div>
                <div className="flex justify-between w-full">
                  <div>icone</div>
                  <div>
                    <p>32°C</p>
                    <p>20°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
