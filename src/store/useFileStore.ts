import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FileData } from "@/types/file/files";

interface FileWithTeam extends FileData {
  teamId: string;
}

interface FileStore {
  recentFiles: FileWithTeam[];
  addFile: (file: FileData, teamId: string) => void;
  removeFile: (fileName: string, teamId: string) => void;
}

const useFileStore = create<FileStore>()(
  persist(
    (set, get) => ({
      recentFiles: [],
      addFile: (file, teamId) => {
        const fileWithTeam = { ...file, teamId };
        const addFiles = [
          fileWithTeam,
          ...get().recentFiles.filter(
            (f) => !(f.name === file.name && f.teamId === teamId)
          ),
        ].slice(0, 10);
        set({ recentFiles: addFiles });
      },
      removeFile: (fileName, teamId) => {
        const deleteFiles = get().recentFiles.filter(
          (file) => !(file.name === fileName && file.teamId === teamId)
        );
        set({ recentFiles: deleteFiles });
      },
    }),
    {
      name: "recent-files-storage",
    }
  )
);

export default useFileStore;
