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
    tempMax = props.dados.list[n].main.temp_min.toString().substring(0, 2);

  const caminho = `./src/assets/${icon}.svg`;
  return (
    <div className="bg-gray-400 text-white w-[175px] h-[125px] flex justify-between items-center px-4 py-1 rounded-lg">
      <div className="flex flex-col justify-center gap-2 h-full">
        <p className="font-bold text-xl">{somar7Dias(props.day)}</p>
        <img className="w-[70px] h-[70px]" src={caminho} />
      </div>
      <div className="flex flex-col justify-around h-full">
        <p className="font-bold text-4xl">{tempMax}°</p>
        <p className="font-bold text-4xl">{tempMin}°</p>
      </div>
    </div>
  );
}
