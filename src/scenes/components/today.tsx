export function Today(props: {
  dados: any;
  inputValue: string;
  imagem: string;
}) {
  const caminho = `./src/assets/${props.imagem}.svg`;

  return (
    <div className="w-[500px] h-[250px] bg-slate-200 rounded-lg text-black flex justify-between flex-col">
      <div className="w-11/12 m-auto flex flex-col justify-between  h-5/6">
        <div className="flex justify-between">
          <div>
            <p className="font-bold text-xl">Clima Atual</p>
            <p>{props.inputValue}</p>
          </div>
          <div>
            <button className="bg-blue-600 text-white py-1  px-3 rounded-lg">
              Está vendo um clima diferente?
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <img src={caminho} />
          <div>
            <p className="text-6xl text-black font-black">
              {props.dados.main.temp}°C
            </p>
            <p className="text-slate-500 font-bold">{`Min ${props.dados.main.tempMin}°C Max ${props.dados.main.tempMax}°C`}</p>
          </div>
          <div>
            <p>{props.dados.weather.description}</p>
            <p>{`Sensação térmica ${props.dados.main.feelsLike}`}</p>
          </div>
        </div>
        <div>
          {/* <p>(se possível conteúdo adicional sobre como está o clima)</p> */}
        </div>
        <div className="flex flex-col">
          <div className="h-[2px] bg-slate-300 mb-4" />
          <div className="flex justify-between">
            <p>Vento {props.dados.wind} km/h</p>
            <p>Humidade {props.dados.main.humidity}%</p>
            <p>{props.dados.visibility} Metros</p>
            <p>Pressão {props.dados.main.pressure}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
