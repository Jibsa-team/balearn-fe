import Daliy from "./daliy";
import Member from "./member";
import Notify from "./notify";
import WeeklyStudy from "./weeklyStudy";

export default function Home() {
  return (
    <div className="w-full p-[30px] bg-white shadow-md overflow-y-scroll">
      <Notify />
      <Daliy />
      <Member />
      <WeeklyStudy />
    </div>
  );
}
