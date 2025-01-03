import Daliy from "./daliy";
import Member from "./member";
import Notify from "./notify";
import WeeklyStudy from "./weeklyStudy";

export default function Home() {
  return (
    <div className="w-[100%] bg-white shadow-md p-10 relative">
      <Notify />
      <Daliy />
      <Member />
      <WeeklyStudy />
    </div>
  );
}
