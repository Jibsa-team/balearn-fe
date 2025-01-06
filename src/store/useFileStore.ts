import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UploadedFile } from "@/types/file/files";

interface FileStore {
  recentFiles: UploadedFile[];
  addFile: (file: UploadedFile) => void;
  removeFile: (fileName: string) => void;
}

const useFileStore = create<FileStore>()(
  persist(
    (set, get) => ({
      recentFiles: [],
      addFile: (file) => {
        const updatedFiles = [
          file,
          ...get().recentFiles.filter((f) => f.name !== file.name),
        ].slice(0, 10);
        set({ recentFiles: updatedFiles });
      },
      removeFile: (fileName) => {
        const updatedFiles = get().recentFiles.filter(
          (file) => file.name !== fileName
        );
        set({ recentFiles: updatedFiles });
      },
    }),
    {
      name: "recent-files-storage", // 로컬 스토리지 키
    }
  )
);

export default useFileStore;
