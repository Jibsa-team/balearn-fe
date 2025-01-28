import { fetchWithAuth } from "@/app/lib/fetchWithAuth";
import { FileData } from "@/types/file/files";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface DeleteFileModalProps {
  isOpen: boolean;
  fileDelete: FileData;
  onClose: () => void;
}

const DeleteFileModal: React.FC<DeleteFileModalProps> = ({
  isOpen,
  fileDelete,
  onClose,
}) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);

  const DeleteFile = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/file/${fileDelete.id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();

      if (result) {
        await queryClient.invalidateQueries({ queryKey: ["files", id] });
        onClose();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-1/3"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <div className="flex justify-between items-center">
          <div className="text-xl">파일 삭제</div>
          <IoMdClose
            className="cursor-pointer text-gray-500"
            onClick={onClose}
          />
        </div>
        <div className="mt-4 text-center">
          <p>{fileDelete.name} 파일을 삭제하시겠습니까?</p>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={DeleteFile}
            disabled={loading}
          >
            {loading ? "삭제중..." : "삭제"}
          </button>
          <button
            className="bg-gray-200 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteFileModal;
