import { useState, useEffect } from "react";
import { UploadedFile } from "@/types/file/files";

const useFiles = () => {
  const [recentFiles, setRecentFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    const storedFiles = localStorage.getItem("recentFiles");
    if (storedFiles) {
      setRecentFiles(JSON.parse(storedFiles));
    }
  }, []);

  const addFile = (file: UploadedFile) => {
    const updatedFiles = [
      file,
      ...recentFiles.filter((f) => f.name !== file.name),
    ];
    setRecentFiles(updatedFiles.slice(0, 10));
    localStorage.setItem(
      "recentFiles",
      JSON.stringify(updatedFiles.slice(0, 10))
    );
  };

  const removeFile = (fileName: string) => {
    const updatedFiles = recentFiles.filter((file) => file.name !== fileName);
    setRecentFiles(updatedFiles);
    localStorage.setItem("recentFiles", JSON.stringify(updatedFiles));
  };

  return { recentFiles, addFile, removeFile };
};

export default useFiles;
