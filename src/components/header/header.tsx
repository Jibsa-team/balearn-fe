import Image from "next/image";
import { FaRegBell } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";

interface HeaderProps {
  toggleSidebar: () => void;
}

function Header({ toggleSidebar }: HeaderProps) {
  return (
    <div className="flex justify-between w-full h-[70px] p-[20px] bg-headerBg fixed top-0">
      <div className="flex items-center">
        <IoIosMenu
          className="w-[23px] h-[23px] text-gray-500 cursor-pointer mr-[20px]"
          onClick={toggleSidebar}
        />
        <span className="text-[#C9D439] text-[1.4rem]">Balearn</span>
      </div>
      <div className="flex items-center mr-[30px]">
        <div className="relative">
          <FaRegBell className="w-[23px] h-[23px] text-gray-500" />
          <div className="absolute top-[-3px] right-[-3px] w-[8px] h-[8px] bg-logoColor rounded-full"></div>
        </div>
        <Image
          src={"/Avatar.png"}
          alt="user img"
          width={30}
          height={30}
          className="rounded-full ml-[20px]"
        />
      </div>
    </div>
  );
}

export default Header;
