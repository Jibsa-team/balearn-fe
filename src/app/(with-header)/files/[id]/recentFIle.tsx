import { FileIcon } from "@/app/lib/fileType";
import Empty from "@/components/empty/empty";
import useFileStore from "@/store/useFileStore";
import { fileSize } from "@/utils/file";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

function RecentFile() {
  const { id } = useParams();
  const recentFiles = useFileStore((state) => state.recentFiles);
  const teamFiles = recentFiles.filter((file) => file.teamId === id);

  return (
    <div className="mb-[40px]">
      <div className="md:text-[1.2rem] text-[1rem] font-semibold flex justify-start mb-[10px]">
        최근 파일
      </div>
      <div className="mt-[20px] w-full rounded-2xl flex overflow-x-scroll hide-scrollbar">
        {teamFiles.length > 0 ? (
          teamFiles.map((e, i) => {
            return (
              <a href={e.fileUrl} target="_blank" key={i}>
                <div className="flex items-start justify-between bg-white rounded-xl min-w-[200px] p-[15px] shadow-lg mr-[20px]">
                  <div className="flex flex-col">
                    <span className="flex items-center  mb-[7px]">
                      <FileIcon type={e.type} />
                      <span className="md:text-[1rem] text-[0.9rem] truncate w-36">
                        {e.name}
                      </span>
                    </span>
                    <span className="md:text-[1rem] text-[0.9rem] ml-[25px]">
                      {fileSize(e.size)}
                    </span>
                  </div>
                  {/* <span>{e.owner}</span> */}
                  <div className="relative w-[20px] h-[20px] flex-shrink-0 ml-[10px]">
                    <Image
                      src={e.createdBy.imgUrl || "/Avatar.png"}
                      alt="파일 작성자"
                      layout="fill"
                      className="rounded-full object-cover"
                    />
                  </div>
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
