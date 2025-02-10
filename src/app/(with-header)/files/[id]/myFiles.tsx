"use client";

import { FileData } from "@/types/file/files";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fileSize } from "@/utils/file";
import DeleteFileModal from "@/components/modal/deleteFileModal";
import Empty from "@/components/empty/empty";
import { useParams } from "next/navigation";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { useInfiniteQuery } from "@tanstack/react-query";
import FileListSkeleton from "@/components/skeleton/fileListSkelton";
import useAuthStore from "@/store/useAuthStore";
import { useToast } from "@/hooks/use-toast";
import useFileStore from "@/store/useFileStore";
import { FileIcon } from "@/app/lib/fileType";
import { useInView } from "react-intersection-observer";
import FileSkelton from "@/components/skeleton/fileSkelton";

const getAllFile = async ({
  pageParam = 1,
  id,
}: {
  pageParam: number;
  id: string;
}) => {
  const response = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_URL}/api/file/team/${id}?page=${pageParam}&size=10`
  );
  if (!response.ok) throw new Error("데이터 로드 실패");

  const data = await response.json();
  return data;
};

function MyFiles() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileDelete, setFileDelete] = useState<FileData | null>(null);
  const teamUser = useAuthStore((state) => state.teamUser);
  const addFile = useFileStore((state) => state.addFile);
  const { toast } = useToast();
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["files", id],
      queryFn: ({ pageParam = 1 }) =>
        getAllFile({ pageParam, id: id as string }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.result.length === 10 ? allPages.length + 1 : undefined;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const openDeleteModal = (file: FileData) => {
    if (teamUser?.id !== file.createdBy.id) {
      toast({
        title: "파일 삭제 실패",
        description: "삭제할 권한이 없습니다.",
        variant: "destructive",
      });
      return;
    }
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
  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <div>
      <div className="w-full bg-white">
        {data?.pages[0].result.length > 0 ? (
          <div className="relative h-[500px]">
            <table className="table-fixed w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="border border-gray-200 md:px-4 md:py-3 px-2 py-2 text-left md:text-[1rem] text-[0.8rem]">
                    파일 이름
                  </th>
                  <th className="border border-gray-200 md:px-4 md:py-3 px-2 py-2 text-left md:text-[1rem] text-[0.8rem]">
                    파일 크기
                  </th>
                  <th className="border border-gray-200 md:px-4 md:py-3 px-2 py-2 text-left md:text-[1rem] text-[0.8rem] ">
                    소유자
                  </th>
                  <th className="border border-gray-200 md:px-4 md:py-3 px-2 py-2 text-left md:text-[1rem] text-[0.8rem] ">
                    최근 변경일
                  </th>
                  <th className="border border-gray-200 md:px-4 md:py-3 px-2 py-2 text-left md:text-[1rem] text-[0.8rem] w-[10%]">
                    삭제
                  </th>
                </tr>
              </thead>
            </table>
            <div className="overflow-y-auto h-[calc(100%-48px)]">
              <table className="table-fixed w-full border-collapse border border-gray-200 text-[rgba(0,0,0,0.6)]">
                <tbody>
                  {data &&
                    data.pages.map((page) =>
                      page.result.map((file: FileData) => (
                        <tr key={file.id} className="hover:bg-gray-50">
                          <td className="border border-gray-200 md:px-4 md:py-5 px-2 py-4 text-[0.8rem]">
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
                          <td className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 md:text-[0.9rem] text-[0.8rem]">
                            {fileSize(file.size)}
                          </td>
                          <td className="border border-gray-200 md:px-4 md:py-2 px-2 py-1">
                            <span>{file.createdBy.nickname}</span>
                          </td>
                          <td className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 md:text-[0.9rem]  text-[0.8rem]">
                            {new Date(file.modifiedAt).toLocaleDateString()}
                          </td>
                          <td className="border border-gray-200 md:px-4 md:py-2 px-2 py-1 cursor-pointer md:text-[1rem w-[10%]">
                            <RiDeleteBin6Line
                              onClick={() => openDeleteModal(file)}
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  {hasNextPage &&
                    [...Array(3)].map((_, index) => (
                      <FileSkelton key={index} />
                    ))}
                  <tr ref={ref}>
                    <td colSpan={5} className="p-1" />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
