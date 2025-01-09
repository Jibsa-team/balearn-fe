import Image from "next/image";

export default function SidebarClose() {
  return (
    <div className="w-[70px] h-full flex flex-col items-center pt-[20px]">
      <div className="rounded-full p-[5px] border-[2.5px] w-[40px] h-[40px] overflow-hidden mr-[10px]">
        <Image
          src="/Avatar.png"
          width={50}
          height={50}
          alt="group profile"
          className="object-cover"
        />
      </div>
      <div className="rounded-full p-[5px] border-[2.5px] w-[40px] h-[40px] overflow-hidden mr-[10px]">
        <Image
          src="/Avatar.png"
          width={50}
          height={50}
          alt="group profile"
          className="object-cover"
        />
      </div>
    </div>
  );
}
