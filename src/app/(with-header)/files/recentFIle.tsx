import Empty from "@/components/empty/empty";
import useFileStore from "@/store/useFileStore";
import { fileSize } from "@/utils/file";
import Image from "next/image";
import React from "react";
import { BsFileEarmarkPdfFill } from "react-icons/bs";

function RecentFile() {
  const recentFiles = useFileStore((state) => state.recentFiles);

  return (
    <div className="mb-[40px]">
      <div className="text-xl flex justify-start mb-[10px]">최근 파일</div>
      <div className="mt-[20px] w-full rounded-2xl flex">
        {recentFiles.length > 0 ? (
          recentFiles.map((e, i) => {
            return (
              <a href={e.preview} target="_blank" key={i}>
                <div className="flex items-start justify-between bg-white rounded-xl min-w-[200px] p-[10px] shadow-lg mr-[20px]">
                  <div className="flex flex-col">
                    <span className="flex items-center">
                      <BsFileEarmarkPdfFill className="text-red-500 text-xl mr-[5px]" />
                      {e.name}
                    </span>
                    <span>{fileSize(e.size)}</span>
                  </div>
                  {/* <span>{e.owner}</span> */}

                  <Image
                    src={"/Avatar.png"}
                    alt="유저 이미지"
                    width={20}
                    height={20}
                    className="rounded-full mt-[10px] ml-[20px]"
                  />
                </div>
              </a>
            );
          })
        ) : (
          <Empty message={"최근 열어본 파일이 없어요."} />
        )}
      </div>
    </div>
  );
}

export default RecentFile;
