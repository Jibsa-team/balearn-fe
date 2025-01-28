"use client";

import { FileData, FileDto } from "@/types/file/files";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { fileSize } from "@/utils/file";
import DeleteFileModal from "@/components/modal/deleteFileModal";
import Empty from "@/components/empty/empty";
import { useParams } from "next/navigation";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { useQuery } from "@tanstack/react-query";
import FileListSkeleton from "@/components/skeleton/fileListSkelton";
import useAuthStore from "@/store/useAuthStore";
import { useToast } from "@/hooks/use-toast";
import useFileStore from "@/store/useFileStore";
import { FileIcon } from "@/app/lib/fileType";
import Image from "next/image";

function MyFiles() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileDelete, setFileDelete] = useState<FileData | null>(null);
  const teamUser = useAuthStore((state) => state.teamUser);
  const addFile = useFileStore((state) => state.addFile);
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["files", id],
    queryFn: async () => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/file/team/${id}`
      );
      if (!response.ok) {
        throw new Error("파일 목록을 불러오는데 실패했습니다.");
      }
      const data: FileDto = await response.json();
      return data.result;
    },
  });

  const openDeleteModal = (file: FileData) => {
    if (teamUser?.id !== file.createdBy.id) {
      toast({
        title: "파일 삭제 실패",
        description: "삭제할 권한이 없습니다.",
        variant: "destructive",
      });
      return;
    }
    console.log(file);
    setFileDelete(file);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setFileDelete(null);
  };

  if (isLoading) {
    return <FileListSkeleton />;
  }

  return (
    <div>
      <div className="mt-[20px] w-full bg-white">
        {data && data.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 text-left md:text-[1rem] text-[0.8rem] w-1/4">
                  파일 이름
                </th>
                <th className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 text-left md:text-[1rem] text-[0.8rem]">
                  파일 크기
                </th>
                <th className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 text-left md:text-[1rem] text-[0.8rem]">
                  소유자
                </th>
                <th className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 text-left md:text-[1rem] text-[0.8rem]">
                  최근 변경일
                </th>
                <th className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 text-left md:text-[1rem] text-[0.8rem]">
                  삭제
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 md:px-4 md:py-5 px-2 py-4 md:text-[1rem] text-[0.8rem]">
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center max-w-full"
                        onClick={() => addFile(file, id as string)}
                      >
                        <FileIcon type={file.type} />
                        <span className="truncate w-16 md:w-full">
                          {file.name}
                        </span>
                      </a>
                    </td>
                    <td className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 md:text-[1rem] text-[0.8rem]">
                      {fileSize(file.size)}
                    </td>
                    <td className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 md:text-[1rem] text-[0.8rem]">
                      {/* <div className="md:block hidden relative w-[20px] h-[20px] flex-shrink-0 mr-[10px]">
                        <Image
                          src={file.createdBy.imgUrl || "/Avatar.png"}
                          alt="파일 작성자"
                          layout="fill"
                          className="rounded-full object-cover"
                        />
                      </div> */}
                      <span>{file.createdBy.nickname}</span>
                    </td>
                    <td className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 md:text-[1rem] text-[0.8rem]">
                      {new Date(file.modifiedAt).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 cursor-pointer md:text-[1rem] text-[0.8rem]">
                      <RiDeleteBin6Line onClick={() => openDeleteModal(file)} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <Empty message={"등록된 파일이 없어요."} />
        )}
      </div>
      <DeleteFileModal
        isOpen={isModalOpen}
        fileDelete={fileDelete!}
        onClose={closeDeleteModal}
      />
    </div>
  );
}

export default MyFiles;
