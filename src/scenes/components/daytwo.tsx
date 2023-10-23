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
    tempMax = props.dados.list[n].main.temp_min.toString().substring(0, 2),
    wind = props.dados.list[n].wind.speed,
    humidity = props.dados.list[n].main.humidity;

  const importImagem = `./src/assets/${icon}.svg`;
  const dynamicImport = async () => {
    const icons = await import(importImagem);
    console.log(importImagem);
  };
  dynamicImport();

  // const caminho = `./src/assets/${icon}.svg`;
  return (
    <div className="w-[400px] h-[120px] bg-slate-200 rounded-lg text-black flex justify-between flex-col">
      <div className="w-[95%] h-[95%] m-auto flex flex-col justify-between p-2">
        <div className="flex justify-between items-center">
          <img src={importImagem} className="mr-2 w-[70px] h-[70px]" />
          <div>
            <p className="text-5xl text-black font-black">{temp}°C</p>
          </div>
          <div>
            <p className="text-slate-500 font-bold text-xl">{`Min ${
              tempMin - 7
            }°C `}</p>
            <p className="text-slate-500 font-bold text-xl">{` Max ${tempMax}°C`}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="h-[2px] bg-slate-300 mt-2" />
          <div className="flex justify-between">
            <p className="ml-2 font-bold">{somar7Dias(2)}</p>
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
