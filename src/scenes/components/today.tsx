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
          <img src={caminho} className="w-[90px] h-[90px]" />
          <div>
            <p className="text-7xl text-black font-black text-center">
              {props.dados.main.temp}°C
            </p>
            <p className="text-slate-500 font-bold text-xl">
              {`Min ${props.dados.main.tempMin - 6}°C / Max ${
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
