const afterTomorrow = () => {
  return (
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
  );
};

export default afterTomorrow;
