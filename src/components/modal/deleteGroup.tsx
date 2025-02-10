// components/modal/deleteGroupModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { IoClose } from "react-icons/io5";

interface DeleteGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

const DeleteGroupModal: React.FC<DeleteGroupModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  isDeleting,
}) => {
  const overlayVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-[90%] max-w-[400px] relative"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <IoClose size={24} />
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">모임 삭제</h2>
              <p className="text-gray-600">
                정말로 이 모임을 삭제하시겠습니까?
                <br />
                삭제된 모임은 복구할 수 없습니다.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                disabled={isDeleting}
              >
                취소
              </button>
              <button
                onClick={onDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteGroupModal;
