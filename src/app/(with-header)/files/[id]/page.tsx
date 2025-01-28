"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
// import { saveAs } from "file-saver";
import { SlCloudUpload } from "react-icons/sl";
import MyFiles from "./myFiles";
import { UploadedFile } from "@/types/file/files";
import RecentFile from "./recentFIle";
import { useParams } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { useQueryClient } from "@tanstack/react-query";

const FileUploadPage: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const teamUser = useAuthStore();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const uploadFile = async (file: File) => {
    const formData = new FormData();

    const blob = new Blob([JSON.stringify({ name: file.name })], {
      type: "application/json",
    });

    formData.append("data", blob);
    formData.append("file", file);

    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/file/team/${id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("파일 업로드에 실패했습니다.");
      }

      const data = await response.json();
      await queryClient.invalidateQueries({ queryKey: ["files", id] });
      return data;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    setIsUploading(true);

    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const uploadedFileData = await uploadFile(file);

        return {
          name: file.name,
          size: file.size,
          owner: teamUser.user?.name || "Unknown",
          lastModified: new Date(file.lastModified).toLocaleDateString(),
          preview: URL.createObjectURL(file),
          file,
          ...uploadedFileData,
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    } catch (error) {
      console.error("File upload failed:", error);
      alert("파일 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
    },
  });

  return (
    <div className="flex flex-col w-full md:p-[30px] p-[10px]">
      <RecentFile />
      <div className="w-full mb-[20px] shadow-sm">
        <div className="md:text-[1.2rem] text-[1rem] font-semibold flex justify-start mb-[10px]">
          업로드
        </div>
        <div
          {...getRootProps()}
          className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-[20px] text-center cursor-pointer mb-[40px]"
        >
          <input {...getInputProps()} />
          <div className="flex justify-center text-5xl text-sky-500">
            <SlCloudUpload className="md:mb-[20px] mb-[10px]" />
          </div>
          <p className="text-[0.9rem] md:text-[1.1rem]">
            {isUploading ? "업로드 중..." : "파일을 업로드 해주세요."}
          </p>
        </div>
      </div>
      <div className="w-full md:text-[1.2rem] text-[1rem] font-semibold flex justify-start mb-[10px]">
        모든 파일
      </div>
      <div className="className= flex-1 overflow-y-auto">
        <MyFiles />
      </div>
    </div>
  );
};

export default FileUploadPage;
