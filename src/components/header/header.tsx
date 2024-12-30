import { FaRegBell } from "react-icons/fa";

function Header() {
  return (
    <div className="flex justify-between w-full p-[20px] pt-[40px] pr-[70px] bg-headerBg">
      <div></div>
      <div className="relative">
        <FaRegBell className="w-[23px] h-[23px] text-gray-500" />
        <div className="absolute top-[-3px] right-[-3px] w-[8px] h-[8px] bg-logoColor rounded-full"></div>
      </div>
    </div>
  );
}

export default Header;
