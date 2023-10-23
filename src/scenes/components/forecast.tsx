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
} from "@/assets/index";

export function Forecast(props: any) {
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
    let mes: string | number = data.getMonth() + 1; // Os meses em JavaScript são indexados de 0 a 11, então adiciono  + 1

    // Formatar o dia e o mês para garantir que tenham sempre dois dígitos
    dia = dia < 10 ? "0" + dia : dia;
    mes = mes < 10 ? "0" + mes : mes;

    // Retornar o dia e o mês formatados
    return `${dia}/${mes}`;
  }

  const icon = props.dados.list[n].weather[0].icon,
    tempMin = props.dados.list[n].main.temp_min.toString().substring(0, 2) - 6,
    tempMax =
      parseInt(props.dados.list[n].main.temp_min.toString().substring(0, 2)) +
      6;

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
    <div className="bg-gray-400 text-white w-[115px] h-[100px] lg:w-[175px] lg:h-[125px] flex justify-between items-center  px-2 lg:px-4 py-1 rounded-lg">
      <div className="flex flex-col justify-center gap-2 h-full">
        <p className="font-bold text-sm lg:text-xl">{somar7Dias(props.day)}</p>
        <img className="w-14 h-14 lg:w-[70px] lg:h-[70px]" src={imagem} />
      </div>
      <div className="flex flex-col justify-around h-full">
        <p className="font-bold text-2xl lg:text-4xl">{tempMax}°</p>
        <p className="font-bold text-2xl lg:text-4xl">{tempMin}°</p>
      </div>
    </div>
  );
}
