import { UploadedFile } from "@/types/file/files";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import useFileStore from "@/store/useFileStore";
import { fileSize } from "@/utils/file";
import DeleteFileModal from "@/components/modal/deleteFileModal";
import Empty from "@/components/empty/empty";

function MyFiles({
  files,
  DeleteFile,
}: {
  files: UploadedFile[];
  DeleteFile: (name: string) => void;
}) {
  const addFile = useFileStore((state) => state.addFile);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);

  const openDeleteModal = (fileName: string) => {
    setFileToDelete(fileName);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setFileToDelete(null);
  };

  const confirmDelete = () => {
    if (fileToDelete) {
      DeleteFile(fileToDelete);
    }
    closeDeleteModal();
  };

  console.log(files);

  return (
    <div>
      <div className="text-xl flex justify-start mb-[10px]">모든 파일</div>
      <div className="mt-[20px] w-full bg-white">
        {files.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  파일 이름
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  파일 크기
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  소유자
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  최근 변경일
                </th>
                <th className="border border-gray-200 px-4 py-2 text-left">
                  삭제
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    <a
                      href={file.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                      onClick={() => addFile(file)}
                    >
                      <BsFileEarmarkPdfFill className="text-red-600 mr-[5px] text-xl" />
                      {file.name}
                    </a>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {fileSize(file.size)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {file.owner}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {file.lastModified}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 cursor-pointer">
                    <RiDeleteBin6Line
                      onClick={() => openDeleteModal(file.name)}
                    />
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
        fileName={fileToDelete || ""}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default MyFiles;
