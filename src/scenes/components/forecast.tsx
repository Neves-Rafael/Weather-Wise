export function Forecast(props) {
  return (
    <div className="bg-gray-200 w-[200px] h-[150px] flex justify-between items-center p-4 rounded-lg">
      <div className="flex flex-col justify-between h-full">
        <p>Ter.10</p>
        <p>Icon</p>
      </div>
      <div className="flex flex-col justify-between h-full">
        <p>32°C</p>
        <p>25°C</p>
      </div>
    </div>
  );
}
