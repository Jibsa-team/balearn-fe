import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import SidebarItem from "./sidebar.item";

function Sidebar() {
  return (
    <div className="h-screen w-3/12 p-[20px] pt-[40px] flex flex-col items-center bg-sidebarBg">
      <header className="text-2xl text-gray-600">OurMeeting</header>
      <section className="mt-[100px] flex flex-col items-center">
        <div>
          <div className="flex justify-between">
            <div></div>
            <BsThreeDots className="cursor-pointer text-unActiveColor" />
          </div>
          <div className="rounded-full p-2 border-[2.5px] border-logoColor w-[150px] h-[150px]">
            <Image
              src="/Avatar.png"
              width={140}
              height={140}
              alt="profile image"
              className="object-cover"
            />
          </div>
          <div className="mt-[20px] flex flex-col justify-center text-center">
            <span>Hello JaeIn</span>
            <span className="text-gray-400">ysy06053@gmail.com</span>
          </div>
        </div>
      </section>
      <main className="mt-[10px] flex flex-col items-center">
        <SidebarItem />
      </main>
    </div>
  );
}

export default Sidebar;
