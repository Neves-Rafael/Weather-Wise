import {
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  day8,
  day9,
  day10,
  night1,
  night2,
  night3,
  night4,
  night5,
  night6,
  night7,
  night8,
  night9,
  night10,
  night50,
} from "@/assets";
export function DayTwo(props: any) {
  let n = props.number[0];
  if (props.dados.list[n] === undefined) {
    n = 0;
  }
  function somar7Dias(props: number) {
    // Obter a data de hoje
    let data = new Date();

    // Adicionar 7 dias à data de hoje
    data.setDate(data.getDate() + props);

    // Obter o dia e o mês da nova data
    let dia: string | number = data.getDate();
    let mes: string | number = data.getMonth() + 1; // Os meses em JavaScript são indexados de 0 a 11, então + 1

    // Formatar o dia e o mês para garantir que tenham sempre dois dígitos
    dia = dia < 10 ? "0" + dia : dia;
    mes = mes < 10 ? "0" + mes : mes;

    // Retornar o dia e o mês formatados
    return `${dia}/${mes}`;
  }

  const icon = props.dados.list[n].weather[0].icon,
    temp = props.dados.list[n].main.temp.toString().substring(0, 2),
    tempMin = props.dados.list[n].main.temp_min.toString().substring(0, 2),
    tempMax =
      parseInt(props.dados.list[n].main.temp_min.toString().substring(0, 2)) +
      4,
    wind = props.dados.list[n].wind.speed,
    humidity = props.dados.list[n].main.humidity;

  type IconConfig = Record<string, string>;
  const iconsConfig: IconConfig = {
    "01d": day1,
    "02d": day2,
    "03d": day3,
    "04d": day4,
    "05d": day5,
    "06d": day6,
    "07d": day7,
    "08d": day8,
    "09d": day9,
    "10d": day10,
    "01n": night1,
    "02n": night2,
    "03n": night3,
    "04n": night4,
    "05n": night5,
    "06n": night6,
    "07n": night7,
    "08n": night8,
    "09n": night9,
    "10n": night10,
    "50n": night50,
  };

  const icons: string = icon;
  const imagem = iconsConfig[icons];

  return (
    <div className="w-[250px] sm:w-[500px] sm:h-[120px] lg:w-[400px] bg-slate-200 rounded-lg text-black flex justify-between flex-col">
      <div className="w-[95%] h-[95%] m-auto flex flex-col justify-between p-2">
        <div className="flex justify-between items-center">
          <img
            src={imagem}
            className="mr-2 w-12 h-12 sm:w-[70px] sm:h-[70px]"
          />
          <div>
            <p className="text-3xl sm:text-5xl text-black font-black">
              {temp}°C
            </p>
          </div>
          <div>
            <p className="text-slate-500 font-bold text-sm sm:text-xl">{`Min ${
              tempMin - 7
            }°C `}</p>
            <p className="text-slate-500 font-bold text-sm sm:text-xl">{` Max ${tempMax}°C`}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[2px] bg-slate-300 mt-2" />
          <div className="flex justify-between text-center gap-2 items-center">
            <p className=" font-bold text-[12px] lg:text-lg pr-2 sm:pr-0 ">
              {somar7Dias(2)}
            </p>
            <p className="text-[12px] lg:text-sm">
              <span className="font-bold">Vento </span> {wind}km/h
            </p>
            <p className="text-[12px] lg:text-sm">
              <span className="font-bold ">Humidade</span> {humidity}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
