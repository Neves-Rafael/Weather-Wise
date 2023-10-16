export const CurrentWeather = (testandoValor: {}) => {
  const todayWeather = testandoValor;
  console.log(todayWeather);

  return (
    <div className="w-[600px] h-[320px] bg-slate-400 rounded-lg text-black flex justify-between flex-col">
      <div className="w-11/12 m-auto flex flex-col justify-between bg-red-400 h-5/6">
        <div className="flex justify-between">
          <div>
            <p></p>
            <p>15:50</p>
          </div>
          <div>
            <p>está vendo um clima diferente?</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p>imagem</p>
          <div>
            <p>29°C</p>
            <p>min 23° max 32°</p>
          </div>
          <div>
            <p>chuvas</p>
            <p>Sensação térmica 31°</p>
          </div>
        </div>
        <div>
          <p>haverá trovoadas na sua área.</p>
        </div>
        <div className="flex flex-col">
          <div>
            <p>-----------</p>
          </div>
          <div className="flex">
            <p>qualidade do ar</p>
            <p>vento</p>
            <p>umidade</p>
            <p>visibilidade</p>
            <p>pressão</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
