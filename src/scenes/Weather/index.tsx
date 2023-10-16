import Today from "@/scenes/Weather/today";
import Tomorrow from "@/scenes/Weather/tomorrow";
import Week from "@/scenes/Weather/week";
import AfterTomorrow from "@/scenes/Weather/after-tomorrow";

const weather = () => {
  return (
    <div className="">
      <div className="flex m-auto w-full gap-20">
        <div>
          <Today />
        </div>
        <div>
          <div className="mb-[50px]">
            <Tomorrow />
          </div>
          <div>
            <AfterTomorrow />
          </div>
        </div>
      </div>
      <div>
        <Week />;
      </div>
    </div>
  );
};

export default weather;
