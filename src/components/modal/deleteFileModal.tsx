import { motion } from "framer-motion";
import { RiCloseCircleLine } from "react-icons/ri";

interface DeleteFileModalProps {
  isOpen: boolean;
  fileName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteFileModal: React.FC<DeleteFileModalProps> = ({
  isOpen,
  fileName,
  onClose,
  onConfirm,
}) => {
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
          <RiCloseCircleLine
            className="cursor-pointer text-gray-500"
            onClick={onClose}
          />
        </div>
        <div className="mt-4 text-center">
          <p>{fileName} 파일을 삭제하시겠습니까?</p>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={onConfirm}
          >
            삭제
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
