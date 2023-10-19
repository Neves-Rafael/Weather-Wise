export function DayTwo(props) {
  const caminho = `./src/assets/${props.imagem}.svg`;
  return (
    <div className="w-[400px] h-[140px] bg-slate-200 rounded-lg text-black flex justify-between flex-col">
      <div className="w-[95%] h-[95%] m-auto flex flex-col justify-between p-2">
        <div className="flex justify-between items-center">
          <img src={caminho} className="mr-4" />
          <div>
            <p className="text-3xl text-black font-black">
              {props.dados.main.temp}°C
            </p>
            <p className="text-slate-500 font-bold">{`Min ${props.dados.main.tempMin}°C Max ${props.dados.main.tempMax}°C`}</p>
          </div>
          <div>
            <p>{props.dados.weather.description}</p>
            <p>{`Sen. térmica ${props.dados.main.feelsLike}`}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[2px] bg-slate-300 mb-2" />
          <div className="flex justify-around">
            <p>Vento {props.dados.wind} km/h</p>
            <p>Humidade {props.dados.main.humidity}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
