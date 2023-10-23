export function DayOne(props: any) {
  let n = props.number[0];
  if (props.dados.list[n] === undefined) {
    n = 0;
  }

  const icon = props.dados.list[n].weather[0].icon,
    temp = props.dados.list[n].main.temp.toString().substring(0, 2),
    tempMin = props.dados.list[n].main.temp_min.toString().substring(0, 2),
    tempMax = props.dados.list[n].main.temp_min.toString().substring(0, 2),
    wind = props.dados.list[n].wind.speed,
    humidity = props.dados.list[n].main.humidity;

  const caminho = `./src/assets/${icon}.svg`;
  return (
    <div className="w-[400px] h-[120px] bg-slate-200 rounded-lg text-black flex justify-between flex-col">
      <div className="w-[95%] h-[95%] m-auto flex flex-col justify-between p-2">
        <div className="flex justify-between items-center">
          <img src={caminho} className="mr-2 w-[70px] h-[70px]" />
          <div>
            <p className="text-5xl text-black font-black text-center">
              {temp}°C
            </p>
          </div>
          <div>
            <p className="text-slate-500 font-bold text-xl">{`Min ${
              tempMin - 4
            }°C `}</p>
            <p className="text-slate-500 font-bold text-xl">{` Max ${tempMax}°C`}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[2px] bg-slate-300 mb-0 mt-2" />
          <div className="flex justify-between">
            <p className=" font-bold">Amanhã</p>
            <p>
              <span className="font-bold">Vento</span> {wind} km/h
            </p>
            <p>
              <span className="font-bold">Humidade</span> {humidity}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
