import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  title?: string;
  description?: string;
  isDeleting: boolean;
}

const DeleteEventModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmDelete,
  title = "일정 삭제",
  description = "정말로 이 일정을 삭제하시겠습니까?",
  isDeleting,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg p-6 w-[90%] max-w-[400px]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <p className="text-gray-600 mb-6">{description}</p>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              취소
            </button>
            <button
              onClick={onConfirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              {isDeleting ? "삭제 중..." : "삭제"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteEventModal;
